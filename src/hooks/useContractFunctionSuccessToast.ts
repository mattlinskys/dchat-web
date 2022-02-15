import { useEffect } from "react";
import useSnackbar from "hooks/useSnackbar";
import type useContractFunction from "hooks/useContractFunction";

const useContractFunctionSuccessToast = (
  state: ReturnType<typeof useContractFunction>["state"],
  message: string
) => {
  const snackbar = useSnackbar();

  useEffect(() => {
    if (state.status === "success") {
      snackbar("success", message);
    }
  }, [state]);
};

export default useContractFunctionSuccessToast;
