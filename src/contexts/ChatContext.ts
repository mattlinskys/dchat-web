import { createContext } from "react";
import { IChat } from "types/chat";
import { IProfile } from "types/profile";

export interface ChatContextValue {
  chat?: IChat;
  members?: IProfile[];
  isLoaded: boolean;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export default ChatContext;
