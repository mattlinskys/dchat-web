import { useEffect } from "react";
import useSnackbar from "hooks/useSnackbar";
import type { TransactionStatus } from "@usedapp/core";

const useContractFunctionSuccessToast = (
  state: TransactionStatus,
  message: string
) => {
  const snackbar = useSnackbar();

  useEffect(() => {
    if (state.status === "Success") {
      snackbar("success", message);
    }
  }, [state]);
};

export default useContractFunctionSuccessToast;
