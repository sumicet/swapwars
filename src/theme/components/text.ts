import { ComponentStyleConfig } from '@chakra-ui/theme';
import { textStyles } from '../foundations/textStyles';

// https://chakra-ui.com/docs/components/text/usage

export const Text: ComponentStyleConfig = {
    variants: textStyles,
    defaultProps: {
        variant: 'medium',
    },
};
