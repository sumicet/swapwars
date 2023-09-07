
import {
    AlertDialog,
    Modal,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,    
} from '@chakra-ui/modal';
import {Button} from '@chakra-ui/button'
import React from 'react';

export function AlertModal({
    isOpen,
    onClose,
    title,
    body
}: {
    isOpen:boolean,
    onClose:()=>void,
    title:string,
    body:string
}) {
    const cancelRef = React.useRef()
  return (
    <>

    <Modal  isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent borderWidth='2px' borderColor='black'>
            

            <AlertDialogHeader paddingBottom='20px' fontSize='20px' textAlign='center' lineHeight='28px'>
              {body}
            </AlertDialogHeader>

            <AlertDialogFooter>
              
              <Button colorScheme='red' onClick={onClose} ml={5} paddingLeft='30px' paddingRight='30px'>
                OK
              </Button>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </Modal>
    </>
  )
}