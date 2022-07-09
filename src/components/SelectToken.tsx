import { Image } from '@chakra-ui/image';
import { ControlProps, GroupBase, chakraComponents, OptionProps, Props } from 'chakra-react-select';
import { Select } from './Select/Select';

import { HStack, Text } from '@chakra-ui/layout';

function Control<Options>({ children, ...rest }: ControlProps<Options, false, GroupBase<Options>>) {
    const { selectProps } = rest;
    const { value } = selectProps;

    return (
        <chakraComponents.Control {...rest}>
            <HStack width='100%' alignItems='center' spacing='space10'>
                {/* TODO: Remove this */}
                {/* @ts-ignore */}
                {value && <Image src={selectProps.value?.image} boxSize='icon.medium' />}
                {children}
            </HStack>
        </chakraComponents.Control>
    );
}

function Option<Options extends unknown>({
    children,
    ...rest
}: OptionProps<Options, false, GroupBase<Options>>) {
    const { data } = rest;

    return (
        <chakraComponents.Option {...rest}>
            <HStack width='100%' alignItems='center' spacing='space10'>
                {/* @ts-ignore */}
                <Image src={data?.image} boxSize='icon.medium' />
                {/* @ts-ignore */}
                <Text>{data?.label}</Text>
            </HStack>
        </chakraComponents.Option>
    );
}

export function SelectToken<Options extends unknown>(
    props: Props<Options, false, GroupBase<Options>>
) {
    return (
        <Select
            {...props}
            isSearchable={false}
            hideSelectedOptions
            components={{
                Control,
                Option,
            }}
        />
    );
}
