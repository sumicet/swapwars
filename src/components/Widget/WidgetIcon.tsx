import { Box } from '@chakra-ui/layout';
import { useToken } from '@chakra-ui/system';
import { SwapPolygon } from '../SwapPolygon';

export function WidgetIcon() {
    const labelInputSpace = useToken('space', 'space8');

    return (
        <Box position='relative' bg='red' width='100%'>
            <Box
                position='absolute'
                left='50%'
                // TODO Find a better way to get the label height (19px)
                transform={`translateX(-50%) translateY(calc(-50% + (${labelInputSpace} + 19px) / 2))`}
            >
                <SwapPolygon />
            </Box>
        </Box>
    );
}
