import { mode, MultiStyleConfig } from '@chakra-ui/theme-tools';

// https://chakra-ui.com/docs/components/modal/usage

// 2.1.1 has a bug where the modal doesn't open, using 2.0.2 for now
// https://github.com/chakra-ui/chakra-ui/issues/6304
// https://github.com/chakra-ui/chakra-ui/pull/6303

export const Modal: MultiStyleConfig = {
    baseStyle: (props) => ({
        // overlay: {
        //     // zIndex: 'modal',
        //     bg: 'transparent',
        //     width: '100%',
        //     height: '100%',
        //     display: 'flex',
        // },
        dialogContainer: {
            display: 'flex',
            alignItems: props.isCentered ? 'center' : 'flex-start',
            justifyContent: props.isCentered ? 'center' : 'flex-start',
            bg: 'transparent',
        },
        dialog: {
            bg: 'accent.glass',
            display: 'flex',
            width: 'modal',
            boxShadow: mode('modal.light', 'modal.dark')(props),
            border: '1.2px solid',
            borderColor: mode('light.modalBorder', 'dark.ModalBorder')(props),
            backdropFilter: 'blur(33px)',
            borderRadius: 'radius40',
            padding: 'space60',
            alignItems: 'center',
        },
        header: {
            textStyle: 'large',
            paddingBottom: 'space40',
            color: mode('light.tertiary', 'dark.primary')(props),
        },
        // closeButton: {},
        body: {
            display: 'flex',
            textStyle: 'small',
        },
        // footer: {},
    }),
};
