/**
 * @module index
 */

/**
 * example description with link {@link module:format}
 * @param {string} example - example link to module {@link module:format}
 * @return {string} - http://localhost:3000
 * @example
 * const example = 'hello'
 *
 * boiler(example)
 *
 * returns:
 *
 * hello
 */

import 'dotenv/config';
import {ethers} from 'ethers';
import provider from './provider/provider.js';
const boiler = (example) => {
  console.log('boiler');
  // console.log(provider);
  return example;
};

boiler();

export default boiler;
