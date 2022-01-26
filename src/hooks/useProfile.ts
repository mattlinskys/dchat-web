import { useMemo } from "react";
import { useContractCall, useContractCalls } from "@usedapp/core";
import { factoryAbi, profileAbi } from "app/abis";
import { getCustomKeyCallArgs } from "utils/contractsUtils";
import { bytes32ToString } from "utils/ethersUtils";
import { constants } from "ethers";
import { IProfile } from "types/profile";

const useProfile = (address: string): [IProfile | undefined, boolean] => {
  const [profileAddress] =
    useContractCall(
      address && {
        abi: factoryAbi,
        address: process.env.REACT_APP_FACTORY_ADDRESS,
        method: "profiles",
        args: [address],
      }
    ) ?? [];

  const [name, avatarUri, description] = (
    (useContractCalls(
      profileAddress && profileAddress !== constants.AddressZero
        ? [
            {
              abi: profileAbi,
              address: profileAddress,
              method: "name",
              args: [],
            },
            getCustomKeyCallArgs(profileAddress, "avatarUri"),
            getCustomKeyCallArgs(profileAddress, "description"),
          ]
        : []
    ) ?? []) as (undefined[] | string[])[]
  ).flat();

  const profile = useMemo(
    () =>
      name !== undefined
        ? { name: bytes32ToString(name), avatarUri, description }
        : undefined,
    [name, avatarUri, description]
  );
  const isLoaded = !!profile || profileAddress === constants.AddressZero;

  return [profile, isLoaded];
};

export default useProfile;
