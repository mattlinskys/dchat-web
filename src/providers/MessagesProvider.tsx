import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MessagesContext from "contexts/MessagesContext";
import ChatContext from "contexts/ChatContext";
import { IMessage } from "types/message";
import useConnectedContract from "hooks/useConnectedContract";
import { chatAbi } from "app/abis";

const MessagesProvider: React.FC = ({ children }) => {
  const {
    chat: { address, messagesCount },
  } = useContext(ChatContext);
  const chatContract = useConnectedContract(chatAbi, address);
  const [messages, setMessages] = useState<IMessage[]>();

  const fetchMessages = useCallback(async () => {
    const messages = await chatContract!.functions.paginateMessages(0, 10);
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    if (chatContract) {
      fetchMessages();
    }
  }, [chatContract]);

  const value = useMemo(
    () => ({
      messages,
    }),
    [messages]
  );

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
