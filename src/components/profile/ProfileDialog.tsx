import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/layout";
import { FormattedMessage } from "react-intl";
import { IProfile } from "types/profile";

export interface ProfileDialogProps {
  isOpen: boolean;
  profile?: IProfile;
  onLogOut: () => void;
  onEdit: () => void;
  onClose: () => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({
  isOpen,
  profile,
  onLogOut,
  onEdit,
  onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <FormattedMessage id="profile.title" />
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <VStack spacing={4} align="stretch">
          <SimpleGrid columns={2} spacing={4}>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb="1">
                <FormattedMessage id="common.avatar" />
              </Text>
              <Avatar name={profile?.name} src={profile?.avatarUrl} />
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb="1">
                <FormattedMessage id="common.name" />
              </Text>
              <Text>{profile?.name}</Text>
            </Box>
          </SimpleGrid>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb="1">
              <FormattedMessage id="common.description" />
            </Text>
            <Text>{profile?.description || "-"}</Text>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" mb="1">
              <FormattedMessage id="common.wallet" />
            </Text>
            <Text isTruncated>{profile?.address}</Text>
          </Box>
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onLogOut}>
          <FormattedMessage id="common.disconnect" />
        </Button>
        <Button ml={2} onClick={onEdit}>
          <FormattedMessage id="common.edit" />
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ProfileDialog;
