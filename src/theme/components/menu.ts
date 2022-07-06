import type { ComponentStyleConfig } from '@chakra-ui/theme';

// Chakra React Select doesn't work without the item's _focus style
const Menu: ComponentStyleConfig = {
    baseStyle: {
        item: {
            _focus: {},
        },
    },
};

export { Menu };
