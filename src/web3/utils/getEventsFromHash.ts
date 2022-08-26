/* eslint-disable no-promise-executor-return */
import { JsonFragment } from '@ethersproject/abi';
import { ethers } from 'ethers';
import { getContract, GetContractArgs, fetchTransaction } from 'wagmi/actions';

/**
 * Read about filter args: https://docs.ethers.io/v5/concepts/events/
 *
 * @param eventName
 * @param args Filter args. Eg for `Transfer(address indexed src, address indexed dst, uint val)` you can pass `[src, dst]`. Notice that only `src` and `dst` are *indexed*, so ONLY they qualify for filtering
 * @param fromBlock Start searching from `fromBlock`
 * @param toBlock Stop searching at `toBlock`
 * @param addressOrName
 * @param contractInterface
 * @param signer
 */
export const getEventsFromHash = async ({
    name,
    args,
    hash,
    signer,
    ...contractArgs
}: Omit<GetContractArgs, 'signerOrProvider'> & {
    name: string;
    args: any[];
    hash: `0x${string}`;
    signer: GetContractArgs['signerOrProvider'];
}) => {
    const transaction = await fetchTransaction({ hash });
    const contract = getContract({ ...contractArgs, signerOrProvider: signer });
    const iface = new ethers.utils.Interface(contractArgs.contractInterface as JsonFragment[]);

    const filter = contract.filters.TokenBought(...args);

    const events = await contract.queryFilter(
        filter,
        transaction.blockNumber,
        transaction.blockNumber
    );

    const decodedEvents = events
        .map((event) => iface.decodeEventLog(name, event.data))
        .map((decodedEvent) =>
            Object.fromEntries(
                Object.entries(decodedEvent).slice(Object.entries(decodedEvent).length / 2)
            )
        );

    return decodedEvents;
};
