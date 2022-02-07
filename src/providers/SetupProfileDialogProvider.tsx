import React, { useCallback, useContext, useEffect } from "react";
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
import naclUtil from "tweetnacl-util";
import useSnackbar from "hooks/useSnackbar";

const SetupProfileDialogProvider: React.FC = () => {
  const { connector, account } = useEthers();
  const { profile, isLoaded } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(
    SETUP_PROFILE_HASH,
    isLoaded && !profile
  );
  const factoryContract = useFactoryContract();
  const snackbar = useSnackbar();
  const { state, events, send } = useContractFunction(
    factoryContract!,
    "createProfile"
  );
  useContractFunctionErrorToast(state);

  const handleSubmit = useCallback<SetupProfileDialogProps["onSubmit"]>(
    async (values) => {
      try {
        const provider = await connector!.getProvider();
        const publicKey = await provider.request({
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
    [connector, send, snackbar, account]
  );

  useEffect(() => {
    const [event] = events ?? [];
    if (state.status === "Success" && event) {
      // TODO:
      // setAddress(event.args.account);
    }
  }, [state.status, events?.length]);

  return (
    <SetupProfileDialog
      isOpen={isVisible}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={
        state.status === "Mining" ||
        state.status === "PendingSignature" ||
        state.status === "Success"
      }
    />
  );
};

export default SetupProfileDialogProvider;
