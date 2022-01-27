import { useMemo } from "react";
import { useContractCall, useContractCalls } from "@usedapp/core";
import { factoryAbi, profileAbi } from "app/abis";
import { getCustomKeyCallArgs } from "utils/contractsUtils";
import { bytes32ToString } from "utils/ethersUtils";
import { constants } from "ethers";
import { IProfile } from "types/profile";

const useProfile = (
  address?: string | null
): [IProfile | undefined, boolean] => {
  const [profileAddress] =
    useContractCall(
      address && {
        abi: factoryAbi,
        address: process.env.REACT_APP_FACTORY_ADDRESS,
        method: "profiles",
        args: [address],
      }
    ) ?? [];

  const [name, encryptionPublicKey, avatarUrl, description] = (
    (useContractCalls(
      profileAddress && profileAddress !== constants.AddressZero
        ? [
            {
              abi: profileAbi,
              address: profileAddress,
              method: "name",
              args: [],
            },
            {
              abi: profileAbi,
              address: profileAddress,
              method: "encryptionPublicKey",
              args: [],
            },
            getCustomKeyCallArgs(profileAddress, "avatarUrl"),
            getCustomKeyCallArgs(profileAddress, "description"),
          ]
        : []
    ) ?? []) as (undefined[] | string[])[]
  ).flat();

  const profile = useMemo(
    () =>
      address && name !== undefined
        ? {
            name: bytes32ToString(name),
            address,
            encryptionPublicKey: encryptionPublicKey!,
            avatarUrl: avatarUrl || undefined,
            description: description || undefined,
          }
        : undefined,
    [address, name, encryptionPublicKey, avatarUrl, description]
  );
  const isLoaded = !!profile || profileAddress === constants.AddressZero;

  return [profile, isLoaded];
};

export default useProfile;
