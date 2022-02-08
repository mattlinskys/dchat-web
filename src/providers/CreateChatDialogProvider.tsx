import React from "react";
import Dialog from "components/shared/Dialog";
import CreateChatForm from "components/home/CreateChatForm";
import { CREATE_CHAT_HASH } from "constants/hashes";
import useHashDisclosure from "hooks/useHashDisclosure";
import { FormattedMessage } from "react-intl";

const CreateChatDialogProvider: React.FC = () => {
  const { isVisible, onClose } = useHashDisclosure(CREATE_CHAT_HASH);

  return (
    <Dialog
      title={<FormattedMessage id="chat.create.title" />}
      isOpen={isVisible}
      onClose={onClose}
    >
      <CreateChatForm />
    </Dialog>
  );
};

export default CreateChatDialogProvider;
