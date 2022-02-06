import React from "react";
import ChatIndent from "components/chat/ChatIndent";
import Avatar from "components/shared/Avatar";
import { Text } from "@chakra-ui/react";
import { shortenAddress } from "utils/addressUtils";

export interface ChatMemberNotificationProps {
  account: string;
  suffix?: React.ReactNode;
}

const ChatMemberNotification: React.FC<ChatMemberNotificationProps> = ({
  account,
  suffix,
}) => (
  <ChatIndent>
    <Avatar
      address={account}
      size="6"
      display="inline-block"
      verticalAlign="bottom"
      mr="2"
    />
    <Text as="span">
      {shortenAddress(account)} {suffix}
    </Text>
  </ChatIndent>
);

export default ChatMemberNotification;
