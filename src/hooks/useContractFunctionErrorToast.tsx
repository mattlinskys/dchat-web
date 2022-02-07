import { useEffect } from "react";
import { useIntl } from "react-intl";
import useSnackbar from "hooks/useSnackbar";
import type { TransactionStatus } from "@usedapp/core";

const useContractFunctionErrorToast = (state: TransactionStatus) => {
  const snackbar = useSnackbar();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (state.status === "Exception" || state.status === "Fail") {
      snackbar(
        "error",
        state.errorMessage || formatMessage({ id: "erros.default" })
      );
    }
  }, [state]);
};

export default useContractFunctionErrorToast;
