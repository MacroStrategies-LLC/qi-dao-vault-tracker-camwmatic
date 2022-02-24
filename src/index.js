import 'dotenv/config';
import fetch from 'node-fetch';
import {ethers} from 'ethers';
import vaults from '#src/vaults/vaults.js';
import sound from 'sound-play';

/** creates an overrides object to be used in transactions
 * @return {object} overrides {@link https://docs.ethers.io/v5/search/?search=contract}
 * object containing the suggested maticinstant gas
 * price and matic price from polygonscan, gasLimit is set to 500k*/
const getGas = async () => {
  const url = `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${process.env.polygon_scan}`;
  const response = await fetch(url);
  const json = await response.json();
  return {
    gasPrice: ethers.utils.parseUnits(json.result.FastGasPrice, 'gwei'),
    gasLimit: 8_000_000,
  };
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// eslint-disable-next-line max-len
const usd = (value) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);

const star1 = async () => sound.play('src/sounds/star1.mp3');
const star4 = async () => sound.play('src/sounds/star4.mp3');

const checkVault = async (oraclePast, oraclePresent, cdr) => {
  const floor = Number(cdr) <= 140;
  const great = Number(cdr) >= 160;

  if (floor) {
    star1();
    star1();
    star1();
  }

  if (great) {
    star4();
  }

  const {vaultStatistics} = await vaults.createState();
  const state = vaultStatistics;
  // eslint-disable-next-line max-len
  if (oraclePast === undefined && oraclePresent === undefined && cdr === undefined) {
    console.log(`populating vault tracker`);
    const oracle = state.oraclePrice;
    const ratio = state.vaultCDR;
    await sleep(5000);
    await checkVault(oracle, oracle, ratio);
  }
  if (usd(oraclePast) === usd(oraclePresent)) {
    console.log('no change', usd(oraclePast), usd(oraclePresent), cdr);
    const oracle = state.oraclePrice;
    const ratio = state.vaultCDR;
    await sleep(5000);
    await checkVault(oraclePast, oracle, ratio);
  }
  // eslint-disable-next-line max-len
  console.log('price changed', usd(oraclePast), usd(oraclePresent), cdr);
  const oracle = state.oraclePrice;
  const ratio = state.vaultCDR;
  await sleep(5000);
  await checkVault(oraclePresent, oracle, ratio);
};

await checkVault();
export default checkVault;
