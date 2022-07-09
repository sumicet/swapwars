import { Text, VStack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';

export function WidgetTitle({ title, subtitle }: { title: string; subtitle: string }) {
    const titleColor = useColorModeValue('light.tertiary', 'dark.tertiary');
    const subtitleColor = useColorModeValue('light.secondary', 'dark.secondary');

    return (
        <VStack spacing='space4' alignItems='flex-start' width='100%'>
            <Text variant='large' color={titleColor}>
                {title}
            </Text>
            <Text variant='medium' color={subtitleColor}>
                {subtitle}
            </Text>
        </VStack>
    );
}
