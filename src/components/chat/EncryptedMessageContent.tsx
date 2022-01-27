import React, { useCallback, useContext, useState } from "react";
import MessageContent from "components/chat/MessageContent";
import ChatContext from "contexts/ChatContext";
import { useContractCall, useEthers } from "@usedapp/core";
import { chatAbi } from "app/abis";
import { utils } from "ethers";
import { Button, useToast } from "@chakra-ui/react";

export interface EncryptedMessageContentProps {
  messageId: number;
}

const EncryptedMessageContent: React.FC<EncryptedMessageContentProps> = ({
  messageId,
}) => {
  const { account, connector } = useEthers();
  const { chat } = useContext(ChatContext)!;
  const toast = useToast();
  const [decrypting, setDecrypting] = useState(false);
  const [content, setContent] = useState<string>();

  const [data] =
    useContractCall(
      account &&
        chat?.address && {
          abi: chatAbi,
          address: chat.address,
          method: "messagesCipher",
          args: [
            utils.keccak256(
              utils.defaultAbiCoder.encode(
                ["uint256", "address"],
                [messageId, account]
              )
            ),
          ],
        }
    ) ?? [];
  // TODO: Decrypt
  // const content = data && utils.toUtf8String(data);

  const decrypt = useCallback(async () => {
    setDecrypting(true);
    try {
      const provider = await connector!.getProvider();
      const decrypted = await provider.request({
        method: "eth_decrypt",
        params: [
          JSON.stringify({
            version: "x25519-xsalsa20-poly1305",
            // nonce: naclUtil.encodeBase64(nonce),
            // ephemPublicKey: naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
            // ciphertext: naclUtil.encodeBase64(encryptedMessage),
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

  return content ? (
    <MessageContent content={content} />
  ) : (
    <>
      {data && (
        <>
          <Button isLoading={decrypting} onClick={() => decrypt()}>
            Decrypt
          </Button>
        </>
      )}
    </>
  );
};

export default EncryptedMessageContent;
