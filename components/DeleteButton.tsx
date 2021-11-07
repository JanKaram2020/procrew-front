import React, { useState, useRef } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import * as api from 'users/api';

const DeleteButton = ({ id }: { id: number }) => {
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation(() => api.deleteUser({ id }), {
        onSettled: () => {
            queryClient.invalidateQueries('users');
        },
    });
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const onDelete = async () => {
        setIsOpen(false);
        mutate();
    };
    const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
    return (
        <>
            <IconButton
                colorScheme="red"
                isLoading={isLoading}
                aria-label="delete user"
                icon={<AiTwotoneDelete />}
                onClick={() => setIsOpen(true)}
            />
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete User
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure? You cannot undo this action afterwards.</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteButton;
