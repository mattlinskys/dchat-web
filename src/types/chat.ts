import type { BigNumber } from "ethers";

export interface IChat {
  id: string;
  address: string;
  membersCount: BigNumber;
  messagesCount: BigNumber;
}

export interface IMember {
  name: string;
  address: string;
  encryptionPublicKey: string;
  avatarUrl?: string;
}
