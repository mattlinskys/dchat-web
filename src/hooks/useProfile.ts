import { useMemo } from "react";
import useFactoryAddress from "hooks/useFactoryAddress";
import { factoryAbi, profileAbi } from "app/abis";
import { constants, utils } from "ethers";
import { IProfile } from "types/profile";
import useContractRead from "hooks/useContractRead";
import useConnectedContract from "hooks/useConnectedContract";
import useContractReads from "hooks/useContractReads";

const useProfile = (account?: string, watch?: boolean) => {
  const factoryAddress = useFactoryAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);
  const [address] = useContractRead({
    contract: factoryContract,
    method: "profiles",
    args: [account],
    watch,
  });

  const [name, encryptionPublicKey] = useContractReads(
    address && address !== constants.AddressZero
      ? ["name", "encryptionPublicKey"].map((method) => ({
          abi: profileAbi,
          address,
          method,
        }))
      : undefined,
    { watch }
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
