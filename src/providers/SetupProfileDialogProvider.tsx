import React, { useCallback, useContext } from "react";
import SetupProfileDialog, {
  SetupProfileDialogProps,
} from "components/profile/SetupProfileDialog";
import { SETUP_PROFILE_HASH } from "constants/hashes";
import ProfileContext from "contexts/ProfileContext";
import useFactoryAddress from "hooks/useFactoryAddress";
import useSignedContract from "hooks/useSignedContract";
import useContractFunction from "hooks/useContractFunction";
import useContractFunctionErrorSnackbar from "hooks/useContractFunctionErrorSnackbar";
import useHashDisclosure from "hooks/useHashDisclosure";
import { utils } from "ethers";
import naclUtil from "tweetnacl-util";
import useSnackbar from "hooks/useSnackbar";
import { factoryAbi } from "app/abis";
import useAccountAddress from "hooks/useAccountAddress";
import { useProvider } from "wagmi";
import { Web3Provider } from "@ethersproject/providers";

const SetupProfileDialogProvider: React.FC = () => {
  const provider = useProvider() as Web3Provider;
  const account = useAccountAddress();
  const { profile, isLoaded } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(
    SETUP_PROFILE_HASH,
    isLoaded && !profile
  );
  const snackbar = useSnackbar();
  const factoryAddress = useFactoryAddress();
  const factoryContract = useSignedContract(factoryAbi, factoryAddress);
  const { state, send } = useContractFunction("createProfile", factoryContract);
  useContractFunctionErrorSnackbar(state);

  const handleSubmit = useCallback<SetupProfileDialogProps["onSubmit"]>(
    async (values) => {
      try {
        const publicKey = await provider.provider?.request?.({
          method: "eth_getEncryptionPublicKey",
          params: [account],
        });

        await send(
          utils.formatBytes32String(values.name),
          naclUtil.decodeBase64(publicKey)
        );
      } catch (err: any) {
        snackbar("error", err.message);
      }
    },
    [provider, send, snackbar, account]
  );

  // useEffect(() => {
  //   if (state.status === "success" && state.events?.[0]) {

  //   }
  // }, [state]);

  return (
    <SetupProfileDialog
      isOpen={isVisible}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={
        state.status === "pending" ||
        state.status === "minting" ||
        state.status === "success"
      }
    />
  );
};

export default SetupProfileDialogProvider;
