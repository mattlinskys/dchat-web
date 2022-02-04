import React from "react";
import { Button } from "@chakra-ui/button";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { IProfile } from "types/profile";
import Dialog, { DialogProps } from "components/shared/Dialog";
import ActionsFooter from "components/shared/ActionsFooter";

export interface ProfileDialogProps extends Omit<DialogProps, "title"> {
  profile?: IProfile;
  onLogOut: () => void;
  onEdit: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  profile,
  onLogOut,
  onEdit,
  ...rest
}) => (
  <Dialog title={<FormattedMessage id="profile.title" />} {...rest}>
    <VStack spacing={4} align="stretch">
      <Box>
        <Text fontSize="sm" fontWeight="medium" mb="1">
          <FormattedMessage id="common.name" />
        </Text>
        <Text>{profile?.name}</Text>
      </Box>

      <Box>
        <Text fontSize="sm" fontWeight="medium" mb="1">
          <FormattedMessage id="common.wallet" />
        </Text>
        <Text isTruncated>{profile?.address}</Text>
      </Box>
    </VStack>

    <ActionsFooter>
      <Button onClick={onLogOut}>
        <FormattedMessage id="common.disconnect" />
      </Button>
      <Button onClick={onEdit}>
        <FormattedMessage id="common.edit" />
      </Button>
    </ActionsFooter>
  </Dialog>
);

export default ProfileDialog;
