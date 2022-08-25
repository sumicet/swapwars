import { HStack, Text, VStack } from '@chakra-ui/layout';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { ReactNode } from 'react';
import { Image } from '@chakra-ui/image';
import { useColorModeValue } from '@chakra-ui/system';
import { chain, useAccount, useBalance } from 'wagmi';
import { Token } from '../../web3';
import grogu from '../../assets/images/grogu.png';
import mando from '../../assets/images/mando.png';
import matic from '../../assets/images/matic.png';
import { config } from '../../config';
import { stringToFixed } from '../../utils';

type Balances =
    | {
          [key in Token]: string | null;
      };

const TokenImages: Balances = {
    Matic: matic,
    Grogu: grogu,
    Mando: mando,
};

/**
 * @param children The popover trigger
 */
export function BalancePopover({ children }: { children: ReactNode }) {
    const { address } = useAccount();
    const useBalanceArgs = { addressOrName: address, watch: true, chainId: chain.polygonMumbai.id };
    const { data: groguData } = useBalance({
        ...useBalanceArgs,
        token: config.contract.Grogu,
    });
    const { data: mandoData } = useBalance({
        ...useBalanceArgs,
        token: config.contract.Mando,
    });
    const { data: maticData } = useBalance({
        ...useBalanceArgs,
        token: config.contract.Matic,
    });
    const balances = {
        Grogu: stringToFixed(groguData?.formatted || '', 4),
        Mando: stringToFixed(mandoData?.formatted || '', 4),
        Matic: stringToFixed(maticData?.formatted || '', 4),
    };

    const textColor = useColorModeValue('light.primary', 'dark.tertiary');

    return (
        <Popover trigger="hover" matchWidth>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <VStack>
                        {balances &&
                            Object.entries(balances).map(([key, value]) => (
                                <HStack key={key}>
                                    <Image
                                        src={TokenImages[key as Token] || ''}
                                        boxSize="icon.medium"
                                        objectFit="contain"
                                    />
                                    <Text color={textColor}>{value}</Text>
                                </HStack>
                            ))}
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
