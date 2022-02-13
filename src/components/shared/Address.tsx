import React from "react";
import { Text, TextProps, Tooltip } from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { shortenAddress } from "utils/addressUtils";
import useCopy from "hooks/useCopy";
import IconButton from "components/shared/IconButton";
import CopyIcon from "components/icons/CopyIcon";

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
  const { formatMessage } = useIntl();
  const copy = useCopy();

  return (
    <Text title={address} {...rest}>
      {shortenAddress(address, shortenMagnitude)}
      {showCopy && (
        <Tooltip label={<FormattedMessage id="common.copy" />} placement="top">
          <IconButton
            aria-label={formatMessage({
              id: "common.copy",
            })}
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
