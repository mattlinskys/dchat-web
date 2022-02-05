import React, { useCallback, useContext, useMemo, useState } from "react";
import { HStack, Input, useToast } from "@chakra-ui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { encrypt } from "utils/cryptoUtils";
import { utils } from "ethers";
import MembersContext from "contexts/MembersContext";
import useChatContract from "hooks/useChatContract";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";

const SendMsgForm: React.FC = () => {
  const toast = useToast();
  const [value, setValue] = useState("");
  const { members } = useContext(MembersContext);
  const { account } = useEthers();
  const isUserMember = useMemo(
    () => members.some((member) => member.account === account),
    [members, account]
  );
  const chatContract = useChatContract();
  const { state, send } = useContractFunction(chatContract, "sendCipherMsg");
  useContractFunctionErrorToast(state);

  const handleSend = useCallback(async () => {
    const formattedValue = value.trim();
    if (!members || formattedValue.length === 0) {
      return;
    }

    try {
      const accounts = [];
      const ciphertexts = [];

      for (const member of members) {
        if (member.profile) {
          const { nonce, ephemPublicKey, ciphertext } = encrypt(
            utils.arrayify(member.profile.encryptionPublicKey),
            formattedValue
          );
          accounts.push(member.account);
          ciphertexts.push(utils.concat([nonce, ephemPublicKey, ciphertext]));
        }
      }

      await send(accounts, ciphertexts, 0);
      setValue("");
    } catch (err: any) {
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [value, members, send]);

  return (
    <HStack w="full" spacing="4">
      <Input
        placeholder="Type message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        rounded="full"
        h="9"
        isDisabled={
          !isUserMember ||
          state.status === "PendingSignature" ||
          state.status === "Mining"
        }
      />
    </HStack>
  );
};

export default SendMsgForm;
