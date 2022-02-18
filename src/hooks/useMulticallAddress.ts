import { MULTICALL_ADDRESSES } from "constants/chains";
import useActiveChain from "hooks/useActiveChain";

const useMulticallAddress = () => {
  const chain = useActiveChain();
  return chain && MULTICALL_ADDRESSES[chain.id]!;
};

export default useMulticallAddress;
