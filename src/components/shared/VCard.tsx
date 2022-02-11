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
import Avatar from "components/shared/Avatar";
import Address from "components/shared/Address";

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
                    <FormattedMessage id="common.no-profile" />
                  </Text>
                )}{" "}
            {isMe && (
              <Text as="i" fontSize="xs">
                (<FormattedMessage id="common.you" />)
              </Text>
            )}
            {details}
          </Text>

          {account && (
            <Address
              address={account}
              fontSize="xs"
              color="gray.300"
              isTruncated
            />
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
