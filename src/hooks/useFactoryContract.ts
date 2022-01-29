import { factoryAbi } from "app/abis";
import useContract from "hooks/useContract";

const useFactoryContract = () =>
  useContract(factoryAbi, process.env.REACT_APP_FACTORY_ADDRESS);

export default useFactoryContract;
