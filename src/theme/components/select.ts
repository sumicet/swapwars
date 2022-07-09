import { ComponentStyleConfig } from '@chakra-ui/theme';
import { chakraComponents } from 'chakra-react-select';
import lowerFirst from 'lodash/lowerFirst';

// https://github.com/csandman/chakra-react-select

export const Select: ComponentStyleConfig = {
    parts: Object.keys(chakraComponents).map(name => lowerFirst(name)),
    baseStyle: {
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
            bg: 'bg.light',
            _groupHover: {
                bg: 'bg.lightHover',
            },
            padding: 'space20',
            borderBottom: '1px solid',
        },
        menu: {
            mt: 0,
            textStyle: 'medium',
            color: 'primary.medium',
            borderBottomRadius: 'radius29',
        },
        option: {
            _hover: {
                color: 'primary.light',
            },
            paddingY: 'space10',
            paddingX: 0,
        },
        menuList: {
            bg: 'bg.light',
            _groupHover: {
                bg: 'bg.lightHover',
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
    },
};
