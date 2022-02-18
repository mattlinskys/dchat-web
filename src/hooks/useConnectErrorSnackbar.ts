import useSnackbar from "hooks/useSnackbar";
import { useEffect } from "react";
import { useIntl } from "react-intl";

const useConnectErrorSnackbar = (error?: Error) => {
  const snackbar = useSnackbar();
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (error?.name === "ConnectorNotFoundError") {
      snackbar("error", formatMessage({ id: "errors.no-metamask-provider" }));
    }
  }, [error]);
};

export default useConnectErrorSnackbar;
