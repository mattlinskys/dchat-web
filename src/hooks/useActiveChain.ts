import { useNetwork } from "wagmi";

const useActiveChain = () => {
  const [
    {
      data: { chain },
    },
  ] = useNetwork();
  return chain;
};

export default useActiveChain;
