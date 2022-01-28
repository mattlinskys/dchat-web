import { useMemo } from "react";
import { Contract } from "ethers";
import { factoryAbi } from "app/abis";

const useFactoryContract = () =>
  useMemo(
    () => new Contract(process.env.REACT_APP_FACTORY_ADDRESS, factoryAbi),
    []
  );

export default useFactoryContract;
