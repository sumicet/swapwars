/* eslint-disable no-underscore-dangle */
import { Center, Container } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';
import { useEffect } from 'react';
import { useAccount, useTransaction } from 'wagmi';
import { Home } from './pages/Home';
import { Menu } from './components';
import { useEagerConnect, usePersistNetwork } from './web3';

function App() {
    const bgColor = useColorModeValue('light.bg.primary', 'dark.bg.primary');

    useEagerConnect();
    usePersistNetwork();

    const { data } = useTransaction({
        hash: '0xfbbcdac225c82de12e796cd79b728c65146ec067e1c67da656f5dda89c407b4c',
    });

    const { address } = useAccount();

    // const { getContract } = useContract();
    useEffect(() => {
        if (!data || !address) {
            return;
        }

        // HOW TO DECODE FUNCTION DATA

        // Method 1?
        // const init = async () => {
        // const iface = new ethers.utils.Interface([
        //     'function buy(uint256 _poolId, uint256 _tokenAamount)',
        // ]);
        //     const fn = iface.decodeFunctionData('buy', data.data);

        //     console.log(
        //         fn,
        //         ethers.utils.formatEther(fn[0]),
        //         ethers.utils.formatEther(fn[1]),
        //         ethers.utils.formatEther(fn._poolId),
        //         ethers.utils.formatEther(fn._tokenAamount)
        //     );
        // };
        // init();

        // Method 2?
        // try {
        //     // const iface = new ethers.utils.Interface([
        //     //     'event TokenBought (address indexed buyer, uint256 poolid, uint256 amount)',
        //     // ]);
        //     // const input = ethers.utils.hexDataSlice(data.data, 4);
        //     // const result = ethers.utils.defaultAbiCoder.decode(['uint256', 'uint256'], input);
        //     // console.log(ethers.utils.formatEther(result[0]), ethers.utils.formatEther(result[1]));
        //     // const event = iface.decodeEventLog('TokenBought', data.data);
        //     // console.log(
        //     //     ethers.utils.formatEther(event.amount),
        //     //     ethers.utils.formatEther(event.poolid)
        //     // );
        // } catch (error: any) {
        //     console.log(error);
        // }

        // test function

        // const init = async () => {
        //     try {
        //         const events = await getEventsFromHash({
        //             name: 'TokenBought',
        //             addressOrName: config.contract.TokenSwap,
        //             contractInterface: tokenSwapAbi,
        //             args: [address],
        //             hash: '0xfbbcdac225c82de12e796cd79b728c65146ec067e1c67da656f5dda89c407b4c',
        //         });
        //         console.log(events);
        //     } catch (error) {
        //         console.log('error', error);
        //     }
        // };
    }, [address, data]);

    return (
        <Center width="100%" bg={bgColor} flexDirection="column">
            <Menu />
            <Container centerContent width="100%" flex={1} maxWidth="container" paddingX="space20">
                <Home />
            </Container>
        </Center>
    );
}

export default App;
