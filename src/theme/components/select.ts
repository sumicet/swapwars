import { ComponentStyleConfig } from '@chakra-ui/theme';
import { mode } from '@chakra-ui/theme-tools';
import { chakraReactSelectComponents } from '../../utils';

// https://github.com/csandman/chakra-react-select

export const Select: ComponentStyleConfig = {
    parts: chakraReactSelectComponents,
    baseStyle: props => ({
        container: {
            width: '100%',
            height: '100%',
            borderRadius: 0,
            cursor: 'pointer',
        },
        control: {
            height: '100%',
            width: '100%',
            borderRadius: 'radius29',
            bg: mode('light.bg.primary', 'dark.bg.tertiary')(props),
            _groupHover: {
                bg: mode('light.bg.secondary', 'dark.bg.hover.tertiary')(props),
            },
            padding: 'space20',
            borderBottom: '1px solid',
            borderColor: mode('transparent', 'dark.bg.border')(props),
        },
        menu: {
            mt: 0,
            textStyle: 'medium',
            color: mode('light.tertiary', 'dark.secondary')(props),
            _groupHover: {
                color: mode('light.secondary', 'dark.secondary')(props),
            },
            borderBottomRadius: 'radius29',
            outline: mode('1px solid', 'none')(props),
            outlineColor: mode('light.bg.primary', 'transparent')(props),
        },
        option: {
            _hover: {
                color: mode('light.tertiary', 'dark.tertiary')(props),
            },
            paddingY: 'space10',
            paddingX: 0,
        },
        menuList: {
            bg: mode('light.bg.primary', 'dark.bg.tertiary')(props),
            _groupHover: {
                bg: mode('light.bg.secondary', 'dark.bg.hover.tertiary')(props),
            },
            paddingX: 'space20',
            paddingY: 'space10',
        },
        singleValue: {
            marginInlineEnd: 0,
            marginInlineStart: 0,
        },
        valueContainer: {
            padding: 0,
        },
    }),
};
