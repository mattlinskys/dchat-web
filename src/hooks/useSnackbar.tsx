import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import Snackbar, { SnackbarProps } from "components/shared/Snackbar";

const useSnackbar = () => {
  const toast = useToast();

  return useCallback(
    (status: SnackbarProps["status"], message: string, duration = 7000) => {
      toast({
        duration,
        isClosable: true,
        render: ({ onClose }) => (
          <Snackbar status={status} message={message} onClose={onClose} />
        ),
      });
    },
    [toast]
  );
};

export default useSnackbar;
