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
import Avatar from "components/shared/Avatar";

export interface VCardProps {
  user?: Pick<IProfile, "name">;
  isLoaded?: boolean;
  account: string;
  avatarSize: BoxProps["w"];
  isMe?: boolean;
  details?: React.ReactNode;
}

const VCard: React.FC<VCardProps> = ({
  user,
  isLoaded,
  account,
  avatarSize,
  isMe,
  details,
}) => (
  <HStack spacing="2" maxW="48">
    {user || account ? (
      <>
        <Avatar address={account} size={avatarSize} />
        <Box overflow="hidden">
          <Text fontSize="sm" fontWeight="bold" opacity={0.9} isTruncated>
            {user
              ? user.name
              : isLoaded && (
                  <Text as="i" opacity={0.6}>
                    (<FormattedMessage id="common.noProfile" ignoreTag />)
                  </Text>
                )}{" "}
            {isMe && (
              <Text as="i" fontSize="xs">
                (<FormattedMessage id="common.you" ignoreTag />)
              </Text>
            )}
            {details}
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
