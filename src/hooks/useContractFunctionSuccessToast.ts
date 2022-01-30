import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import type { TransactionStatus } from "@usedapp/core";

const useContractFunctionSuccessToast = (
  state: TransactionStatus,
  title: string
) => {
  const toast = useToast();

  useEffect(() => {
    if (state.status === "Success") {
      toast({
        title: title,
        status: "success",
        duration: 7500,
        isClosable: true,
      });
    }
  }, [state]);
};

export default useContractFunctionSuccessToast;
