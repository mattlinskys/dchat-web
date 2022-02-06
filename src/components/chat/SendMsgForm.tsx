import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
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
import { FormattedMessage, useIntl } from "react-intl";
import ExpandUpIcon from "components/icons/ExpandUpIcon";
import PlainIconButton from "components/shared/PlainIconButton";
import MessagesContext from "contexts/MessagesContext";

const SendMsgForm: React.FC = () => {
  const toast = useToast();
  const { formatMessage } = useIntl();
  const [value, setValue] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const {
    isOpen: isEmojiOpen,
    onOpen: onOpenEmoji,
    onClose: onCloseEmoji,
  } = useDisclosure();
  const { addPendingMessage } = useContext(MessagesContext);
  const { members } = useContext(MembersContext);
  const { account } = useEthers();
  const isUserMember = useMemo(
    () => members.some((member) => member.account === account),
    [members, account]
  );
  const chatContract = useChatContract();
  const { send, state, events } = useContractFunction(
    chatContract,
    "sendCipherMsg"
  );
  useContractFunctionErrorToast(state);
  const isLoading =
    state.status === "PendingSignature" || state.status === "Mining";
  const isDisabled = !isUserMember || isLoading;

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

  useEffect(() => {
    const [event] = events ?? [];
    if (state.status === "Success" && event) {
      const { id, sender } = event.args;
      addPendingMessage(id, sender);
    }
  }, [events]);

  return (
    <VStack w="full" spacing="1">
      <Box lineHeight="0" mt="-1">
        <PlainIconButton onClick={() => setExpanded(!isExpanded)}>
          <Icon
            as={ExpandUpIcon}
            w="auto"
            h="auto"
            transform="auto-gpu"
            rotate={isExpanded ? "180deg" : undefined}
          />
        </PlainIconButton>
      </Box>

      {isExpanded && (
        <Textarea
          placeholder={formatMessage({ id: "common.typeMessage" })}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rounded="xl"
          isDisabled={isDisabled}
          resize="none"
        />
      )}

      <HStack w="full" justifyContent="space-between" spacing="2">
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
              isDisabled={isDisabled}
            />
          </PopoverTrigger>
          <PopoverContent w="auto">
            <EmojiPicker
              onEmojiSelect={({ emoji }) => setValue(value + emoji)}
            />
          </PopoverContent>
        </Popover>

        {isExpanded ? (
          <Button
            isLoading={isLoading}
            isDisabled={isDisabled}
            onClick={() => handleSend()}
            leftIcon={<Icon as={EnterIcon} />}
            size="sm"
            variant="ghost"
          >
            <FormattedMessage id="common.send" ignoreTag />
          </Button>
        ) : (
          <InputGroup>
            <Input
              placeholder={formatMessage({ id: "common.typeMessage" })}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              rounded="full"
              h="9"
              isDisabled={isDisabled}
            />
            <InputRightElement h="9">
              <IconButton
                aria-label="Send"
                variant="ghost"
                minW="6"
                color="gray.300"
                h="6"
                icon={<Icon w="4.5" h="auto" as={EnterIcon} />}
                isLoading={isLoading}
                isDisabled={isDisabled}
                onClick={() => handleSend()}
              />
            </InputRightElement>
          </InputGroup>
        )}
      </HStack>
    </VStack>
  );
};

export default SendMsgForm;
