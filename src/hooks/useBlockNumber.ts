import { useBlockNumber as useBlockNumberData } from "wagmi";

const useBlockNumber = () => {
  const [{ data: blockNumber }] = useBlockNumberData({ watch: true });
  return blockNumber;
};

export default useBlockNumber;
