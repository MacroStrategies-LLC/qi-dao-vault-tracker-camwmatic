/**
 * @module provider
 */
import {ethers} from 'ethers';
const infura = new ethers.providers.JsonRpcProvider(process.env.infura);
const alchemy = new ethers.providers.JsonRpcProvider(process.env.alchemy);
const providers = {
  infura,
  alchemy,
};
export default providers;
