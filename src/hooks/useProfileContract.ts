import { useMemo } from "react";
import { Contract } from "ethers";
import { profileAbi } from "app/abis";

const useProfileContract = (address: string) =>
  useMemo(() => new Contract(address, profileAbi), [address]);

export default useProfileContract;
