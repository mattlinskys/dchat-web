import React, { useContext } from "react";
import ChatContext from "contexts/ChatContext";
import { FormattedMessage } from "react-intl";
import Dialog, { DialogProps } from "components/shared/Dialog";
import MembersList from "components/chat/MembersList/MembersList";

interface MembersListDialogProps extends Omit<DialogProps, "title"> {}

const MembersListDialog: React.FC<MembersListDialogProps> = (props) => {
  const { members } = useContext(ChatContext);

  return (
    <Dialog
      title={
        <FormattedMessage
          id="members.list.title"
          values={{ count: members.length }}
          ignoreTag
        />
      }
      {...props}
    >
      <MembersList />
    </Dialog>
  );
};

export default MembersListDialog;
