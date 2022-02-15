import { useEffect } from "react";
import { useIntl } from "react-intl";
import useSnackbar from "hooks/useSnackbar";
import type useContractFunction from "hooks/useContractFunction";

const useContractFunctionErrorSnackbar = (
  state: ReturnType<typeof useContractFunction>["state"],
  getMsg?: (err: string) => string | undefined
) => {
  const snackbar = useSnackbar();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (state.status === "error") {
      snackbar(
        "error",
        state.message
          ? (getMsg && getMsg(state.message)) || state.message
          : formatMessage({ id: "errors.default" })
      );
    }
  }, [state]);
};

export default useContractFunctionErrorSnackbar;
