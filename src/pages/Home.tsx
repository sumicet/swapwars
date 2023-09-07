import { Flex } from '@chakra-ui/layout';
import { AnimatePresence } from 'framer-motion';
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

export function Home() {
    return (
        <Flex flex={1} align="center" justify="center" width="100%">
            <AnimatePresence>
                <SwapWidget />
            </AnimatePresence>
        </Flex>
    );
}
