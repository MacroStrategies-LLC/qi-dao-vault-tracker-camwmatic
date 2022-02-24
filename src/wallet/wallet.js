import {ethers} from 'ethers';
import providers from '#src/providers/providers.js';
const wallet = new ethers.Wallet(process.env.private_key, providers.alchemy);
export default wallet;

