import { useMemo } from "react";
import { chatAbi, factoryAbi } from "app/abis";
import { utils } from "ethers";
import { constants } from "ethers";
import useFactoryAddress from "hooks/useFactoryAddress";
import useConnectedContract from "hooks/useConnectedContract";
import useContractRead from "hooks/useContractRead";
import useContractReads from "hooks/useContractReads";

const useChat = (id: string) => {
  const factoryAddress = useFactoryAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);

  const [address] = useContractRead({
    contract: factoryContract,
    method: "chats",
    args: [utils.id(id)],
  });

  const [ownerAccount, membersCount, messagesCount] = useContractReads(
    address && address !== constants.AddressZero
      ? ["owner", "membersCount", "messagesCount"].map((method) => ({
          abi: chatAbi,
          address,
          method,
          args: [],
        }))
      : []
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
