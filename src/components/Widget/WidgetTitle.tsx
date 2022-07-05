import { Text, VStack } from '@chakra-ui/layout';

export function WidgetTitle({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <VStack spacing='space4' alignItems='flex-start' width='100%'>
            <Text variant='large' color='primary.light'>
                {title}
            </Text>
            <Text variant='medium' color='primary.medium'>
                {subtitle}
            </Text>
        </VStack>
    );
}
