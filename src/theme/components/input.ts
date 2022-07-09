import { ComponentStyleConfig } from '@chakra-ui/theme';

// https://chakra-ui.com/docs/components/input/usage

export const Input: ComponentStyleConfig = {
    baseStyle: {
        field: {
            borderRadius: 'radius40',
            paddingX: 'space40',
            paddingY: 'space30',
            color: 'primary.light',
            textStyle: 'medium',
            bg: 'transparent',
            _focusVisible: {
                outline: 0,
            },
            _placeholder: {
                color: 'primary.medium',
            },
        },
    },
    variants: {
        halfRound: {
            field: {
                borderLeftRadius: 0,
                textAlign: 'right',
            },
        },
    },
};
