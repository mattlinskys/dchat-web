import React, { useCallback } from "react";
import { Button, Tag } from "@chakra-ui/react";
import useSnackbar from "hooks/useSnackbar";
import { FormattedMessage, useIntl } from "react-intl";
import InfoDialog from "components/shared/InfoDialog";
import { useConnect, useNetwork, InjectedConnector } from "wagmi";
import { utils } from "ethers";

const UnsupportedChainDialogProvider: React.FC = () => {
  const [
    {
      data: { connector },
    },
  ] = useConnect();
  const [
    {
      data: { chain, chains },
    },
  ] = useNetwork();
  const isOpen = chain ? chain.unsupported! : false;
  const targetChain = chains[0];
  const snackbar = useSnackbar();
  const { formatMessage } = useIntl();

  const handleSwitch = useCallback(async () => {
    try {
      await connector?.switchChain?.(targetChain.id);
    } catch (err: any) {
      if (
        err.originalError?.code === 4902 &&
        connector instanceof InjectedConnector
      ) {
        const provider = await connector.getProvider()!;
        try {
          await provider.request!({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: utils.hexlify(targetChain.id),
                chainName: targetChain.name,
                nativeCurrency: targetChain.nativeCurrency,
                rpcUrls: targetChain.rpcUrls,
                blockExplorerUrls: targetChain.blockExplorers!.map(
                  (explorer) => explorer.url
                ),
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
  }, [connector, targetChain?.id, snackbar, formatMessage]);

  return (
    <InfoDialog
      isOpen={isOpen}
      title={<FormattedMessage id="unsupported-chain.title" />}
      details={
        <FormattedMessage
          id="unsupported-chain.description"
          values={{ network: <Tag>{targetChain?.name}</Tag> }}
        />
      }
    >
      {connector && (
        <Button onClick={handleSwitch} mt="4" isFullWidth>
          <FormattedMessage id="unsupported-chain.switch" />
        </Button>
      )}
    </InfoDialog>
  );
};

export default UnsupportedChainDialogProvider;
