import { useMemo } from "react";
import { useContractCall, useContractCalls } from "@usedapp/core";
import useFactoryAddress from "hooks/useFactoryAddress";
import { chatAbi, factoryAbi } from "app/abis";
import { utils } from "ethers";
import { constants } from "ethers";

const useChat = (id: string) => {
  const factoryAddress = useFactoryAddress();

  const [address] =
    useContractCall({
      abi: factoryAbi,
      address: factoryAddress,
      method: "chats",
      args: [utils.id(id)],
    }) ?? [];

  const [ownerAccount, membersCount, messagesCount] = (
    (useContractCalls(
      address && address !== constants.AddressZero
        ? ["owner", "membersCount", "messagesCount"].map((method) => ({
            abi: chatAbi,
            address,
            method,
            args: [],
          }))
        : []
    ) ?? []) as (undefined[] | any[])[]
  ).flat();

  const chat = useMemo(
    () =>
      address && membersCount !== undefined
        ? {
            id,
            address,
            ownerAccount,
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
