import React, { useEffect, useMemo } from "react";
import useChat from "hooks/useChat";
import { useNavigate, useParams } from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import { useToast } from "@chakra-ui/react";
import ChatContext from "contexts/ChatContext";

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [chat, isLoaded] = useChat(id!);

  useEffect(() => {
    if (!chat && isLoaded) {
      navigate(HOME_PATH);
      toast({
        title: "Chat not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isLoaded]);

  const contextValue = useMemo(
    () => ({
      chat,
      isLoaded,
    }),
    [chat, isLoaded]
  );

  return (
    <ChatContext.Provider value={contextValue}>chat {id}</ChatContext.Provider>
  );
};

export default ChatPage;
