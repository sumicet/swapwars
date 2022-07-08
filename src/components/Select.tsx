import { GroupBase, Props, Select as ChakraReactSelect } from 'chakra-react-select';

export function Select<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
    return (
        // TODO prettify
        <ChakraReactSelect
            {...props}
            chakraStyles={{
                container: (provider, state) => ({
                    ...provider,
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    cursor: 'pointer',
                }),
                control: (provider, state) => ({
                    ...provider,
                    height: '100%',
                    width: '100%',
                    borderRadius: 'radius29',
                    bg: 'bg.light',
                    _groupHover: {
                        bg: 'bg.lightHover',
                    },
                    borderBottomRadius: state.menuIsOpen ? 0 : 'radius29',
                    padding: 'space20',
                    borderBottom: '1px solid',
                    borderColor: state.menuIsOpen ? 'bg.border' : 'transparent',
                }),
                menu: (provider, state) => ({
                    ...provider,
                    // bg: 'bg.light',
                    mt: 0,
                    textStyle: 'medium',
                    color: 'primary.medium',
                    borderBottomRadius: 'radius29',
                }),
                option: (provider, state) => ({
                    ...provider,
                    _hover: {
                        color: 'primary.light',
                    },
                    paddingY: 'space10',
                    paddingX: 0,
                }),
                menuList: (provider, state) => ({
                    ...provider,
                    bg: 'bg.light',
                    _groupHover: {
                        bg: 'bg.lightHover',
                    },
                    paddingX: 'space20',
                    paddingY: 'space10',
                }),
                singleValue: (provider, state) => ({
                    ...provider,
                    marginInlineEnd: 0,
                    marginInlineStart: 0,
                }),
                valueContainer: (provider, state) => ({
                    ...provider,
                    padding: 0,
                }),
            }}
        />
    );
}
