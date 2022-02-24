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
import vaults from '#src/vaults/vaults.js';
import routers from '#src/routers/routers.js';
import tokens from '#src/tokens/tokens.js';

/** creates an overrides object to be used in transactions
 * @return {object} overrides {@link https://docs.ethers.io/v5/search/?search=contract}
 * object containing the suggested maticinstant gas
 * price and matic price from polygonscan, gasLimit is set to 500k*/
const getGas = async () => {
  const url = `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.polygon_scan}`;
  const response = await fetch(url);
  const json = await response.json();
  // const increaseGas = String(Number(json.result.FastGasPrice) * 2);
  // const increaseGas = String(100);
  // console.log('fastGasPrice', json.result.FastGasPrice);
  return {
    // gasPriceGwei: json.result.FastGasPrice,
    gasPrice: ethers.utils.parseUnits(json.result.FastGasPrice, 'gwei'),
    // maxFeePerGas: ethers.utils.parseUnits(json.result.FastGasPrice, 'gwei'),
    // maxPriorityFeePerGas: ethers.utils.parseUnits(json.result.FastGasPrice, 'gwei'),
    gasLimit: 8_000_000,
    // polygonScanTokenPrice: json.result.UsdPrice,
    // nonce: 595,
  };
};

const state = vaults.state;
const gas = await getGas();
// state.readableGas = {
//   gasPrice: gas.gasPrice.toString(),
//   gasPriceGwei: gas.gasPriceGwei,
//   gasLimit: gas.gasLimit,
//   polygonScanTokenPrice: gas.polygonScanTokenPrice,
// };
// state.overrides = {
// maxFeePerGas: ethers.utils.parseUnits('500', 'gwei'),
// maxPriorityFeePerGas: ethers.utils.parseUnits('500', 'gwei'),
// gasPrice: gas.gasPrice,
// gasLimit: gas.gasLimit,
// };

// const test = tokens;
// console.log(test);
// const test = routers.test;
// console.log(test);
// console.log(routers.amount('10', tokens.mai));
// const test = routers.amount('10', tokens.mai);
// console.log(test.wrapped);
// const amount = routers.amount('1', tokens.mai);
// const route = await routers.getRoute(amount, tokens.usdc, wallet);
// // const [details] = route;
// console.log(details);
// console.log(Object.keys(route));
// [
//   'quote',
//   'quoteGasAdjusted',
//   'estimatedGasUsed',
//   'estimatedGasUsedQuoteToken',
//   'estimatedGasUsedUSD',
//   'gasPriceWei',
//   'route',
//   'trade',
//   'methodParameters',
//   'blockNumber'
// ]
// console.log(JSON.stringify(route.route));
// const transaction =
// await routers.createTransaction('1', tokens.mai, tokens.usdc, wallet);

// // console.log(transaction);
// const herewego = await wallet.sendTransaction(transaction, state.overrides);
// console.log(herewego);
// console.log(routers.createTransaction('1', tokens.mai, tokens.usdc, wallet));
// const transaction =
// await routers.createTransaction(
//     '1', tokens.mai, tokens.usdc, wallet);
// console.log(transaction);
// const test = await wallet.sendTransaction(transaction);
// console.log(test);

// console.log(transaction.trade.swaps[0].path);
// console.log(Object.values(transaction.trade));
// console.log(Object.keys(transaction));
// console.log('tp', transaction.tokenPath);
// console.log('route', transaction.route);
// const test =
// console.log(state.overrides);
console.log(state);
// await routers.createTransaction('mai', 'usdc', '1.0', wallet, await gas, 558);
// console.log(Object.keys(provider.alchemy));
export default state;
