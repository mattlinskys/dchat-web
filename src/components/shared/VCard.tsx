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
  isAddressShorten?: boolean;
}

const VCard: React.FC<VCardProps> = ({
  user,
  isLoaded,
  account,
  avatarSize,
  isMe,
  details,
  isAddressShorten = true,
}) => (
  <HStack spacing="2" overflow="hidden" textAlign="left">
    {user || account ? (
      <>
        <Avatar address={account} size={avatarSize} />
        <Box overflow="hidden">
          <Text fontSize="sm" fontWeight="bold" opacity={0.9} isTruncated>
            {user
              ? user.name
              : isLoaded && (
                  <Text as="i" opacity={0.75}>
                    <FormattedMessage id="common.no-profile" ignoreTag />
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
              {/* //TODO: Click to copy + icon */}
              {isAddressShorten ? shortenAddress(account, 3) : account}
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
          endColor="gray.500"
        />
        <SkeletonText
          noOfLines={2}
          w="20"
          startColor="gray.300"
          endColor="gray.500"
        />
      </>
    )}
  </HStack>
);

export default VCard;
