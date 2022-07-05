import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
    baseStyle: {
        bg: 'accent.orange',
        padding: 'space20',
        borderRadius: 'radius40',
        width: '100%',
        textStyle: 'large',
        color: 'primary.light',
        boxShadow: 'buttonOrange',
    },
    variants: {
        purple: {
            bg: 'accent.purple',
            boxShadow: 'buttonPurple',
        },
    },
};
