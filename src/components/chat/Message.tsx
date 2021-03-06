import React, { memo } from "react";
import VCard from "components/shared/VCard";
import useProfile from "hooks/useProfile";
import { IMessage } from "types/message";
import EncryptedMessageContent from "components/chat/EncryptedMessageContent";
import { Box, Text } from "@chakra-ui/react";
import useAccountAddress from "hooks/useAccountAddress";

export interface MessageProps {
  message: IMessage;
  isPending?: boolean;
}

const Message: React.FC<MessageProps> = ({
  message: { id, sender: senderAccount, sentAt },
  isPending,
}) => {
  const account = useAccountAddress();
  const { profile: sender, isLoaded } = useProfile(senderAccount);

  return (
    <Box w="full" px="3" py="1">
      <VCard
        user={sender}
        account={senderAccount}
        isLoaded={isLoaded}
        isMe={senderAccount === account}
        avatarSize="9"
        details={
          <Text
            as="time"
            title={sentAt.toISOString()}
            ml="1"
            fontSize="xs"
            color="gray.300"
          >
            {sentAt.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        }
      />
      <Box pl="10" mt="2">
        <EncryptedMessageContent messageId={id} isPending={isPending} />
      </Box>
    </Box>
  );
};

export default memo(Message);
