import React from "react";
import {
  Alert,
  AlertProps,
  AlertIcon,
  HStack,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export interface SnackbarProps {
  message: string;
  status: AlertProps["status"];
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, status, onClose }) => (
  <Alert status={status} bg="gray.500" rounded="md" px="3" py="2">
    <AlertIcon />
    <HStack w="full" justify="space-between">
      <AlertDescription>{message}</AlertDescription>
      <CloseButton ml="2" onClick={onClose} />
    </HStack>
  </Alert>
);

export default Snackbar;
