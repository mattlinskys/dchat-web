import React, { useCallback, useContext } from "react";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tag,
  Text,
} from "@chakra-ui/react";
import ChainsContext from "contexts/ChainsContext";
import { utils } from "ethers";
import { useEthers } from "@usedapp/core";
import useSnackbar from "hooks/useSnackbar";
import { FormattedMessage, useIntl } from "react-intl";

const UnsupportedChainDialogProvider: React.FC = () => {
  const { active, library } = useEthers();
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
            err.message || formatMessage({ id: "erros.default" })
          );
        }
      } else {
        snackbar(
          "error",
          err.message || formatMessage({ id: "erros.default" })
        );
      }
    }
  }, [library?.provider.request, snackbar, formatMessage]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {}}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isCentered
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="8"
            pb="6"
          >
            <svg
              width="70"
              height="80"
              viewBox="0 0 70 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="m39.036 2.307 26.865 15.35A8.136 8.136 0 0 1 70 24.722V55.28a8.136 8.136 0 0 1-4.1 7.063L39.037 77.693a8.136 8.136 0 0 1-8.072 0L4.099 62.343A8.136 8.136 0 0 1 0 55.278V24.72a8.136 8.136 0 0 1 4.1-7.063L30.963 2.307a8.136 8.136 0 0 1 8.072 0Z"
                  fill="#4E4E4E"
                />
                <path
                  d="M39.7 55.505V64H30.83v-8.495H39.7ZM34.5 16C43.06 16 50 23.05 50 31.748a15.82 15.82 0 0 1-5.154 11.726l-.2.18-.468.4-.818.695-.585.51c-.886.791-1.777 1.678-2.276 2.527-.628 1.069-.894 2.39-.798 3.962h-8.872c-.299-2.64.076-5.098 1.126-7.376 1.011-2.197 1.98-3.378 3.168-4.492l.405-.37.422-.373 1.151-.996.663-.578.57-.492.347-.304c1.445-1.285 2.141-2.224 2.141-5.02 0-3.547-2.83-6.423-6.322-6.423s-6.322 2.876-6.322 6.424c0 .644.093 1.266.267 1.853l-8.83 2.553A15.989 15.989 0 0 1 19 31.748C19 23.05 25.94 16 34.5 16Z"
                  fill="#FFB74E"
                />
              </g>
            </svg>

            <Heading mt="4" mb="1.5" fontSize="xl">
              <FormattedMessage id="unsupported-chain.title" />
            </Heading>

            <Text color="gray.300">
              <FormattedMessage
                id="unsupported-chain.description"
                values={{ network: <Tag>{targetChain.name}</Tag> }}
              />
            </Text>

            {library?.provider.request && (
              <Button onClick={handleSwitch} mt="4" isFullWidth>
                <FormattedMessage id="unsupported-chain.switch" />
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnsupportedChainDialogProvider;
