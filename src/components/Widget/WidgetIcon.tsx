import { Box, BoxProps } from '@chakra-ui/layout';
import { useToken } from '@chakra-ui/system';
import { Polygon, PolygonProps } from '../Polygon';

type WidgetIconProps = BoxProps & Pick<PolygonProps, 'icon' | 'rotateIcon'>;

export function WidgetIcon({ icon, rotateIcon, ...rest }: WidgetIconProps) {
    const labelInputSpace = useToken('space', 'space8');

    return (
        <Box {...rest} position='relative' width='100%'>
            <Box
                position='absolute'
                left='50%'
                // TODO Find a better way to get the label height (19px)
                transform={`translateX(-50%) translateY(calc(-50% + (${labelInputSpace} + 19px) / 2))`}
            >
                <Polygon icon={icon} rotateIcon={rotateIcon} />
            </Box>
        </Box>
    );
}
