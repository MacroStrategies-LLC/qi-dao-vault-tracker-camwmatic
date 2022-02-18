/**
 * @module index
 */

import 'dotenv/config';
import fetch from 'node-fetch';
import {ethers} from 'ethers';
import abi from '#src/abi/abi.js';
import addresses from '#src/addresses/addresses.js';
import provider from '#src/providers/providers.js';
import wallet from '#src/wallet/wallet.js';

/** gets the debt to collateral value of the vault
 * @param {number} id
 * @param {contract} contract {@link https://docs.ethers.io/v5/search/?search=contract}
 * @return {string} cdr = collateral value/debt value*/
const getVaultCDR = async (id, contract) => {
  const cdr = await contract.checkCollateralPercentage(id);
  return ethers.utils.formatUnits(cdr, 0);
};

/** gets the collateral value of the vault
 * @param {number} id
 * @param {contract} contract {@link https://docs.ethers.io/v5/search/?search=contract}
 * @return {string} collateral value in usd */
const getVaultDebt = async (id, contract) => {
  const debt = await contract.vaultDebt(id);
  return ethers.utils.formatUnits(debt, 18);
};

/** creates an overrides object to be used in transactions
 * @return {object} overrides {@link https://docs.ethers.io/v5/search/?search=contract}
 * object containing the suggested maticinstant gas
 * price and matic price from polygonscan, gasLimit is set to 500k*/
const getGas = async () => {
  const url = `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.polygon_scan}`;
  const response = await fetch(url);
  const json = await response.json();
  return {
    gasPrice: ethers.utils.parseUnits(json.result.FastGasPrice, 'gwei'),
    gasLimit: 500_000,
    polygonScanTokenPrice: json.result.UsdPrice,
  };
};

/** gets the amount of tokens aka collateral from a vault
 * @param {number} id
 * @param {contract} contract {@link https://docs.ethers.io/v5/search/?search=contract}
 * @return {string} collateral quantity */
const getVaultCollateral = async (id, contract) => {
  const tokens = await contract.vaultCollateral(id);
  return ethers.utils.formatUnits(tokens, 18);
};

/** gets the price per token from the contract, set via oracle
 * @param {contract} contract {@link https://docs.ethers.io/v5/search/?search=contract}
 * @return {string} value per token in currency form */
const getEthPriceSource = async (contract) => {
  const price = await contract.getEthPriceSource();
  return ethers.FixedNumber.fromValue(price, 8)._value;
};

const boiler = async (example) => {
  const vault = new ethers.Contract(
      addresses.vaults.camwmatic,
      abi.vaults.camwmatic,
      wallet,
  );
  const oraclePrice = await getEthPriceSource(vault);
  const collateral = await getVaultCollateral(process.env.vault, vault);
  const vaultDebt = await getVaultDebt(process.env.vault, vault);
  const vaultCDR = await getVaultCDR(process.env.vault, vault);
  const gas = await getGas();
  console.log(oraclePrice, typeof oraclePrice);
  console.log(collateral, typeof collateral);
  console.log(vaultCDR, typeof vaultCDR);
  console.log(vaultDebt, typeof vaultDebt);
  console.log(gas);
};

boiler();

export default boiler;
