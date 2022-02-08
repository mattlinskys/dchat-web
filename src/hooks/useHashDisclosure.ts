import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import useHash from "hooks/useHash";
import useNavigateHash from "hooks/useNavigateHash";

const useHashDisclosure = (disclosureHash: string, show = true) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isVisible = isOpen && show;
  const hash = useHash();
  const navigateHash = useNavigateHash();

  useEffect(() => {
    if (hash === disclosureHash) {
      onOpen();
    } else {
      onClose();
    }
  }, [hash]);

  useEffect(() => {
    if (!isVisible && hash) {
      navigateHash();
    }
  }, [isVisible]);

  return { isVisible, onClose };
};

export default useHashDisclosure;
