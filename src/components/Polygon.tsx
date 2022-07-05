import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Box, BoxProps, Flex } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

import purplePolygon from '../assets/images/purplePolygon.png';

export interface PolygonProps extends BoxProps {
    icon: IconType;
    rotateIcon?: boolean;
}

export function Polygon({ icon, rotateIcon = false, ...rest }: PolygonProps) {
    return (
        <Box {...rest} position='relative'>
            <Image src={purplePolygon} alt='swap' width='50px' objectFit='contain' />
            <Flex
                position='absolute'
                top='50%'
                left='50%'
                transform={`translateX(-50%) translateY(-50%)`}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        display: 'flex',
                    }}
                >
                    <Icon
                        as={icon}
                        color='primary.light'
                        boxSize='icon.small'
                        transform={`${rotateIcon ? 'rotate(90deg)' : ''}`}
                    />
                </motion.div>
            </Flex>
        </Box>
    );
}
