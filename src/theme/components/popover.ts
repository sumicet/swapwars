import { MultiStyleConfig } from '@chakra-ui/system';
import { mode } from '@chakra-ui/theme-tools';

// https://chakra-ui.com/docs/components/popover/usage

export const Popover: MultiStyleConfig = {
    baseStyle: (props: any) => ({
        content: {
            bg: mode('light.bg.secondary', 'dark.bg.secondary')(props),
            borderRadius: 'radius14',
            _focusVisible: {
                outline: 0,
            },
            padding: 'space20',
        },
        popper: {
            zIndex: 'popover',
        },
        body: {},
    }),
};
