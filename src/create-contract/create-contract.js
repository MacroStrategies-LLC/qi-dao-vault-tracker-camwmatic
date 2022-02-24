/**
 * @module createContract
 */

import {ethers} from 'ethers';
/** creates a signer to interact with a smart contract's r/w methods
   * @param {address} address {@link https://docs.ethers.io/v5/api/utils/address/#address}
   * @param {abi} abi {@link https://docs.ethers.io/v5/search/?search=contract}
   * @param {signer} signer {@link https://docs.ethers.io/v5/api/signer/}
   * @return {contract} contract {@link https://docs.ethers.io/v5/search/?search=contract}*/
const createContract = (address, abi, signer) => {
  return new ethers.Contract(address, abi, signer);
};

export default createContract;
