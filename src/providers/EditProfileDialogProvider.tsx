import React, { useCallback, useEffect } from "react";
import EditProfileDialog, {
  EditProfileDialogProps,
} from "components/profile/EditProfileDialog";
import { utils } from "ethers";
import useConnectedContract from "hooks/useConnectedContract";
import useContractFunction from "hooks/useContractFunction";
import useContractFunctionErrorToast from "hooks/useContractFunctionErrorToast";
import useContractFunctionSuccessToast from "hooks/useContractFunctionSuccessToast";
import { IProfile } from "types/profile";
import { profileAbi } from "app/abis";

interface EditProfileDialogProviderProps {
  profile: IProfile;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileDialogProvider: React.FC<EditProfileDialogProviderProps> = ({
  profile,
  onClose,
  ...rest
}) => {
  const contract = useConnectedContract(profileAbi, profile.address);
  const { send, state } = useContractFunction("updateName", contract);
  useContractFunctionErrorToast(state);
  useContractFunctionSuccessToast(state, "Chages saved successfully");

  const handleEditSubmit = useCallback<EditProfileDialogProps["onSubmit"]>(
    async ({ name }) => {
      await send(utils.formatBytes32String(name));
    },
    [send]
  );

  useEffect(() => {
    if (state.status === "success") {
      onClose();
    }
  }, [state.status]);

  return (
    <EditProfileDialog
      profile={profile}
      onSubmit={handleEditSubmit}
      onClose={onClose}
      {...rest}
    />
  );
};

export default EditProfileDialogProvider;
