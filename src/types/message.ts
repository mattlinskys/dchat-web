import type { BigNumber } from "ethers";

export interface IMessage {
  id: BigNumber;
  replyTo?: BigNumber;
  sender: string;
  data?: string;
  sentAt: Date;
}
