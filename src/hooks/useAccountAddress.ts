import { useAccount } from "wagmi";

const useAccountAddress = () => {
  const [{ data }] = useAccount();
  return data?.address;
};

export default useAccountAddress;
