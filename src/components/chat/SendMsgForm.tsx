import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContractFunction, useEthers } from "@usedapp/core";
import { encrypt } from "utils/cryptoUtils";
import { utils } from "ethers";
import MembersContext from "contexts/MembersContext";
import useChatContract from "hooks/useChatContract";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import EmojiIcon from "components/icons/EmojiIcon";
import EnterIcon from "components/icons/EnterIcon";
import EmojiPicker from "components/shared/EmojiPicker";

const SendMsgForm: React.FC = () => {
  const toast = useToast();
  const [value, setValue] = useState("");
  // const [isExpanded, setExpanded] = useState(false);
  const {
    isOpen: isEmojiOpen,
    onOpen: onOpenEmoji,
    onClose: onCloseEmoji,
  } = useDisclosure();
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
    <HStack w="full" spacing="2">
      <Popover
        isOpen={isEmojiOpen}
        onOpen={onOpenEmoji}
        onClose={onCloseEmoji}
        closeOnBlur
        closeOnEsc
        returnFocusOnClose
        placement="top"
        isLazy
      >
        <PopoverTrigger>
          <IconButton
            aria-label="Emoji"
            variant="ghost"
            minW="6"
            color="gray.300"
            h="6"
            icon={<Icon w="6" h="auto" as={EmojiIcon} />}
          />
        </PopoverTrigger>
        <PopoverContent w="auto">
          <EmojiPicker onEmojiSelect={({ emoji }) => setValue(value + emoji)} />
        </PopoverContent>
      </Popover>

      <InputGroup>
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
        <InputRightElement h="9">
          <IconButton
            aria-label="Emoji"
            variant="ghost"
            minW="6"
            color="gray.300"
            h="6"
            icon={<Icon w="4.5" h="auto" as={EnterIcon} />}
            onClick={() => handleSend()}
          />
        </InputRightElement>
      </InputGroup>
    </HStack>
  );
};

export default SendMsgForm;
