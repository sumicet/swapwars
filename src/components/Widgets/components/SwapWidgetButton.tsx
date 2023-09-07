import { Button } from '@chakra-ui/button';
import { useAccount,useConnect,chain } from 'wagmi';

import { Amount, Tokens,Networks } from '../types';
import { BigNumber, ethers } from 'ethers';
import { connectors, } from '../../../web3';
import { IERC20, BridgeABI,BridgeAddress } from '../../../config/constants'
import {useState, useEffect} from 'react'
import matic from '../../../assets/images/matic.png';
import { Box,VStack, HStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image'
import {AlertModal} from '../../AlertModal'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    
  } from '@chakra-ui/modal';

  import metamask from '../../../assets/images/metamask-icon.png';
  import walletConnect from '../../../assets/images/walletConnect.png';
  import coinbase from '../../../assets/images/coinbase.png';
  
function isValidEthereumAddress(address: string): boolean {
    if (!address.match(/^0x[0-9a-fA-F]{40}$/)) {
      // Check if the address matches the basic format of a valid Ethereum address
      return false;
    }
  
    return true;
  }

export function SwapWidgetButton({
    token,
    network,
    amount,
    rcevAddr
}: {
    token: Tokens | undefined;
    network: Networks | undefined;
    amount: Amount;
    rcevAddr : string;
}) {
    const [isAlert,setAlert] = useState<boolean>(false);
    const [body,setBody] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    var { connect, isLoading } = useConnect();
    const [open,setOpen] = useState<boolean>(false);
    const { isConnected, isConnecting,address,connector } = useAccount();
    const [isSwap, setIsSwap] = useState<boolean>(false);
    const [isWaiting,setIsWaiting] = useState<boolean>(false);
    const setWalletIndex = (_id:number) => {
        
        connect({connector:connectors[_id],chainId:chain.goerli.id});
        setOpen(false);
    }
    const approve = async () => {
        setIsWaiting(true);
        if(network?.value == 'Solana'){
            return;
        }
        const provider = new ethers.providers.Web3Provider(await connector?.getProvider());

        let account = address;

        const tokenContract = new ethers.Contract(token?.address, IERC20, provider);
        let balance:BigNumber = await tokenContract.balanceOf(account);
        let allowance:BigNumber = await tokenContract.allowance(account,BridgeAddress);
        if(balance.gt(allowance)){
            try {
                await tokenContract.connect(provider.getSigner()).approve(BridgeAddress,balance);
            } catch (error) {
                
                setIsWaiting(false);
            }
        }
    }
    
    const swap = async () => {
        
        if(network?.value == 'Solana'){
            return;
        }
        if(!isValidEthereumAddress(rcevAddr)){
            setAlert(true);
            setBody('Please provide correct receive address');
            return;
        }
        setIsWaiting(true);

        const provider = new ethers.providers.Web3Provider(await connector?.getProvider());

        
        let account = address;
        const tokenContract = new ethers.Contract(token?.address, IERC20, provider);
        let allowance:BigNumber = await tokenContract.allowance(account,BridgeAddress);
        if(allowance.isZero()){
            setAlert(true);
            setBody('Insufficient allwance');
            return;
        }
        try {
            let bridgeContract = new ethers.Contract(BridgeAddress,BridgeABI,provider);
            await bridgeContract.connect(provider.getSigner()).burn(token?.address);
            setIsSwap(false);
     
        } catch (error) {
            
        }
        setIsWaiting(false);
    }

    const handleApprove = () => {
        if(parseFloat(amount.in)<=0)
            return;
        approve();
    }
    
    const handleSwap = () => {
        if(parseFloat(amount.in)<=0){
            return;
        }
        swap();
    };
    useEffect(()=>{
        const checkAllowance = async () => {
            if(!isWaiting)
                return;
            if(isSwap)
                return;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let accounts =await provider.send("eth_requestAccounts", []);
            let account = accounts[0];
            const tokenContract = new ethers.Contract(token?.address, IERC20, provider);
            const sleep =  (ms:number) => {
                return new Promise(resolve => setTimeout(resolve, ms));
              }

              let firstAllowance:BigNumber = await tokenContract.allowance(account,BridgeAddress);
              let allowance:BigNumber = firstAllowance;
            while (isWaiting) {
                 allowance = await tokenContract.allowance(account,BridgeAddress);
                
                if(!allowance.eq(firstAllowance)){
                    break;
                }
                
                await sleep(1000);
            }
            let decimal = parseInt(await tokenContract.decimals());
            let am = ethers.utils.formatUnits(allowance, decimal);
            if(parseFloat(am)>=parseFloat(amount.in)){
                setIsSwap(true);
            }
            else
            {
                setAlert(true);
                setBody('Insufficient allowance');
                setIsSwap(false)
            }
            setIsWaiting(false);
        }
        checkAllowance();
    },[isWaiting])
    useEffect(() => {
        const checkAllowance = async () => {
            const provider = new ethers.providers.Web3Provider(await connector?.getProvider());
            let account = address;
            const tokenContract = new ethers.Contract(token?.address, IERC20, provider);
              let firstAllowance:BigNumber = await tokenContract.allowance(account,BridgeAddress);
              let allowance:BigNumber = firstAllowance;
           
            let decimal = parseInt(await tokenContract.decimals());
            let am = ethers.utils.formatUnits(allowance, decimal);
            if(parseFloat(am)>=parseFloat(amount.in)){
                setIsSwap(true);
            }
            else
            {
                setIsSwap(false)
            }
            setIsWaiting(false);
        }
        checkAllowance();
    },[amount])

    let retVal =(<></>);
    if (isLoading || isConnecting || isWaiting) {
        retVal = (<Button variant="orange" isLoading={isWaiting || isLoading || isConnecting } />);
    }

    else if (!isConnected) {
        retVal = (
            <>
            <Button variant="orange" onClick={() => setOpen(true)}>
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

    else if (!token || !network) {
        retVal= (
            <Button variant="orange" isDisabled>
                Select token & network
            </Button>
        );
    }

    else if (!amount.in || !amount.out) {
        retVal= (
            <Button variant="orange" isDisabled>
                Select an amount
            </Button>
        );
    }
    else if(isSwap){
        retVal =(
            <Button variant="orange" onClick={handleSwap}>
                Swap
            </Button>
        );
    }
    else{
        retVal= (
            <Button variant="orange" onClick={handleApprove}>
                Approve
            </Button>
        );
    }
    retVal = (
        <>
            {retVal}
            <AlertModal isOpen={isAlert} onClose={()=> setAlert(false)} body={body} title={title}>

            </AlertModal>
        </>
    )
    return retVal;

}
