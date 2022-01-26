import { CHAT_PATH } from "constants/routes";

export const getChatPath = (id: string) => CHAT_PATH.replace(":id", id);
