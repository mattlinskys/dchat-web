import React, { useCallback, useContext } from "react";
import { useContractFunction, useEthers } from "@usedapp/core";
import SetupProfileDialog, {
  SetupProfileDialogProps,
} from "components/profile/SetupProfileDialog";
import { SETUP_PROFILE_HASH } from "constants/hashes";
import ProfileContext from "contexts/ProfileContext";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import useHashDisclosure from "hooks/useHashDisclosure";
import useFactoryContract from "hooks/useFactoryContract";
import { utils } from "ethers";
import { useToast } from "@chakra-ui/react";

const SetupProfileDialogProvider: React.FC = () => {
  const { connector, account } = useEthers();
  const { profile, isLoaded } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(
    SETUP_PROFILE_HASH,
    isLoaded && !profile
  );
  const factoryContract = useFactoryContract();
  const toast = useToast();
  const { state, send } = useContractFunction(factoryContract, "createProfile");
  useContractFunctionErrorToast(state);

  const handleSubmit = useCallback<SetupProfileDialogProps["onSubmit"]>(
    async (values) => {
      try {
        const provider = await connector!.getProvider();
        const publicKey = await provider.request({
          method: "eth_getEncryptionPublicKey",
          params: [account],
        });

        const customKeys = (
          ["avatarUrl", "description"] as (keyof typeof values)[]
        ).filter((key) => !!values[key]?.trim());

        await send(
          utils.formatBytes32String(values.name),
          utils.toUtf8Bytes(publicKey),
          customKeys.map((key) => utils.id(key)),
          customKeys.map((key) => values[key])
        );
      } catch (err: any) {
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [connector, send, toast]
  );

  // useEffect(() => {
  //   const [event] = events ?? [];
  //   if (state.status === "Success" && event) {
  // setContractAddress(event.args.account);
  //   }
  // }, [state.status, events?.length]);

  return (
    <SetupProfileDialog
      isOpen={isVisible}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default SetupProfileDialogProvider;
