import React, { useContext } from "react";
import {
  HStack,
  IconButton,
  Icon,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import AddMemberIcon from "components/icons/AddMemberIcon";
import { useEthers } from "@usedapp/core";
import AddMemberDialog from "components/chat/AddMember/AddMemberDialog";
import ChatMemberAvatars from "components/chat/ChatMemberAvatars";
import { FormattedMessage } from "react-intl";
import { ShareIcon } from "components/icons/ShareIcon";
import useCopy from "hooks/useCopy";

const ChatHeader: React.FC = () => {
  const {
    chat: { id, ownerAccount },
  } = useContext(ChatContext);
  const { account } = useEthers();
  const copy = useCopy();
  const {
    isOpen: isAddMemberOpen,
    onOpen: onAddMemberOpen,
    onClose: onAddMemberClose,
  } = useDisclosure();

  const handleCopy = () => {
    copy(`${process.env.REACT_APP_ORIGIN}/chat/${encodeURIComponent(id)}`);
  };

  return (
    <HStack
      px="3"
      py="2"
      borderBottom="1px"
      borderBottomColor="gray.400"
      borderStyle="solid"
      alignItems="center"
      justifyContent="space-between"
      minH="50px"
    >
      <HStack spacing="1">
        <ChatMemberAvatars onAddMemberOpen={() => onAddMemberOpen()} />

        {ownerAccount === account && (
          <>
            <Tooltip
              label={<FormattedMessage id="members.add.title" />}
              placement="top"
            >
              <IconButton
                aria-label="Add member"
                variant="ghost"
                size="lg"
                minW="6"
                h="6"
                icon={<Icon as={AddMemberIcon} />}
                onClick={() => onAddMemberOpen()}
              />
            </Tooltip>

            <AddMemberDialog
              isOpen={isAddMemberOpen}
              onClose={onAddMemberClose}
            />
          </>
        )}
      </HStack>

      <Tooltip
        label={<FormattedMessage id="common.copy-link" />}
        placement="top"
      >
        <IconButton
          aria-label="Copy link"
          variant="ghost"
          size="lg"
          opacity="0.8"
          minW="6"
          h="6"
          icon={<Icon as={ShareIcon} />}
          onClick={handleCopy}
        />
      </Tooltip>
    </HStack>
  );
};

export default ChatHeader;
