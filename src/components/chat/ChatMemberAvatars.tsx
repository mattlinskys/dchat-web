import React, { useContext } from "react";
import { Stack, Center, Text, useDisclosure, Tooltip } from "@chakra-ui/react";
import Avatar from "components/shared/Avatar";
import { FormattedMessage } from "react-intl";
import MembersListDialog from "components/chat/MembersList/MembersListDialog";
import MembersContext from "contexts/MembersContext";

interface ChatMemberAvatarsProps {
  maxItems?: number;
  onAddMemberOpen: () => void;
}

const ChatMemberAvatars: React.FC<ChatMemberAvatarsProps> = ({
  maxItems = 3,
  onAddMemberOpen,
}) => {
  const { members } = useContext(MembersContext);
  const {
    isOpen: isMembersListOpen,
    onOpen: onMembersListOpen,
    onClose: onMembersListClose,
  } = useDisclosure();

  return (
    <>
      <Tooltip label={<FormattedMessage id="common.members" />} placement="top">
        <Stack
          direction="row-reverse"
          spacing="-2"
          role="button"
          onClick={() => onMembersListOpen()}
        >
          {members.length > maxItems && (
            <Center
              w="8"
              h="8"
              bg="gray.500"
              border="2px"
              borderStyle="solid"
              borderColor="gray.700"
              rounded="full"
            >
              <Text fontSize="xs" fontWeight="black">
                +{members.length - 2}
              </Text>
            </Center>
          )}
          {members
            .slice(0, members.length === maxItems ? maxItems : maxItems - 1)
            .reverse()
            .map((member) => (
              <Avatar
                key={member.account}
                address={member.account}
                size="8"
                border="2px"
                borderStyle="solid"
                borderColor="gray.700"
              />
            ))}
        </Stack>
      </Tooltip>

      <MembersListDialog
        isOpen={isMembersListOpen}
        onClose={onMembersListClose}
        onAddMemberOpen={onAddMemberOpen}
      />
    </>
  );
};

export default ChatMemberAvatars;
