import { useContext } from "react";
import ChatContext from "contexts/ChatContext";
import useContract from "hooks/useContract";
import { chatAbi } from "app/abis";

const useChatContract = () => {
  const {
    chat: { address },
  } = useContext(ChatContext);
  return useContract(chatAbi, address);
};

export default useChatContract;
