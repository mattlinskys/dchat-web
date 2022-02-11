import React from "react";
import { Icon, IconButton, Text, TextProps, Tooltip } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { shortenAddress } from "utils/addressUtils";
import { CopyIcon } from "@chakra-ui/icons";
import useCopy from "hooks/useCopy";

export interface AddressProps extends TextProps {
  address: string;
  shortenMagnitude?: number;
}

const Address: React.FC<AddressProps> = ({
  address,
  shortenMagnitude,
  ...rest
}) => {
  const copy = useCopy();

  return (
    <Text title={address} {...rest}>
      {shortenAddress(address, shortenMagnitude)}
      <Tooltip label={<FormattedMessage id="common.copy" />} placement="top">
        <IconButton
          aria-label="Copy address"
          variant="ghost"
          size="sm"
          ml="1"
          color="white"
          minW="1rem"
          h="1rem"
          verticalAlign="text-top"
          opacity={0.5}
          _hover={{
            opacity: 0.9,
          }}
          icon={<Icon as={CopyIcon} />}
          onClick={() => copy(address)}
        />
      </Tooltip>
    </Text>
  );
};

export default Address;
