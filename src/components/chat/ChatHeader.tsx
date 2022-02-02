import React, { useContext } from "react";
import { Box, HStack, Heading, IconButton, Icon } from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import AddMemberIcon from "components/icons/AddMemberIcon";

const ChatHeader: React.FC = () => {
  const {
    chat: { messagesCount },
  } = useContext(ChatContext);

  return (
    <HStack
      p="3"
      borderBottom="1px"
      borderBottomColor="gray.500"
      borderStyle="solid"
      alignItems="center"
    >
      <Heading
        w="full"
        fontSize="lg"
        title={messagesCount.toString()}
        isTruncated
      >
        Messages ({messagesCount.toString()})
      </Heading>
      <Box flexShrink="0"></Box>
      <HStack w="full" justifyContent="flex-end">
        <IconButton
          aria-label="Add member"
          variant="ghost"
          size="lg"
          mx="1"
          minW="6"
          h="6"
          icon={<Icon as={AddMemberIcon} />}
        />
      </HStack>
    </HStack>
  );
};

export default ChatHeader;
