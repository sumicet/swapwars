import type { ComponentStyleConfig } from '@chakra-ui/theme';

// https://chakra-ui.com/docs/components/menu/usage

// Chakra React Select doesn't work without the item's _focus style
export const Menu: ComponentStyleConfig = {
    baseStyle: {
        item: {
            _focus: {},
        },
    },
};
