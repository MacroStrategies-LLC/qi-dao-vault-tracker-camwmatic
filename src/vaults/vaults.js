import {ethers} from 'ethers';
import abi from '#src/abi/abi.js';
import addresses from '#src/addresses/addresses.js';
import wallet from '#src/wallet/wallet.js';
import createContract from '#src/create-contract/create-contract.js';

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

/** not sure if this conversion works but it takes a big int and converts it to
   * a matic quantity which we can multiply by getEthPriceSource
   * @param {contract} contract {@link https://docs.ethers.io/v5/search/?search=contract}
   * @return {string} big int to matic * current token price */
const getDebtCeiling = async (contract) => {
  const ceiling = await contract.getDebtCeiling();
  return ethers.utils.formatUnits(ceiling, 21);
};

/** the value of this function and getDebtCeiling are off by about 10-12 so
   * be careful when using this to estimage how much to borrow
   * @param {string} debtCeiling available debt to borrow
   * @param {string} oraclePrice oracle price of token
   * @return {string} big int to matic * current token price */
const estimateAvailableDebt = (debtCeiling, oraclePrice) => {
  return (Number(debtCeiling) * Number(oraclePrice)).toString();
};

const createState = async (id, address, abi, wallet) => {
  const contract = await createContract(address, abi, wallet);
  const oraclePrice = await getEthPriceSource(contract);
  const collateralQuantity = await getVaultCollateral(id, contract);
  const vaultDebtValue = await getVaultDebt(id, contract);
  const vaultCDR = await getVaultCDR(id, contract);
  const debtCeiling = await getDebtCeiling(contract);
  const availableDebtEstimate = estimateAvailableDebt(debtCeiling, oraclePrice);
  return {
    vaultStatistics: {
      oraclePrice,
      collateralQuantity,
      vaultDebtValue,
      vaultCDR,
      debtCeiling,
      availableDebtEstimate,
    },
  };
};

const vaults = {
  getVaultCDR,
  getVaultDebt,
  getVaultCollateral,
  getEthPriceSource,
  getDebtCeiling,
  estimateAvailableDebt,
  createState,
  state: await createState(process.env.vault,
      addresses.vaults.camwmatic,
      abi.vaults.camwmatic,
      wallet),
};

export default vaults;
