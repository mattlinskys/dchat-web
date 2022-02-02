import React, { useCallback, useContext, useEffect, useState } from "react";
import ChatContext from "contexts/ChatContext";
import { chatAbi } from "app/abis";
import { utils, BigNumber } from "ethers";
import { Box, Button, HStack, Spinner, Text, useToast } from "@chakra-ui/react";
import naclUtil from "tweetnacl-util";
import { EPHEM_PUBLIC_KEY_LENGTH, NONCE_LENGTH } from "constants/crypto";
import { useContractCall, useEthers } from "@usedapp/core";
import InteractiveContent from "components/chat/InteractiveContent";
import ClosedLockIcon from "components/icons/ClosedLockIcon";
import { FormattedMessage } from "react-intl";
import ShowMoreText from "components/shared/ShowMoreText";

export interface EncryptedMessageContentProps {
  messageId: BigNumber;
}

const EncryptedMessageContent: React.FC<EncryptedMessageContentProps> = ({
  messageId,
}) => {
  const { account, connector } = useEthers();
  const { chat } = useContext(ChatContext);
  const toast = useToast();
  const [decrypting, setDecrypting] = useState(false);
  const [content, setContent] = useState<string>();
  const [data] =
    useContractCall(
      account && {
        abi: chatAbi,
        address: chat.address,
        method: "messagesCiphertext",
        args: [
          utils.keccak256(
            utils.defaultAbiCoder.encode(["uint256"], [messageId]) +
              account.replace(/^0x/, "")
          ),
        ],
      }
    ) ?? [];

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

      const provider = await connector!.getProvider();
      const decrypted = await provider.request({
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
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setDecrypting(false);
    }
  }, [connector, data]);

  return (
    <Box
      px="3"
      py="2"
      bg="gray.400"
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
      ) : data ? (
        data === "0x" ? (
          <Text as="i">Missing encrypted data</Text>
        ) : (
          <>
            <HStack align="center" spacing="1">
              <ClosedLockIcon />
              <Text>Message encrypted</Text>
            </HStack>

            <Button isLoading={decrypting} onClick={() => decrypt()} size="sm">
              <FormattedMessage id="common.decrypt" ignoreTag />
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
