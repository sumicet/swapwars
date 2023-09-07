import { Button } from '@chakra-ui/button';
import { useAccount ,useConnect,chain} from 'wagmi';
import { connectors,installWallet } from '../../web3';
import { AccountPopover } from './AccountPopover';
import { useEffect, useState } from 'react';
import { Box,VStack, HStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image'

import metamask from '../../assets/images/metamask-icon.png';
import walletConnect from '../../assets/images/walletConnect.png';
import coinbase from '../../assets/images/coinbase.png';


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    
  } from '@chakra-ui/modal';
  import { AppState } from '../../store';
import { useSelector } from 'react-redux';
export function Web3Button() {
    const network = useSelector((state: AppState) => state.network);
    const { isConnected, address, isConnecting, isDisconnected } = useAccount();
    const {connect,isLoading} = useConnect();
    const [open, setOpen] = useState<boolean>(false);
    const connectWallet = () => {
        if(network == 'Ethereum')     setOpen(true);
        else{
            
        }
    }
    
    const setWalletIndex = (_id:number) => {
        
        connect({connector:connectors[_id],chainId:chain.goerli.id});
        setOpen(false);
    }
    if (isLoading || isConnecting) {
        return (
            <Button
                isLoading={isLoading || isConnecting}
                size="medium"
                textStyle="medium"
                width={165}
            />
        );
    }

    if (isConnected) {
        return (
            <AccountPopover>
                <Button size="medium" width={165}>
                    {address?.slice(0, 6)}...{address?.slice(address.length - 4)}
                </Button>
            </AccountPopover>
        );
    }
    
    if (isDisconnected) {
        return (
            <>
            <Button size="medium" onClick={connectWallet} textStyle="medium" width={165}>
                Connect wallet
            </Button>
            <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
                <ModalContent>
                    <ModalHeader>Select a wallet</ModalHeader>
                    <ModalBody>
                        <VStack spacing='10px'>
                        <Button
                            variant="purple"
                            onClick={()=> setWalletIndex(0)}
                            textStyle="medium"
                            justifyContent='flex-start'
                        >
                            <HStack spacing="space10">
                                <Image src={metamask} boxSize="space40" />
                                <Box>MetaMask</Box>
                            </HStack>
                        </Button>
                        <Button
                            variant="purple"
                            onClick={()=> setWalletIndex(1)}
                            textStyle="medium"
                            justifyContent='flex-start'
                        >
                            <HStack spacing="space10">
                                <Image src={coinbase} boxSize="space40" />
                                <Box>CoinBase</Box>
                            </HStack>
                        </Button>
                        <Button
                            variant="purple"
                            onClick={()=> setWalletIndex(2)}
                            textStyle="medium"
                            justifyContent='flex-start'
                        >
                            <HStack spacing="space10">
                                <Image src={walletConnect} boxSize="space40" />
                                <Box>WalletConnect</Box>
                            </HStack>
                        </Button>
                        
                        </VStack>
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
            </>
            
        );
    }
    
    return (
        <div>
            <Button size="medium" onClick={installWallet} textStyle="medium" width={165}>
                Install MetaMask
            </Button>
                        
        </div>
        
    
    );
}
