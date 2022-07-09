import { ComponentStyleConfig } from '@chakra-ui/theme';

// https://chakra-ui.com/docs/components/tabs/usage

export const Tabs: ComponentStyleConfig = {
    baseStyle: props => ({
        tab: {
            textStyle: 'extraLarge',
            color: 'primary.medium',
            _selected: {
                color: 'primary.light',
            },
            height: 'tabs.height',
            width: '100%',
            zIndex: 1,
        },
        tablist: {
            bg: 'bg.medium',
            borderRadius: 'radius14',
        },
        indicator: {
            bg: 'bg.light',
            position: 'absolute',
            top: 0,
            height: 'tabs.height',
            borderRadius: 'radius14',
            transitionDuration: 'fast', // This also fixed the transition bug where the first tab change isn't animated
        },
        tabpanels: {
            mt: 'space20',
        },
        // tabs: {},
    }),
};
