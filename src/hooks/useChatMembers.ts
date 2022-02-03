import { useContractCall, useContractCalls } from "@usedapp/core";
import { factoryAbi, chatAbi, profileAbi } from "app/abis";
import { useMemo } from "react";
import { IMember } from "types/chat";
import { utils } from "ethers";

const useChatMembers = (address?: string) => {
  const [membersAccounts] =
    useContractCall(
      address && {
        abi: chatAbi,
        address,
        method: "membersAccounts",
        args: [],
      }
    ) ?? [];

  const membersAddresses = (
    (useContractCalls(
      membersAccounts
        ? membersAccounts.map((address: string) => ({
            abi: factoryAbi,
            address: process.env.REACT_APP_FACTORY_ADDRESS,
            method: "profiles",
            args: [address],
          }))
        : []
    ) ?? []) as (undefined[] | any[])[]
  ).flat();

  const membersProfiles = (useContractCalls(
    membersAddresses
      ? membersAddresses
          .map((address: string) =>
            ["name", "encryptionPublicKey"].map((method) => ({
              abi: profileAbi,
              address,
              method,
              args: [],
            }))
          )
          .flat()
      : []
  ) ?? []) as (undefined | any)[];

  const profiles = useMemo<IMember[]>(() => {
    const members: IMember[] = [];
    for (let i = 0; i < membersProfiles.length / 2; i++) {
      const [name] = membersProfiles[i * 2] ?? [];
      const [encryptionPublicKey] = membersProfiles[i * 2 + 1] ?? [];

      members.push({
        account: membersAccounts[i],
        profile:
          name !== undefined
            ? {
                name: utils.parseBytes32String(name),
                account: membersAccounts[i],
                address: membersAddresses[i],
                encryptionPublicKey: encryptionPublicKey!,
              }
            : undefined,
      });
    }
    return members;
  }, [membersProfiles]);

  return profiles;
};

export default useChatMembers;
