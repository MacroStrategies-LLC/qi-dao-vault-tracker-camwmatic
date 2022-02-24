import 'dotenv/config';
import fetch from 'node-fetch';
import {ethers} from 'ethers';
import abi from '#src/abi/abi.js';
import addresses from '#src/addresses/addresses.js';
import provider from '#src/providers/providers.js';
import wallet from '#src/wallet/wallet.js';
import vaults from '#src/vaults/vaults.js';

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
    gasLimit: 8_000_000,
  };
};

const state = vaults.state;
const gas = await getGas();
console.log(state);
export default state;
