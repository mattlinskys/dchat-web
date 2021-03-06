import React, { useCallback, useContext, useEffect, useState } from "react";
import ChatContext from "contexts/ChatContext";
import { chatAbi } from "app/abis";
import { utils, BigNumber } from "ethers";
import { Box, Button, HStack, Spinner, Text } from "@chakra-ui/react";
import naclUtil from "tweetnacl-util";
import { EPHEM_PUBLIC_KEY_LENGTH, NONCE_LENGTH } from "constants/crypto";
import InteractiveContent from "components/chat/InteractiveContent";
import ClosedLockIcon from "components/icons/ClosedLockIcon";
import { FormattedMessage } from "react-intl";
import ShowMoreText from "components/shared/ShowMoreText";
import useConnectedContract from "hooks/useConnectedContract";
import useSnackbar from "hooks/useSnackbar";
import useAccountAddress from "hooks/useAccountAddress";
import { useProvider } from "wagmi";
import { Web3Provider } from "@ethersproject/providers";

export interface EncryptedMessageContentProps {
  messageId: BigNumber;
  isPending?: boolean;
}

const EncryptedMessageContent: React.FC<EncryptedMessageContentProps> = ({
  messageId,
  isPending,
}) => {
  const snackbar = useSnackbar();
  const account = useAccountAddress();
  const provider = useProvider() as Web3Provider;
  const { chat } = useContext(ChatContext);
  const chatContract = useConnectedContract(chatAbi, chat.address);
  const [data, setData] = useState<string>();
  const [decrypting, setDecrypting] = useState(false);
  const [content, setContent] = useState<string>();

  useEffect(() => {
    if (!chatContract || !account) {
      return;
    }

    const fetchData = async () => {
      const [data] = await chatContract.functions.messagesCiphertext(
        utils.keccak256(
          utils.defaultAbiCoder.encode(["uint256"], [messageId]) +
            account.replace(/^0x/, "")
        )
      );
      setData(data);
    };

    fetchData();
  }, [messageId, chatContract, account]);

  useEffect(() => {
    if (content) {
      setContent(undefined);
    }
  }, [account]);

  const decrypt = useCallback(async () => {
    setDecrypting(true);
    try {
      const bytes = utils.arrayify(data!);
      const nonce = bytes.slice(0, NONCE_LENGTH);
      const ephemPublicKey = bytes.slice(
        NONCE_LENGTH,
        NONCE_LENGTH + EPHEM_PUBLIC_KEY_LENGTH
      );
      const encryptedMessage = bytes.slice(
        NONCE_LENGTH + EPHEM_PUBLIC_KEY_LENGTH
      );

      const decrypted = await provider.provider?.request?.({
        method: "eth_decrypt",
        params: [
          JSON.stringify({
            version: "x25519-xsalsa20-poly1305",
            nonce: naclUtil.encodeBase64(nonce),
            ephemPublicKey: naclUtil.encodeBase64(ephemPublicKey),
            ciphertext: naclUtil.encodeBase64(encryptedMessage),
          }),
          account,
        ],
      });
      setContent(decrypted);
    } catch (err: any) {
      // err.code === 4001
      snackbar("error", err.message);
    } finally {
      setDecrypting(false);
    }
  }, [provider, data]);

  return (
    <Box
      px="3"
      py="2"
      bg="gray.500"
      rounded="md"
      {...(content || data === "0x"
        ? { display: "inline-block" }
        : {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          })}
    >
      {content ? (
        <ShowMoreText
          noOfLines={3}
          whiteSpace="pre-wrap"
          wordBreak="break-word"
        >
          <InteractiveContent content={content} />
        </ShowMoreText>
      ) : data && !isPending ? (
        data === "0x" ? (
          <Text as="i">
            <FormattedMessage id="message.missing-data" />
          </Text>
        ) : (
          <>
            <HStack align="center" spacing="1">
              <ClosedLockIcon />
              <Text>
                <FormattedMessage id="message.encrypted" />
              </Text>
            </HStack>

            <Button isLoading={decrypting} onClick={() => decrypt()} size="xs">
              <FormattedMessage id="common.decrypt" />
            </Button>
          </>
        )
      ) : (
        <Spinner opacity="0.8" />
      )}
    </Box>
  );
};

export default EncryptedMessageContent;
