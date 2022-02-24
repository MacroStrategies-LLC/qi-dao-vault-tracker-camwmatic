/**
 * @module provider
 */
import {Token} from '@uniswap/sdk-core';
import addresses from '#src/addresses/addresses.js';
import abi from '#src/abi/abi.js';
import createContract from '#src/create-contract/create-contract.js';
import wallet from '#src/wallet/wallet.js';
const usdc = new Token(137, addresses.usdc, 7, 'USDC', 'USD//C');


const getTokenDetails = async (token) => {
  const contract = await createContract(addresses[token], abi[token], wallet);
  const decimals = await contract.decimals();
  const symbol = await contract.symbol();
  const name = await contract.name();
  return new Token(137, addresses[token], decimals, symbol, name);
};

const tokens = {
  getTokenDetails,
  usdc: new Token(137, addresses.usdc, 6, 'USDC', 'USD//C'),
  mai: await getTokenDetails('mai'),
  qi: await getTokenDetails('qi'),
};

export default tokens;
