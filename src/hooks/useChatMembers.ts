import { useContractCall, useContractCalls } from "@usedapp/core";
import { factoryAbi, chatAbi, profileAbi } from "app/abis";
import { useMemo } from "react";
import { IMember } from "types/chat";
import { utils } from "ethers";

const useChatMembers = (address?: string) => {
  const [membersAddresses] =
    useContractCall(
      address && {
        abi: chatAbi,
        address,
        method: "membersValues",
        args: [],
      }
    ) ?? [];

  const membersContracts = (
    (useContractCalls(
      membersAddresses
        ? membersAddresses.map((address: string) => ({
            abi: factoryAbi,
            address: process.env.REACT_APP_FACTORY_ADDRESS,
            method: "profiles",
            args: [address],
          }))
        : []
    ) ?? []) as (undefined[] | any[])[]
  ).flat();

  const membersProfiles = (useContractCalls(
    membersContracts
      ? membersContracts.map((address: string) => ({
          abi: profileAbi,
          address,
          method: "profile",
          args: [],
        }))
      : []
  ) ?? []) as (undefined[] | any[])[];

  const profiles = useMemo<IMember[]>(
    () =>
      membersProfiles
        .map((values, i) =>
          values
            ? ({
                name: utils.parseBytes32String(values[0]),
                address: membersAddresses[i],
                encryptionPublicKey: values[1],
              } as IMember)
            : undefined
        )
        .filter((member) => !!member) as IMember[],
    [membersProfiles]
  );

  return profiles;
};

export default useChatMembers;
