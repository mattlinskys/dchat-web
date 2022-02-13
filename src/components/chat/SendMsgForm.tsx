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
  Center,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  useDisclosure,
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
import IconButton from "components/shared/IconButton";
import useSnackbar from "hooks/useSnackbar";

const SendMsgForm: React.FC = () => {
  const snackbar = useSnackbar();
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
      snackbar("error", err.message);
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
    <Box
      w="full"
      px="3"
      py="2"
      borderTop="1px"
      borderTopColor="gray.400"
      borderStyle="solid"
      position="relative"
    >
      {isExpanded ? (
        <Center lineHeight="0" mt="-1" mb="1">
          <PlainIconButton onClick={() => setExpanded(false)}>
            <Icon
              as={ExpandUpIcon}
              w="auto"
              h="auto"
              transform="auto-gpu"
              rotate="180deg"
            />
          </PlainIconButton>
        </Center>
      ) : (
        <Center
          lineHeight="0"
          position="absolute"
          insetX="0"
          bottom="100%"
          pt="1"
          pb="1.5"
          mb="-0.5"
          transition="100ms opacity"
          opacity="0"
          _hover={{
            opacity: 1,
          }}
        >
          <PlainIconButton onClick={() => setExpanded(true)}>
            <Icon as={ExpandUpIcon} w="auto" h="auto" />
          </PlainIconButton>
        </Center>
      )}

      {isExpanded && (
        <Textarea
          placeholder={formatMessage({ id: "common.type-message" })}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rounded="xl"
          isDisabled={isDisabled}
          resize="none"
          mb="1"
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
              aria-label={formatMessage({
                id: "common.emoji",
              })}
              size="lg"
              icon={EmojiIcon}
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
            color="brand.500"
          >
            <FormattedMessage id="common.send" />
          </Button>
        ) : (
          <InputGroup>
            <Input
              placeholder={formatMessage({ id: "common.type-message" })}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={(e) => {
                e.key === "Enter" && handleSend();
              }}
              rounded="full"
              h="9"
              isDisabled={isDisabled}
            />
            <InputRightElement h="9">
              <IconButton
                aria-label={formatMessage({
                  id: "common.send",
                })}
                icon={EnterIcon}
                isLoading={isLoading}
                isDisabled={isDisabled}
                onClick={() => handleSend()}
              />
            </InputRightElement>
          </InputGroup>
        )}
      </HStack>
    </Box>
  );
};

export default SendMsgForm;
