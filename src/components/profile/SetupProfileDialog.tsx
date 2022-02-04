import React from "react";
import { FormattedMessage } from "react-intl";
import EditProfileForm, {
  EditProfileFormProps,
} from "components/profile/EditProfileForm";
import Dialog, { DialogProps } from "components/shared/Dialog";

export type SetupProfileDialogProps = Pick<
  EditProfileFormProps,
  "onSubmit" | "isLoading"
> &
  Omit<DialogProps, "title">;

const SetupProfileDialog: React.FC<SetupProfileDialogProps> = ({
  isLoading,
  onSubmit,
  ...rest
}) => (
  <Dialog title={<FormattedMessage id="profile.setup.title" />} {...rest}>
    <EditProfileForm isLoading={isLoading} onSubmit={onSubmit} />
  </Dialog>
);

export default SetupProfileDialog;
