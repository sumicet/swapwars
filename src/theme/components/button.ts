import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

// https://chakra-ui.com/docs/components/button/usage

export const Button: ComponentStyleConfig = {
    baseStyle: props => ({
        bg: 'accent.orange',
        padding: 'space20',
        borderRadius: 'radius40',
        width: '100%',
        textStyle: 'large',
        color: mode('dark.tertiary', 'primary.bg.secondary')(props),
        boxShadow: 'buttonOrange',

        _disabled: {
            bg: mode('light.bg.primary', 'dark.bg.tertiary')(props),
            boxShadow: 'none',
            color: mode('light.secondary', 'dark.secondary')(props),
            cursor: 'default',
        },
    }),
    variants: {
        purple: {
            bg: 'accent.purple',
            boxShadow: 'buttonPurple',
        },
        plain: props => ({
            bg: mode('light.bg.secondary', 'dark.bg.secondary')(props),
            boxShadow: 'none',
            borderRadius: 'radius14',
        }),
    },
};
