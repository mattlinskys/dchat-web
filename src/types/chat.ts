import type { BigNumber } from "ethers";
import type { IMessage } from "types/message";
import { IProfile } from "types/profile";

export interface IChat {
  id: string;
  address: string;
  ownerAccount: string;
  membersCount: BigNumber;
  messagesCount: BigNumber;
}

export interface IMember {
  account: string;
  profile?: IProfile;
}

export interface IChatEntry {
  id: string;
  createdAt: Date;
}

export interface IChatEntryMessage extends IChatEntry {
  type: "message";
  item: IMessage;
}

export interface IChatEntryPendingMessage extends IChatEntry {
  type: "pending-message";
  item: IMessage;
}

export interface IChatEntryMemberAdded extends IChatEntry {
  type: "member-added";
  item: IMember;
}

export interface IChatEntryMemberRemoved extends IChatEntry {
  type: "member-removed";
  item: IMember;
}

export type TChatEntry =
  | IChatEntryMessage
  | IChatEntryPendingMessage
  | IChatEntryMemberAdded
  | IChatEntryMemberRemoved;
