import { Box } from '@chakra-ui/layout';
import { forwardRef, useMultiStyleConfig } from '@chakra-ui/system';
import { TabIndicatorProps, useTabIndicator } from '@chakra-ui/tabs';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

const TabIndicator = forwardRef<TabIndicatorProps, 'div'>((props, ref) => {
    const indicatorStyle = useTabIndicator();

    const style = {
        ...props.style,
        ...indicatorStyle,
    };

    console.log(indicatorStyle);

    const styles = useMultiStyleConfig('Tabs', props);

    return <Box ref={ref} {...props} sx={{ ...style, ...(styles?.indicator || {}) }} />;
});

export { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs };
