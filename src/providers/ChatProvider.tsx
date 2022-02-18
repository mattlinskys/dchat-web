import React, { useMemo } from "react";
import useFactoryAddress from "hooks/useFactoryAddress";
import useConnectedContract from "hooks/useConnectedContract";
import useContractRead from "hooks/useContractRead";
import { constants, utils } from "ethers";
import { chatAbi, factoryAbi } from "app/abis";
import { IChat } from "types/chat";
import ChatContext from "contexts/ChatContext";
import useContractReads from "hooks/useContractReads";

export interface ChatProviderProps {
  id: string;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ id, children }) => {
  const factoryAddress = useFactoryAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);

  const [address] = useContractRead({
    method: "chats",
    contract: factoryContract,
    args: [utils.id(id)],
  });

  const multicallResults = useContractReads(
    address
      ? ["owner", "membersCount", "messagesCount"].map((method) => ({
          address,
          method,
          abi: chatAbi,
        }))
      : undefined,
    { watch: true }
  );

  const chat = useMemo(() => {
    const [ownerResult, membersCountResult, messagesCountResult] =
      multicallResults;
    if (ownerResult) {
      return {
        id,
        address,
        ownerAccount: ownerResult[0],
        membersCount: membersCountResult[0],
        messagesCount: messagesCountResult[0],
      } as IChat;
    } else {
      return undefined;
    }
  }, [id, address, JSON.stringify(multicallResults)]);
  const isLoaded = !!chat || address === constants.AddressZero;

  const value = useMemo(
    () => ({
      chat: chat!,
      isLoaded,
    }),
    [chat, isLoaded]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
