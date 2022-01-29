import { createContext } from "react";
import { IMessage } from "types/message";

export interface MessagesContextValue {
  messages: IMessage[];
  // isLoaded: boolean;
}

const MessagesContext = createContext<MessagesContextValue>(
  // @ts-ignore
  undefined
);

export default MessagesContext;
