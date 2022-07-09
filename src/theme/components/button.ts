import { ComponentStyleConfig } from '@chakra-ui/theme';

// https://chakra-ui.com/docs/components/button/usage

export const Button: ComponentStyleConfig = {
    baseStyle: {
        bg: 'accent.orange',
        padding: 'space20',
        borderRadius: 'radius40',
        width: '100%',
        textStyle: 'large',
        color: 'primary.light',
        boxShadow: 'buttonOrange',

        _disabled: {
            bg: 'bg.light',
            boxShadow: 'none',
            color: 'primary.medium',
            cursor: 'default',
        },
    },
    variants: {
        purple: {
            bg: 'accent.purple',
            boxShadow: 'buttonPurple',
        },
    },
};
