/**
 * @module wallet
 */
import {ethers} from 'ethers';
import providers from '#src/providers/providers.js';
const wallet = new ethers.Wallet(process.env.private_key, providers.infura);
export default wallet;

