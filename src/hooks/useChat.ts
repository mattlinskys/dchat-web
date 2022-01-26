import { useContractCall, useContractCalls } from "@usedapp/core";
import { chatAbi, factoryAbi } from "app/abis";
import { stringToBytes32 } from "utils/ethersUtils";
import { constants } from "ethers";
import { IChat } from "types/chat";
import { useMemo } from "react";

const useChat = (id: string): [IChat | null, boolean] => {
  const [address] =
    useContractCall({
      abi: factoryAbi,
      address: process.env.REACT_APP_FACTORY_ADDRESS,
      method: "chats",
      args: [stringToBytes32(id)],
    }) ?? [];

  const [membersCount] = (
    (useContractCalls(
      address
        ? [
            {
              abi: chatAbi,
              address,
              method: "membersCount",
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
          }
        : null,
    [id, address, membersCount]
  );
  const isLoaded = !!chat || address === constants.AddressZero;

  return [chat, isLoaded];
};

export default useChat;
