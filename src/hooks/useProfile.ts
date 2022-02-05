import { useMemo } from "react";
import useFactoryAddress from "hooks/useFactoryAddress";
import { factoryAbi, profileAbi } from "app/abis";
import { constants, utils } from "ethers";
import { useContractCall, useContractCalls } from "@usedapp/core";
import { IProfile } from "types/profile";

const useProfile = (account?: string) => {
  const factoryAddress = useFactoryAddress();
  const [address] =
    useContractCall(
      account && {
        abi: factoryAbi,
        address: factoryAddress,
        method: "profiles",
        args: [account],
      }
    ) ?? [];

  const [name, encryptionPublicKey] = (
    (useContractCalls(
      address && address !== constants.AddressZero
        ? [
            {
              abi: profileAbi,
              address: address,
              method: "name",
              args: [],
            },
            {
              abi: profileAbi,
              address: address,
              method: "encryptionPublicKey",
              args: [],
            },
          ]
        : []
    ) ?? []) as (undefined[] | string[])[]
  ).flat();

  const profile = useMemo<IProfile | undefined>(
    () =>
      account && address && name !== undefined
        ? {
            name: utils.parseBytes32String(name),
            account,
            address,
            encryptionPublicKey: encryptionPublicKey!,
          }
        : undefined,
    [account, address, name, encryptionPublicKey]
  );
  const isLoaded = !!profile || address === constants.AddressZero;

  return { profile, isLoaded };
};

export default useProfile;
