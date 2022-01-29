import {
  Avatar,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { IProfile } from "types/profile";

export interface VCardProps {
  user?: Pick<IProfile, "name">;
  address?: string;
}

const VCard: React.FC<VCardProps> = ({ user, address }) => {
  return (
    <HStack spacing="2" maxW="48">
      {user ? (
        <>
          <Avatar name={user.name} />
          <Box overflow="hidden">
            <Text fontSize="sm" isTruncated>
              {user.name}
            </Text>
            {address && (
              <Text fontSize="xs" isTruncated color="gray.600">
                {address}
              </Text>
            )}
          </Box>
        </>
      ) : (
        <>
          <SkeletonCircle size="12" />
          <SkeletonText noOfLines={2} w="20" />
        </>
      )}
    </HStack>
  );
};

export default VCard;
