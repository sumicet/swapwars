import { Flex } from '@chakra-ui/layout';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '../components/Tabs';
import { SwapWidget } from '../components/SwapWidget';
import { FaucetWidget } from '../components/FaucetWidget';

export function Home() {
    return (
        <Flex flex={1} align='center' justify='center' width='100%'>
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
        </Flex>
    );
}
