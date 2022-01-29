import { useContractCall, useContractCalls } from "@usedapp/core";
import { chatAbi, factoryAbi } from "app/abis";
import { utils } from "ethers";
import { constants } from "ethers";
import { useMemo } from "react";

const useChat = (id: string) => {
  const [address] =
    useContractCall({
      abi: factoryAbi,
      address: process.env.REACT_APP_FACTORY_ADDRESS,
      method: "chats",
      args: [utils.id(id)],
    }) ?? [];

  const [membersCount, messagesCount] = (
    (useContractCalls(
      address && address !== constants.AddressZero
        ? [
            {
              abi: chatAbi,
              address,
              method: "membersCount",
              args: [],
            },
            {
              abi: chatAbi,
              address,
              method: "msgIdCounter",
              args: [],
            },
          ]
        : []
    ) ?? []) as (undefined[] | any[])[]
  ).flat();

  const chat = useMemo(
    () =>
      address && membersCount !== undefined
        ? {
            id,
            address,
            membersCount,
            messagesCount,
          }
        : null,
    [id, address, membersCount]
  );
  const isLoaded = !!chat || address === constants.AddressZero;

  return { chat, isLoaded };
};

export default useChat;
