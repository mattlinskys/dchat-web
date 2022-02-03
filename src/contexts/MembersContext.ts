import { createContext } from "react";
import { IMember } from "types/chat";

export interface MembersContextValue {
  members: IMember[];
  isFetching: boolean;
}

const MembersContext = createContext<MembersContextValue>(
  // @ts-ignore
  undefined
);

export default MembersContext;
