import { useLocation } from "react-router-dom";

const useHash = () => {
  const { hash } = useLocation();
  return hash ? hash.replace("#", "") : undefined;
};

export default useHash;
