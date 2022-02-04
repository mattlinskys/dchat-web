import React from "react";
import { FormattedMessage } from "react-intl";
import EditProfileForm, {
  EditProfileFormProps,
} from "components/profile/EditProfileForm";
import { IProfile } from "types/profile";
import Dialog, { DialogProps } from "components/shared/Dialog";

export interface EditProfileDialogProps extends Omit<DialogProps, "title"> {
  profile: IProfile;
  onSubmit: EditProfileFormProps["onSubmit"];
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  onSubmit,
  profile,
  ...rest
}) => (
  <Dialog
    title={<FormattedMessage id="profile.edit.title" ignoreTag />}
    {...rest}
  >
    <EditProfileForm defaultValues={profile} onSubmit={onSubmit} />
  </Dialog>
);

export default EditProfileDialog;
