import React, { useContext } from "react";
import {
  Box,
  HStack,
  Heading,
  IconButton,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import AddMemberIcon from "components/icons/AddMemberIcon";
import { useEthers } from "@usedapp/core";
import AddMemberDialog from "components/chat/AddMemberDialog";
import ChatMemberAvatars from "components/chat/ChatMemberAvatars";

const ChatHeader: React.FC = () => {
  const {
    chat: { messagesCount, ownerAccount },
  } = useContext(ChatContext);
  const { account } = useEthers();
  const {
    isOpen: isAddMemberOpen,
    onOpen: onAddMemberOpen,
    onClose: onAddMemberClose,
  } = useDisclosure();

  return (
    <HStack
      px="3"
      py="2"
      borderBottom="1px"
      borderBottomColor="gray.500"
      borderStyle="solid"
      alignItems="center"
      minH="50px"
    >
      <Heading
        w="full"
        fontSize="lg"
        title={messagesCount.toString()}
        isTruncated
      >
        Messages ({messagesCount.toString()})
      </Heading>

      <Box flexShrink="0">
        <ChatMemberAvatars />
      </Box>

      <HStack w="full" justifyContent="flex-end">
        {ownerAccount === account && (
          <>
            <IconButton
              aria-label="Add member"
              variant="ghost"
              size="lg"
              mx="1"
              minW="6"
              h="6"
              icon={<Icon as={AddMemberIcon} />}
              onClick={() => onAddMemberOpen()}
            />

            <AddMemberDialog
              isOpen={isAddMemberOpen}
              onClose={onAddMemberClose}
            />
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default ChatHeader;
