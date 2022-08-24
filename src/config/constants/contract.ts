import { BigNumber } from 'ethers';

export const PPM = 1000000;
const DECIMALS = BigNumber.from(18);
export const DECIMALS_BN = BigNumber.from(10).pow(DECIMALS);
