import React, { useCallback, useContext } from "react";
import { Button, Tag } from "@chakra-ui/react";
import ChainsContext from "contexts/ChainsContext";
import { utils } from "ethers";
import { useEthers } from "@usedapp/core";
import useSnackbar from "hooks/useSnackbar";
import { FormattedMessage, useIntl } from "react-intl";
import InfoDialog from "components/shared/InfoDialog";

const UnsupportedChainDialogProvider: React.FC = () => {
  const { active, library, ...rest } = useEthers();
  const { activeChain, targetChain } = useContext(ChainsContext)!;
  const isOpen = active && !activeChain;
  const snackbar = useSnackbar();
  const { formatMessage } = useIntl();

  const handleSwitch = useCallback(async () => {
    try {
      await library!.provider.request!({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: utils.hexlify(targetChain.id) }],
      });
    } catch (err: any) {
      if (err.code === 4902) {
        try {
          await library!.provider.request!({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: utils.hexlify(targetChain.id),
                chainName: targetChain.name,
                nativeCurrency: targetChain.nativeCurrency,
                rpcUrls: targetChain.rpcUrls,
                blockExplorerUrls: targetChain.blockExplorerUrls,
              },
            ],
          });
        } catch (err: any) {
          snackbar(
            "error",
            err.message || formatMessage({ id: "errors.default" })
          );
        }
      } else {
        snackbar(
          "error",
          err.message || formatMessage({ id: "errors.default" })
        );
      }
    }
  }, [library?.provider.request, snackbar, formatMessage]);

  return (
    <InfoDialog
      isOpen={isOpen}
      title={<FormattedMessage id="unsupported-chain.title" />}
      details={
        <FormattedMessage
          id="unsupported-chain.description"
          values={{ network: <Tag>{targetChain.name}</Tag> }}
        />
      }
    >
      {library?.provider.request && (
        <Button onClick={handleSwitch} mt="4" isFullWidth>
          <FormattedMessage id="unsupported-chain.switch" />
        </Button>
      )}
    </InfoDialog>
  );
};

export default UnsupportedChainDialogProvider;
