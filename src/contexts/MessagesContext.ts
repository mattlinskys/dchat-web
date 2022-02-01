import { createContext } from "react";
import { IMessage } from "types/message";

export interface MessagesContextValue {
  messages?: IMessage[];
}

const MessagesContext = createContext<MessagesContextValue>(
  // @ts-ignore
  undefined
);

export default MessagesContext;
