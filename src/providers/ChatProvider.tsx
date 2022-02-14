import React, { useEffect, useMemo, useState } from "react";
import useFactoryAddress from "hooks/useFactoryAddress";
import useConnectedContract from "hooks/useConnectedContract";
import useContractAutoCall from "hooks/useContractAutoCall";
import { constants, utils } from "ethers";
import { chatAbi, factoryAbi } from "app/abis";
import useMulticall from "hooks/useMulticall";
import { IChat } from "types/chat";
import ChatContext from "contexts/ChatContext";

export interface ChatProviderProps {
  id: string;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ id, children }) => {
  const factoryAddress = useFactoryAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);
  const multicall = useMulticall();
  const [chat, setChat] = useState<IChat>();

  const [address] = useContractAutoCall({
    method: "chats",
    contract: factoryContract,
    args: [utils.id(id)],
  });

  const isLoaded = !!chat || address === constants.AddressZero;

  useEffect(() => {
    if (!address) {
      return;
    }

    (async () => {
      const result = await multicall(
        ["owner", "membersCount", "messagesCount"].map((method) => ({
          address,
          method,
          data: chatAbi.encodeFunctionData(method),
        }))
      );

      // @ts-ignore
      const resultChat: IChat = {
        id,
        address,
      };

      for (const prop of ["owner", "membersCount", "messagesCount"]) {
        // @ts-ignore
        [resultChat[prop]] = chatAbi.decodeFunctionResult(
          prop,
          result[address]![chatAbi.encodeFunctionData(prop)]!
        );
      }

      setChat(resultChat);
    })();
  }, [address]);

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
