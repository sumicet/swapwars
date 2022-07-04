import { foundations } from './foundations';
import { components } from './components';
import { ThemeConfig } from '@chakra-ui/theme';

export const theme = {
    components,
    ...foundations,
    config: {
        useSystemColorMode: true,
        initialColorMode: 'light',
        cssVarPrefix: 'picker',
    } as ThemeConfig,
};
