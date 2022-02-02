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

export interface IChatMessageEntry {
  type: "msg";
  entity: IMessage;
}

export interface IChatMemberAddedEntry {
  type: "member-added";
  entity: {
    member: IMember;
    addedAt: Date;
  };
}

export interface IChatMemberRemovedEntry {
  type: "member-removed";
  entity: {
    member: IMember;
    removedAt: Date;
  };
}

export type TChatEntry =
  | IChatMessageEntry
  | IChatMemberAddedEntry
  | IChatMemberRemovedEntry;
