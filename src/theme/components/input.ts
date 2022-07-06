import { MultiStyleConfig } from '@chakra-ui/theme-tools';

export const Input: MultiStyleConfig = {
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
