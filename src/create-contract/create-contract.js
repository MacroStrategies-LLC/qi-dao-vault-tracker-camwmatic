import {ethers} from 'ethers';
const createContract = (address, abi, provider) => {
  return new ethers.Contract(address, abi, provider);
};

export default createContract;
