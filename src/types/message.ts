export interface IMessage {
  id: number;
  time: number;
  replyTo: number;
  sender: string;
  data: string;
  encrypted: boolean;
}
