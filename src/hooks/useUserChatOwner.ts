import { useContext } from "react";
import { useEthers } from "@usedapp/core";
import ChatContext from "contexts/ChatContext";

const useUserChatOwner = () => {
  const {
    chat: { ownerAccount },
  } = useContext(ChatContext);
  const { account } = useEthers();

  return !!account && ownerAccount === account;
};

export default useUserChatOwner;
