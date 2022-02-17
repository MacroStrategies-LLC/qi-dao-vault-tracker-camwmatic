/**
 * @module index
 */

/**
 * example description with link {@link module:format}
 * @param {string} example - example link to module {@link module:format}
 * @return {string} - http://localhost:3000
 * @example
 * const example = 'hello'
 *
 * boiler(example)
 *
 * returns:
 *
 * hello
 */

import 'dotenv/config';
import fetch from 'node-fetch';
import {ethers} from 'ethers';
import abi from '#src/abi/abi.js';
import addresses from '#src/addresses/addresses.js';
import provider from '#src/providers/providers.js';
import wallet from '#src/wallet/wallet.js';

/** returns the whole interger of collateral/debt aka cdr*/
const getVaultCDR = async (id, contract) => {
  const cdr = await contract.checkCollateralPercentage(id);
  return ethers.utils.formatUnits(cdr, 0);
};

const getGas = async () => {
  const url = `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.polygon_scan}`;
  const response = await fetch(url);
  const json = await response.json();
  return {
    gasPrice: ethers.utils.parseUnits(json.result.FastGasPrice, 'gwei'),
    gasLimit: 500_000,
  };
};

const boiler = async (example) => {
  const vault = new ethers.Contract(
      addresses.vaults.camwmatic,
      abi.vaults.camwmatic,
      wallet,
  );
  const vaultCDR = await getVaultCDR(process.env.vault, vault);
  const gas = await getGas();
  console.log(vaultCDR);
  console.log(gas);
};

boiler();

export default boiler;
