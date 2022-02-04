import React from "react";
import Dialog, { DialogProps } from "components/shared/Dialog";
import { FormattedMessage } from "react-intl";
import AddMemberForm from "components/chat/AddMember/AddMemberForm";

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
    <AddMemberForm onClose={onClose} />
  </Dialog>
);

export default AddMemberDialog;
