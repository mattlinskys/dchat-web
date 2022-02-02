import { IMessage } from "types/message";

export const rawResultToMessage = (result: any) =>
  ({
    id: result.id,
    ...(result.replyTo.isZero() ? {} : { replyTo: result.replyTo }),
    sender: result.sender,
    sentAt: new Date(result.time.toNumber() * 1000),
  } as IMessage);
