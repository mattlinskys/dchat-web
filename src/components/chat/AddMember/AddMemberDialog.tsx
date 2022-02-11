import React from "react";
import Dialog, { DialogProps } from "components/shared/Dialog";
import { FormattedMessage } from "react-intl";
import AddMemberForm from "components/chat/AddMember/AddMemberForm";
import InfoAlert from "components/shared/InfoAlert";
import UserInfoIcon from "components/icons/UserInfoIcon";

interface AddMemberDialogProps extends Omit<DialogProps, "title"> {}

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({
  isOpen,
  onClose,
}) => (
  <Dialog
    title={<FormattedMessage id="members.add.title" />}
    isOpen={isOpen}
    onClose={onClose}
  >
    <InfoAlert icon={UserInfoIcon} mt="-2" mb="3">
      <FormattedMessage id="members.add.info" />
    </InfoAlert>
    <AddMemberForm onClose={onClose} />
  </Dialog>
);

export default AddMemberDialog;
