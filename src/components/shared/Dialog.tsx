import React from "react";
import {
  Modal,
  ModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";

export interface DialogProps extends Omit<ModalProps, "children"> {
  title: string | React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ title, children, ...rest }) => (
  <Modal {...rest}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb="4">{children}</ModalBody>
    </ModalContent>
  </Modal>
);

export default Dialog;
