import React from "react";
import { Text } from "@chakra-ui/react";

export interface MessageContentProps {
  content: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  return <Text>{content}</Text>;
};

export default MessageContent;
