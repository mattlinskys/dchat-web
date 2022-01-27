import React, { useCallback, useContext, useState } from "react";
import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useContractFunction } from "@usedapp/core";
import { encrypt } from "utils/cryptoUtils";
import { utils } from "ethers";
import useChatContract from "hooks/useChatContract";
import ChatContext from "contexts/ChatContext";

const SendMsgForm: React.FC = () => {
  const toast = useToast();
  const [value, setValue] = useState("");
  const { chat, members } = useContext(ChatContext)!;
  const chatContract = useChatContract(chat!.address);
  const { state, send } = useContractFunction(chatContract, "sendCipherMsg");

  const handleSend = useCallback(async () => {
    const formattedValue = value.trim();
    if (!members || formattedValue.length === 0) {
      return;
    }

    try {
      const ciphertexts = [];
      for (const member of members) {
        const { nonce, ephemPublicKey, ciphertext } = encrypt(
          member.encryptionPublicKey,
          formattedValue
        );
        ciphertexts.push(
          utils.toUtf8Bytes(nonce + ephemPublicKey + ciphertext)
        );
      }
      await send(ciphertexts);
      // TODO: Send
    } catch (err: any) {
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [value, members]);

  return (
    <HStack spacing="4">
      <Input
        placeholder="Type message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <Button
        isDisabled={!members}
        isLoading={
          state.status === "Mining" || state.status === "PendingSignature"
        }
        onClick={() => handleSend()}
      >
        Send
      </Button>
    </HStack>
  );
};

export default SendMsgForm;
