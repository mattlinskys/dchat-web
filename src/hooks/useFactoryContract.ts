import useContract from "hooks/useContract";
import useFactoryAddress from "hooks/useFactoryAddress";
import { factoryAbi } from "app/abis";

const useFactoryContract = () => useContract(factoryAbi, useFactoryAddress());

export default useFactoryContract;
