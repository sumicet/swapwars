import Big from 'big.js';
import { BigNumber } from 'ethers';

export const PPM = 1000000;
const DECIMALS = BigNumber.from(18);
export const DECIMALS_BN = BigNumber.from(10).pow(DECIMALS); // Use with BigNumber

export const DECIMALS_BN_BIG = new Big(10).pow(18); // Use with big.js
