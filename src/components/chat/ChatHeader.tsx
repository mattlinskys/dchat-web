import React, { useContext } from "react";
import { HStack, useDisclosure, Tooltip } from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";
import AddMemberIcon from "components/icons/AddMemberIcon";
import AddMemberDialog from "components/chat/AddMember/AddMemberDialog";
import ChatMemberAvatars from "components/chat/ChatMemberAvatars";
import { FormattedMessage, useIntl } from "react-intl";
import ShareIcon from "components/icons/ShareIcon";
import useCopy from "hooks/useCopy";
import useUserChatOwner from "hooks/useUserChatOwner";
import ChatHeaderRemove from "components/chat/ChatHeaderRemove";
import IconButton from "components/shared/IconButton";
import useAccountAddress from "hooks/useAccountAddress";

const ChatHeader: React.FC = () => {
  const {
    chat: { id, ownerAccount },
  } = useContext(ChatContext);
  const account = useAccountAddress();
  const { formatMessage } = useIntl();
  const isUserChatOwner = useUserChatOwner();
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
      <HStack spacing="1.5">
        <ChatMemberAvatars onAddMemberOpen={() => onAddMemberOpen()} />

        {ownerAccount === account && (
          <>
            <Tooltip
              label={<FormattedMessage id="members.add.title" />}
              placement="top"
            >
              <IconButton
                aria-label={formatMessage({ id: "members.add.title" })}
                icon={AddMemberIcon}
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

      <HStack spacing="3">
        <Tooltip
          label={<FormattedMessage id="common.copy-link" />}
          placement="top"
        >
          <IconButton
            aria-label={formatMessage({ id: "common.copy-link" })}
            icon={ShareIcon}
            onClick={handleCopy}
          />
        </Tooltip>

        {isUserChatOwner && <ChatHeaderRemove />}
      </HStack>
    </HStack>
  );
};

export default ChatHeader;
