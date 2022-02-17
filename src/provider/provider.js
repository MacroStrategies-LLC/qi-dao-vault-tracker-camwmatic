/**
 * @module index
 */
import {ethers} from 'ethers';
const getDefaultProvider = ethers.getDefaultProvider;
const infura = process.env.infura;
const alchemy = process.env.alchemy;
const provider = getDefaultProvider('mainnet', {infura, alchemy});
export default provider;
