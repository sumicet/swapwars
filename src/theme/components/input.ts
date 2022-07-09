import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';

// https://chakra-ui.com/docs/components/input/usage

export const Input: ComponentStyleConfig = {
    baseStyle: props => ({
        field: {
            borderRadius: 'radius40',
            paddingX: 'space40',
            paddingY: 'space30',
            color: mode('light.tertiary', 'dark.tertiary')(props),
            textStyle: 'medium',
            bg: 'transparent',
            _focusVisible: {
                outline: 0,
            },
            _placeholder: {
                color: mode('light.secondary', 'dark.secondary')(props),
            },
        },
    }),
    variants: {
        halfRound: {
            field: {
                borderLeftRadius: 0,
                textAlign: 'right',
            },
        },
    },
};
