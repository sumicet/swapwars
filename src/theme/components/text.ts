import { ComponentStyleConfig } from '@chakra-ui/theme';
import { textStyles } from '../foundations/textStyles';

export const Text: ComponentStyleConfig = {
    variants: textStyles,
    defaultProps: {
        variant: 'medium',
    },
};
