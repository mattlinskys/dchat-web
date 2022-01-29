import { useState, useEffect } from "react";
import { profileAbi } from "app/abis";
import { constants, utils } from "ethers";
import { IProfile } from "types/profile";
import useContract from "hooks/useContract";
import useFactoryContract from "hooks/useFactoryContract";

const useProfile = (account?: string) => {
  const factoryContract = useFactoryContract();
  const [address, setAddress] = useState<string>();
  const profileContract = useContract(
    profileAbi,
    address && address !== constants.AddressZero ? address : undefined
  );
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    if (factoryContract && account) {
      (async () => {
        setAddress((await factoryContract.functions.profiles(account))[0]);
      })();
    } else if (address) {
      setAddress(undefined);
    }
  }, [factoryContract, account]);

  useEffect(() => {
    if (profileContract) {
      (async () => {
        const [[name], [encryptionPublicKey]] = await Promise.all([
          profileContract.functions.name(),
          profileContract.functions.encryptionPublicKey(),
        ]);
        setProfile({
          name: utils.parseBytes32String(name),
          account: account!,
          address: address!,
          encryptionPublicKey: encryptionPublicKey!,
        });
      })();
    }
  }, [profileContract]);

  // const [profileAddress] =
  //   useContractCall(
  //     account && {
  //       abi: factoryAbi,
  //       address: process.env.REACT_APP_FACTORY_ADDRESS,
  //       method: "profiles",
  //       args: [account],
  //     }
  //   ) ?? [];

  // const [name, encryptionPublicKey] = (
  //   (useContractCalls(
  //     profileAddress && profileAddress !== constants.AddressZero
  //       ? [
  //           {
  //             abi: profileAbi,
  //             address: profileAddress,
  //             method: "name",
  //             args: [],
  //           },
  //           {
  //             abi: profileAbi,
  //             address: profileAddress,
  //             method: "encryptionPublicKey",
  //             args: [],
  //           },
  //         ]
  //       : []
  //   ) ?? []) as (undefined[] | string[])[]
  // ).flat();

  // const profile = useMemo(
  //   () =>
  //     address && name !== undefined
  //       ? {
  //           name: utils.parseBytes32String(name),
  //           address,
  //           encryptionPublicKey: encryptionPublicKey!,
  //         }
  //       : undefined,
  //   [address, name, encryptionPublicKey]
  // );
  const isLoaded = !!profile || address === constants.AddressZero;

  return { profile, setProfile, setAddress, isLoaded };
};

export default useProfile;
