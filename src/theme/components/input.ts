import { MultiStyleConfig } from '@chakra-ui/theme-tools';

export const Input: MultiStyleConfig = {
    baseStyle: {
        field: {
            borderRadius: 'radius40',
            paddingX: 'space40',
            paddingY: 'space30',
            bg: 'bg.dark',
            color: 'primary.light',
            textStyle: 'medium',
            _focusVisible: {
                outline: 0,
                bg: 'bg.darkHover',
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
