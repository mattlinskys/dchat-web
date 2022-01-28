import React from "react";
import { Text } from "@chakra-ui/react";
import InteractiveContent from "components/chat/InteractiveContent";

export interface MessageContentProps {
  content: string;
}

const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  return (
    <Text whiteSpace="pre-wrap" className="hyphens-auto">
      <InteractiveContent content={content} />
    </Text>
  );
};

export default MessageContent;
