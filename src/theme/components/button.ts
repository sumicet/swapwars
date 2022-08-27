import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

// https://chakra-ui.com/docs/components/button/usage

export const Button: ComponentStyleConfig = {
    baseStyle: (props) => ({
        paddingX: 'space20',
        height: 'button',
        borderRadius: 'radius40',
        width: '100%',
        textStyle: 'large',

        _disabled: {
            bg: mode('light.bg.primary', 'dark.bg.tertiary')(props),
            boxShadow: 'none',
            color: mode('light.secondary', 'dark.secondary')(props),
            cursor: 'default',
        },
    }),
    variants: {
        purple: (props) => ({
            bg: 'accent.purple',
            boxShadow: 'buttonPurple',
            color: mode('light.bg.secondary', 'dark.tertiary')(props),
        }),
        plain: (props) => ({
            bg: mode('light.bg.secondary', 'dark.bg.secondary')(props),
            borderRadius: 'radius14',
            color: mode('light.primary', 'dark.tertiary')(props),
        }),
        small: (props) => ({
            paddingX: 'space10',
            paddingY: 'space10',
            height: 'auto',
            borderRadius: 'radius7',
            width: '100%',
            bg: mode('light.bg.primary', 'dark.bg.tertiary')(props),
            color: mode('light.secondary', 'dark.secondary')(props),

            _hover: {
                color: mode('light.tertiary', 'dark.tertiary')(props),
            },
        }),
        orange: (props) => ({
            bg: 'accent.orange',
            color: mode('light.bg.secondary', 'dark.tertiary')(props),
            boxShadow: 'buttonOrange',
        }),
    },
    sizes: {
        medium: {
            textStyle: 'medium',
        },
    },
    defaultProps: {
        variant: 'plain',
    },
};
