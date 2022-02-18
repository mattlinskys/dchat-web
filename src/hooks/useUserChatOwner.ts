import { useContext } from "react";
import ChatContext from "contexts/ChatContext";
import useAccountAddress from "hooks/useAccountAddress";

const useUserChatOwner = () => {
  const {
    chat: { ownerAccount },
  } = useContext(ChatContext);
  const account = useAccountAddress();

  return !!account && ownerAccount === account;
};

export default useUserChatOwner;
