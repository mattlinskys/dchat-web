import React, { useCallback, useContext, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import SetupProfileDialog, {
  SetupProfileDialogProps,
} from "components/profile/SetupProfileDialog";
import { SETUP_PROFILE_HASH } from "constants/hashes";
import ProfileContext from "contexts/ProfileContext";
import useContractFunction from "hooks/useContractFunction";
import useContractFunctionErrorSnackbar from "hooks/useContractFunctionErrorSnackbar";
import useHashDisclosure from "hooks/useHashDisclosure";
import useConnectedContract from "hooks/useConnectedContract";
import useFactoryAddress from "hooks/useFactoryAddress";
import { utils } from "ethers";
import naclUtil from "tweetnacl-util";
import useSnackbar from "hooks/useSnackbar";
import { factoryAbi } from "app/abis";

const SetupProfileDialogProvider: React.FC = () => {
  const { connector, account } = useEthers();
  const { profile, isLoaded } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(
    SETUP_PROFILE_HASH,
    isLoaded && !profile
  );
  const factoryAddress = useFactoryAddress();
  const factoryContract = useConnectedContract(factoryAbi, factoryAddress);
  const snackbar = useSnackbar();
  const { state, send } = useContractFunction("createProfile", factoryContract);
  useContractFunctionErrorSnackbar(state);

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
    if (state.status === "success" && state.events?.[0]) {
      // const [event] = state.events;
      // TODO:
      // setAddress(event.args.account);
    }
  }, [state]);

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
