import React from "react";
import { Text, TextProps, Tooltip } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { shortenAddress } from "utils/addressUtils";
import { CopyIcon } from "@chakra-ui/icons";
import useCopy from "hooks/useCopy";
import IconButton from "components/shared/IconButton";

export interface AddressProps extends TextProps {
  address: string;
  shortenMagnitude?: number;
  showCopy?: boolean;
}

const Address: React.FC<AddressProps> = ({
  address,
  shortenMagnitude,
  showCopy = true,
  ...rest
}) => {
  const copy = useCopy();

  return (
    <Text title={address} {...rest}>
      {shortenAddress(address, shortenMagnitude)}
      {showCopy && (
        <Tooltip label={<FormattedMessage id="common.copy" />} placement="top">
          <IconButton
            aria-label="Copy address"
            size="xs"
            ml="1"
            color="currentColor"
            verticalAlign="top"
            icon={CopyIcon}
            onClick={() => copy(address)}
          />
        </Tooltip>
      )}
    </Text>
  );
};

export default Address;
