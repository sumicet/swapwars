import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

// https://chakra-ui.com/docs/components/tabs/usage

export const Tabs: ComponentStyleConfig = {
    baseStyle: props => ({
        tab: {
            textStyle: 'extraLarge',
            color: mode('light.tertiary', 'dark.secondary')(props),
            _selected: {
                color: mode('light.bg.secondary', 'dark.tertiary')(props),
            },
            height: 'tabs.height',
            width: '100%',
            zIndex: 1,
        },
        tablist: {
            bg: mode('light.bg.secondary', 'dark.bg.secondary')(props),
            borderRadius: 'radius14',
        },
        indicator: {
            bg: mode('accent.purple', 'dark.bg.tertiary')(props),
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
