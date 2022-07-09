import { Flex } from '@chakra-ui/layout';
import {
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    SwapWidget,
    FaucetWidget,
} from '../components';
import { AnimatePresence } from 'framer-motion';

export function Home() {
    return (
        <Flex flex={1} align='center' justify='center' width='100%'>
            <AnimatePresence>
                <Tabs isLazy position='relative'>
                    <TabList>
                        <Tab>Exchange</Tab>
                        <Tab>Faucet</Tab>
                    </TabList>
                    <TabIndicator />
                    <TabPanels>
                        <TabPanel>
                            <SwapWidget />
                        </TabPanel>
                        <TabPanel>
                            <FaucetWidget />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </AnimatePresence>
        </Flex>
    );
}
