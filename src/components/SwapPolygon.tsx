import Icon from '@chakra-ui/icon';
import { Box, BoxProps, Flex } from '@chakra-ui/layout';
import { FiRepeat } from 'react-icons/fi';
import { PolygonIcon } from './PolygonIcon';

export function SwapPolygon(props: BoxProps) {
    return (
        <Box {...props} position='relative'>
            <PolygonIcon />
            <Flex
                position='absolute'
                top='50%'
                left='50%'
                transform='translateX(-50%) translateY(-50%) rotate(90deg)'
            >
                <Icon as={FiRepeat} color='primary.light' boxSize='icon.small' />
            </Flex>
        </Box>
    );
}
