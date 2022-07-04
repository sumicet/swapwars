import { MultiStyleConfig } from '@chakra-ui/theme-tools';

export const Popover: MultiStyleConfig = {
    baseStyle: {
        content: {
            bg: 'primary.400',
            borderRadius: 'radius14',
            px: 'space16',
            py: 'space16',
            _focusVisible: {
                outline: 0,
            },
            width: 300,
            maxWidth: '100vw',
        },
        popper: {
            zIndex: 'popover',
        },
        body: {},
    },
};
