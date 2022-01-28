import ChainsContext from "contexts/ChainsContext";
import { useContext } from "react";

const useActiveChain = () => {
  const { activeChain } = useContext(ChainsContext)!;
  return activeChain;
};

export default useActiveChain;
