import { Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { ReactNode } from 'react';
import { Image } from '@chakra-ui/image';
import { useColorModeValue } from '@chakra-ui/system';
import { chain, useAccount, useBalance } from 'wagmi';
import { Button } from '@chakra-ui/button';
import { Token, useDisconnect } from '../../web3';
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
export function AccountPopover({ children }: { children: ReactNode }) {
    const { address } = useAccount();
    const { disconnect, isLoading } = useDisconnect();
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
    const labelColor = useColorModeValue('light.secondary', 'dark.secondary');

    return (
        <Popover trigger="hover" placement="bottom-end" matchWidth>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
                    <VStack spacing="space20" alignItems="flex-start" width="100%">
                        {balances && (
                            <VStack spacing="space8" alignItems="flex-start" width="100%">
                                <Text variant="label" fontWeight="bold" color={labelColor}>
                                    BALANCE
                                </Text>
                                {/* <Divider color="red" height="1px" width="100%" /> */}
                                {Object.entries(balances).map(([key, value]) => (
                                    <HStack key={key} width="100%">
                                        <Flex flex={1}>
                                            <Image
                                                src={TokenImages[key as Token] || ''}
                                                boxSize="icon.medium"
                                                objectFit="contain"
                                            />
                                        </Flex>
                                        <Text color={textColor}>{value}</Text>
                                    </HStack>
                                ))}
                            </VStack>
                        )}
                        <Button variant="small" onClick={disconnect} isLoading={isLoading}>
                            Disconnect
                        </Button>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
