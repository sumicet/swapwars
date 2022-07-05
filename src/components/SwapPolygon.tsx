import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Box, BoxProps, Flex } from '@chakra-ui/layout';
import { FiRepeat } from 'react-icons/fi';
import purplePolygon from '../assets/images/purplePolygon.png';

export function SwapPolygon(props: BoxProps) {
    return (
        <Box {...props} position='relative'>
            <Image src={purplePolygon} alt='swap' boxSize='50px' objectFit='contain' />
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
