import { Container, Flex, VStack } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { SwapWidget } from '../components/SwapWidget';

export function Home() {
    return (
        <Flex flex={1} align='center' justify='center' width='100%'>
            <Tabs variant='unstyled'>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Tab 1</Tab>
                    <Tab _selected={{ color: 'white', bg: 'green.400' }}>Tab 2</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <SwapWidget />
                    </TabPanel>
                    <TabPanel>
                        <SwapWidget />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
}
