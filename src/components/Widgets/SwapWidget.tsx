import { Grid, GridItem, Spacer } from '@chakra-ui/layout'
import { Box,Flex } from '@chakra-ui/layout'
import { ChangeEvent, useEffect, useState } from 'react';
import { FiRepeat } from 'react-icons/fi';
import { Field } from '../Field';
import { IERC20, BridgeABI,BridgeAddress } from '../../config/constants'
import { BigNumber, ethers } from 'ethers';
import {
    WidgetBodyWrapper,
    SwapWidgetButton,
    WidgetIcon,
    WidgetTitle,
    WidgetWrapper,
} from './components';
import { SelectToken } from '../SelectToken';
import { Amount, tokens, Tokens,networks,Networks } from './types';
import { radii } from 'src/theme/foundations/radii';
import { Button } from '@chakra-ui/button';

export function SwapWidget() {
    const [amount, setAmount] = useState<Amount>({ in: '', out: '' });
    const [recevieAddress, setReceiveAddres] = useState<string>('');
    const handleChange = (field: 'in' | 'out' | 'addr', event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (field === 'in') {
            setAmount({ in: value, out: String(parseFloat(value) *0.995) });
        }
        if(field === 'addr'){
            setReceiveAddres(value);
        }
    };

    const [network, setNetwork] = useState<Networks>(networks[0]);
    const _setNetwork = () => {
        setNetwork(networks.filter((value) => value?.label !== network?.label)[0])
    }

    const [token, setToken] = useState<Tokens>(tokens[0]);

    const setMax = async () => {
        if(network?.value == 'Solana'){
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let accounts =await provider.send("eth_requestAccounts", []);
        
        let account = accounts[0];
        const tokenContract = new ethers.Contract(token?.address, IERC20, provider);
        let balance:BigNumber = await tokenContract.balanceOf(account);
        
        let decimal = parseInt(await tokenContract.decimals());
        console.log(balance,decimal);
        let am = ethers.utils.formatUnits(balance, decimal);
        console.log(am);
        setAmount({in:am,out:String(parseFloat(am) *0.995)});
    }
    return (
        <WidgetWrapper>
            <WidgetTitle title="Transfer"  subtitle=''/>
            
            <WidgetBodyWrapper>
                <Grid templateColumns='repeat(5, 1fr)'  w='100%' gap={6} >
                    <GridItem colSpan={3} w='100%'>
                        <SelectToken<Tokens>  value={token} onChange={setToken} options={tokens} />
                    </GridItem>
                    <GridItem colSpan={2} w='100%'>
                        <SelectToken<Networks> value={network} onChange={setNetwork} options={networks} />
                    </GridItem>
                </Grid>

                <Box  w='100%' p={4} >
                </Box>

                <Grid templateColumns='repeat(5, 1fr)' w='100%' gap={6} >
                    <GridItem colSpan={3} w='100%'>
                        <SelectToken<Tokens>  value={token} onChange={setToken} options={tokens} />
                    </GridItem>
                    <GridItem colSpan={2} w='100%'>
                        <SelectToken<Networks> value={networks.filter((value) => value?.label !== network?.label)[0]} onChange={_setNetwork} options={networks} />
                    </GridItem>
                </Grid>
                              
                <Field
                    label="You send"
                    value={amount.in}
                    onChange={(event) => handleChange('in', event)}
                    placeholder="0.0"
                    type="number"
                >
                    <Button size={"sm"} onClick={() => setMax()} >   Max </Button>
                </Field>

                <Field
                    label="Receive Address"
                    value={recevieAddress}
                    height = '20px'
                    onChange={(event) => handleChange('addr', event)}
                    placeholder=""
                    type="string"
                >
                </Field>
                <Box borderRadius='7px' border='solid 1px' borderColor='#454545' w='100%' p={20}>
                    <Flex w="100%" p={4}>
                        <Box>You'll receive</Box>
                        <Spacer/>
                        <Box>{amount.out}</Box>
                    </Flex>
                    <Flex w="100%" p={4} fontSize={10}>
                        <Box>Slippage</Box>
                        <Spacer/>
                        <Box>0.5%</Box>
                    </Flex>
                    <Flex w="100%" p={4} fontSize={10}>
                        <Box>Gas on detination</Box>
                        <Spacer/>
                        <Box>{network?.value=='Ethereum'?'0.002 SOL':'0.07 ETH'}</Box>
                    </Flex>
                    <Flex w="100%" p={4} fontSize={10}>
                        <Box>Fee</Box>
                        <Spacer/>
                        <Box>-</Box>
                    </Flex>
                    <Flex w="100%" p={4} fontSize={10}>
                        <Box>Slippage</Box>
                        <Spacer/>
                        <Box>{network?.value=='Ethereum'?'0.002 ETH':'0.07 SOL'}</Box>
                    </Flex>
                </Box>

                <SwapWidgetButton token={token} network={network} amount={amount} rcevAddr = {recevieAddress}/>
                                
            </WidgetBodyWrapper>

            

            
        </WidgetWrapper>
    );
}
