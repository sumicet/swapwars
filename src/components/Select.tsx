import { ThemingProps } from '@chakra-ui/system';
import { GroupBase, Props, Select as ChakraReactSelect } from 'chakra-react-select';
import { useSelectStyles } from './Select/useSelectStyles';

export type SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<Props<Option, IsMulti, Group>, 'size'> & Pick<ThemingProps<'Select'>, 'size' | 'variant'>;

export function Select<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>({ size, variant, ...rest }: SelectProps<Option, IsMulti, Group>) {
    const styles = useSelectStyles<Option, IsMulti, Group>({ size, variant });

    return <ChakraReactSelect {...rest} chakraStyles={styles} />;
}
