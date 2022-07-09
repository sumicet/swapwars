import { CSSObject, ThemingProps, useMultiStyleConfig } from '@chakra-ui/system';
import { ChakraStylesConfig, GroupBase } from 'chakra-react-select';
import { chakraReactSelectComponents } from '../../utils';

export function useSelectStyles<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(props: Pick<ThemingProps<'Select'>, 'size' | 'variant'>) {
    const style = useMultiStyleConfig('Select', props);

    const styles: ChakraStylesConfig<Option, IsMulti, Group> | undefined = {
        ...chakraReactSelectComponents
            .map((component: string) => ({
                [component]: (provider: CSSObject) => ({
                    ...provider,
                    ...(style[component] || {}),
                }),
            }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {}),
        control: (provider, state) => ({
            ...provider,
            ...style.control,
            borderBottomRadius: state.menuIsOpen ? 0 : 'radius29',
            borderColor: state.menuIsOpen ? 'bg.border' : 'transparent',
        }),
    };

    console.log(styles);

    return styles;
}
