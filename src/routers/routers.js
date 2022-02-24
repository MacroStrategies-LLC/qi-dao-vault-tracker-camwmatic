/* eslint-disable max-len */
/**
 * @module router
 */

import fetch from 'node-fetch';
import {ethers} from 'ethers';
import {AlphaRouter} from '@uniswap/smart-order-router';
import abi from '#src/abi/abi.js';
import addresses from '#src/addresses/addresses.js';
import wallet from '#src/wallet/wallet.js';
import providers from '#src/providers/providers.js';
import createContract from '#src/create-contract/create-contract.js';
import {TradeType, Percent, CurrencyAmount} from '@uniswap/sdk-core';
import tokens from '#src/tokens/tokens.js';

const alphaRouter = new AlphaRouter({chainId: 137, provider: providers.infura});

const factory = createContract(
    addresses.factory.quickswap, abi.factory.quickswap, wallet);
const router = createContract(
    addresses.router.quickswap, abi.router.quickswap, wallet);
const usdcmai = createContract(
    addresses.pairs.usdcmai, abi.pairs.usdcmai, wallet,
);

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const validateHash = async (hash) => {
  let mined = false;
  const transactionCheck = {
    jsonrpc: '2.0',
    method: 'eth_getTransactionByHash',
    params: [hash],
    id: 0,
  };
  const url = providers.alchemy.connection.url;
  const query = await fetch(url, {
    method: 'POST', body: JSON.stringify(transactionCheck)});
  const result = await query.json();
  console.log('CHECKING TRANSACTION STATUS', result);
  if (result === undefined) {
    mined = true;
    console.log('TRANSACTION DROPPED!??');
  }
  if (result.blockHash === undefined && result.blockNumber === undefined) {
    console.log('TRANSACTION HAS NOT BEEN MINED INCREASE GAS');
  } else {
    mined = true;
    console.log('MINED!');
    console.log('BLOCKHASH', result.blockHash);
    console.log('BLOCKNUMBER', result.blockNumber);
  }
  return mined;
};

const getTransactionCount = async (tag) => {
  const request = {
    jsonrpc: '2.0',
    method: 'eth_getTransactionCount',
    params: [tag],
    id: 0,
  };
  const url = providers.alchemy.connection.url;
  const query = await fetch(url, {
    method: 'POST', body: JSON.stringify(request)});
  const result = await query.json();
  return ethers.utils(result.result);
};

let serverError = 0;
const createTransaction = async (token1, token2, amount, wallet, overrides, nonce, hash) => {
  if (hash) {
    console.log('UNMINED HASH DETECTED, INCREASING GAS...');
    await sleep(20_000);
    await createTransaction(token1, token2, amount, wallet, overrides, nonce++);
  }
  if (nonce === 600) {
    return;
  }
  console.log('CURRENT NONCE', nonce);
  const input = createContract(addresses[token1], abi[token1], wallet);
  const output = createContract(addresses[token2], abi[token2], wallet);
  const inputAmount = ethers.utils.parseEther(amount);
  const path = [
    input.address,
    output.address,
  ];
  const amounts = await router.getAmountsOut(inputAmount, path, overrides);
  try {
    const transactionCountLatest = await getTransactionCount('latest');
    const transactionCountPending = await getTransactionCount('pending');

    console.log('latest', transactionCountLatest);
    console.log('pending', transactionCountPending);

    // overrides.nonce = nonce;
    // const token1Balance = await input.balanceOf(wallet.address);
    // if (ethers.utils.formatEther(token1Balance) < ethers.utils.formatEther(inputAmount)) {
    //   throw new Error(`INSUFFICENT QUANTITY OF ${token1} IN ${wallet.address}`);
    // }
    // const approve = await input.approve(router.address, inputAmount, overrides);
    // console.log('APPROVAL HASH', approve.hash);

    // await sleep(20_000);

    // const isMined = await validateHash(approve.hash);

    // if (isMined === true) {
    //   console.log(nonce, 'HAS BEEN MINED, MOVING ON!');
    // } else {
    //   await createTransaction(token1, token2, amount, wallet, overrides, nonce, approve.hash);
    // }

    // console.log('INCREASING NONCE');
    // await createTransaction(token1, token2, amount, wallet, overrides, nonce++);

    // const swap = await router.swapExactTokensForTokens(
    //     inputAmount,
    //     amounts[1],
    //     path,
    //     wallet.address,
    //     Date.now() + 1000 * 60 * 3,
    //     overrides,
    // );


    // console.log('SWAP', swap);
    // const iface = new ethers.utils.Interface(['function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] path, address to, uint256 deadline) returns (uint256[] amounts)']);
    // const inputs =
    // iface.decodeFunctionData('swapExactTokensForTokens', swap.data)
    //     .map((data) => data._isBigNumber ? data.toString() : data);
    // console.log('INPUTS', inputs);

    // const swapped = await swap.wait();
    // console.log('SWAPPED', swapped);

    // eslint-disable-next-line max-len
    // console.log(Object.keys(router));
    // console.log(router.functions);
    // if (transactionValid) {
    //   const transaction = await router.swapExactTokensForTokens(
    //       inputAmount,
    //       amounts[1],
    //       path,
    //       wallet.address,
    //       Date.now() + 1000 * 60 * 10,
    //       overrides,
    //   );
    //   const transactionReceipt = await transaction.wait();
    //   console.log(transactionReceipt);
    // }
  } catch (error) {
    if (error.reason === 'processing response error' && error.code === 'SERVER_ERROR') {
      serverError++;
      await sleep(20_000);
      console.log('ATTEMPTING RESTART', serverError);
      if (error.message === 'already known') {
        console.log('ALREADY KNOWN, INCREASING NONCE');
        await createTransaction(token1, token2, amount, wallet, overrides, nonce++);
      }
    }
    if (error.reason === 'nonce has already been used' && error.code === 'NONCE_EXPIRED') {
      console.log('INCREASING NONCE');
      await createTransaction(token1, token2, amount, wallet, overrides, nonce++);
    }
    if (error.reason === 'replacement fee too low' && error.code === 'REPLACEMENT_UNDERPRICED') {
      const currentGas = overrides.gasPrice.add(ethers.utils.parseUnits('10', 'gwei'));
      overrides.gasPrice = currentGas;
      console.log('trying with new gas', ethers.utils.formatUnits(currentGas, 'gwei'));
      if (hash) {
        await createTransaction(token1, token2, amount, wallet, overrides, nonce, hash);
      }
      await createTransaction(token1, token2, amount, wallet, overrides, nonce);
    }
    console.log('UNKOWN ERROR', error);
  }
};
const routers = {
  createTransaction,
};

export default routers;
