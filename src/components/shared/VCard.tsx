import React from "react";
import {
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  Box,
  BoxProps,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { IProfile } from "types/profile";
import { shortenAddress } from "utils/addressUtils";

export interface VCardProps {
  user?: Pick<IProfile, "name">;
  account?: string;
  avatarSize: BoxProps["w"];
  isMe?: boolean;
}

const VCard: React.FC<VCardProps> = ({ user, account, avatarSize, isMe }) => (
  <HStack spacing="2" maxW="48">
    {user ? (
      <>
        <Box w={avatarSize} h={avatarSize} rounded="full" bg="gray.200" />
        <Box overflow="hidden">
          <Text fontSize="sm" fontWeight="bold" opacity={0.9} isTruncated>
            {user.name}{" "}
            {isMe && (
              <Text as="i" fontSize="xs">
                (<FormattedMessage id="common.you" ignoreTag />)
              </Text>
            )}
          </Text>
          {account && (
            <Text fontSize="xs" opacity={0.5} title={account} isTruncated>
              {shortenAddress(account, 3)}
            </Text>
          )}
        </Box>
      </>
    ) : (
      <>
        <SkeletonCircle
          // @ts-ignore
          size={avatarSize}
          startColor="gray.300"
          endColor="gray.400"
        />
        <SkeletonText
          noOfLines={2}
          w="20"
          startColor="gray.300"
          endColor="gray.400"
        />
      </>
    )}
  </HStack>
);

export default VCard;
