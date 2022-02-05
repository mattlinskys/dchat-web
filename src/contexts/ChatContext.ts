import { createContext } from "react";
import { IChat } from "types/chat";

export interface ChatContextValue {
  chat: IChat;
  isLoaded: boolean;
}

const ChatContext = createContext<ChatContextValue>(
  // @ts-ignore
  undefined
);

export default ChatContext;
