import {ethers} from 'ethers';
const infura = new ethers.providers.JsonRpcProvider(process.env.infura);
const alchemy = new ethers.providers.AlchemyProvider(
    'matic', process.env.alchemy);
const providers = {
  infura,
  alchemy,
};
export default providers;
