import { ThemingProps, useMultiStyleConfig } from '@chakra-ui/system';
import { ChakraStylesConfig, GroupBase } from 'chakra-react-select';

export function useSelectStyles<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: Pick<ThemingProps<'Select'>, 'size' | 'variant'>) {
    const style = useMultiStyleConfig('Select', props);

    const styles: ChakraStylesConfig<Option, IsMulti, Group> | undefined = {
        container: provider => ({
            ...provider,
            ...style.container,
        }),
        control: (provider, state) => ({
            ...provider,
            ...style.control,
            borderBottomRadius: state.menuIsOpen ? 0 : 'radius29',
            borderColor: state.menuIsOpen ? 'bg.border' : 'transparent',
        }),
        menu: provider => ({
            ...provider,
            ...style.menu,
        }),
        option: provider => ({
            ...provider,
            ...style.option,
        }),
        menuList: provider => ({
            ...provider,
            ...style.menuList,
        }),
        singleValue: provider => ({
            ...provider,
            ...style.singleValue,
        }),
        valueContainer: provider => ({
            ...provider,
            ...style.valueContainer,
        }),
    };

    return styles;
}
