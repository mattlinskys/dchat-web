import { useCallback } from "react";
import useSnackbar from "hooks/useSnackbar";
import copy from "copy-to-clipboard";
import { useIntl } from "react-intl";

const useCopy = () => {
  const snackbar = useSnackbar();
  const { formatMessage } = useIntl();
  const handleCopy = useCallback(
    (content: string) => {
      copy(content);
      snackbar("success", formatMessage({ id: "common.copied" }));
    },
    [snackbar]
  );

  return handleCopy;
};

export default useCopy;
