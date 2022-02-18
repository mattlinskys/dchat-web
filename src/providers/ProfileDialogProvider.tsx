import React, { useContext, useEffect } from "react";
import ProfileContext from "contexts/ProfileContext";
import { PROFILE_HASH } from "constants/hashes";
import ProfileDialog from "components/profile/ProfileDialog";
import useHashDisclosure from "hooks/useHashDisclosure";
import { useDisclosure } from "@chakra-ui/hooks";
import EditProfileDialogProvider from "providers/EditProfileDialogProvider";
import { useAccount } from "wagmi";

const ProfileDialogProvider: React.FC = () => {
  const [, disconnect] = useAccount();
  const { profile } = useContext(ProfileContext)!;
  const { isVisible, onClose } = useHashDisclosure(PROFILE_HASH, !!profile);
  const {
    isOpen: isEditingActive,
    onOpen: onOpenEditing,
    onClose: onCloseEditing,
  } = useDisclosure();

  useEffect(() => {
    if (!isVisible && isEditingActive) {
      onCloseEditing();
    }
  }, [isVisible]);

  return (
    <>
      <ProfileDialog
        isOpen={isVisible}
        profile={profile}
        onClose={onClose}
        onEdit={onOpenEditing}
        onLogOut={disconnect}
      />

      {profile && (
        <EditProfileDialogProvider
          isOpen={isVisible && isEditingActive}
          profile={profile}
          onClose={onCloseEditing}
        />
      )}
    </>
  );
};

export default ProfileDialogProvider;
