import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add member</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb="4">TODO</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddMemberDialog;
