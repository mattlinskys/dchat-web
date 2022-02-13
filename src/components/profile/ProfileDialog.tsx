import React from "react";
import {
  Button,
  Box,
  SimpleGrid,
  Text,
  VStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { IProfile } from "types/profile";
import Dialog, { DialogProps } from "components/shared/Dialog";
import ActionsFooter from "components/shared/ActionsFooter";
import Avatar from "components/shared/Avatar";
import IconButton from "components/shared/IconButton";
import InfoIcon from "components/icons/InfoIcon";

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
}) => {
  const { formatMessage } = useIntl();

  return (
    <Dialog title={<FormattedMessage id="profile.title" />} {...rest}>
      <VStack spacing={4} align="stretch">
        <SimpleGrid columns={2} spacing="2">
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb="1" color="gray.200">
              <FormattedMessage id="common.name" />
            </Text>
            <Text title={profile?.name} isTruncated>
              {profile?.name}
            </Text>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb="1" color="gray.200">
              <FormattedMessage id="common.avatar" />

              <Popover>
                <PopoverTrigger>
                  <IconButton
                    aria-label={formatMessage({
                      id: "common.info",
                    })}
                    ml="1"
                    size="xs"
                    verticalAlign="middle"
                    icon={InfoIcon}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody>
                    <FormattedMessage id="profile.avatar.tooltip" />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Text>

            {profile && <Avatar address={profile.account} size="8" />}
          </Box>
        </SimpleGrid>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb="1" color="gray.200">
            <FormattedMessage id="common.wallet" />
          </Text>
          <Text isTruncated>{profile?.account}</Text>
        </Box>
      </VStack>

      <ActionsFooter>
        <Button onClick={onLogOut} variant="outline">
          <FormattedMessage id="common.disconnect" />
        </Button>
        <Button onClick={onEdit}>
          <FormattedMessage id="common.edit" />
        </Button>
      </ActionsFooter>
    </Dialog>
  );
};

export default ProfileDialog;
