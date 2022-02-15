import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import Logo from "components/assets/Logo";
import { Link, useMatch } from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import { FormattedMessage, useIntl } from "react-intl";
import { useEthers } from "@usedapp/core";
import ProfileContext from "contexts/ProfileContext";
import ProfileIcon from "components/icons/ProfileIcon";
import MetaMaskIcon from "components/icons/MetaMaskIcon";
import Avatar from "components/shared/Avatar";
import IconButton from "components/shared/IconButton";
import InfoIcon from "components/icons/InfoIcon";
import { PROFILE_HASH, SETUP_PROFILE_HASH } from "constants/hashes";
import useNavigateHash from "hooks/useNavigateHash";
import { shortenAddress } from "utils/addressUtils";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import useSnackbar from "hooks/useSnackbar";

const Header: React.FC = () => {
  const { formatMessage } = useIntl();
  const isHome = !!useMatch(HOME_PATH);
  const { activateBrowserWallet, active, error } = useEthers();
  const navigateHash = useNavigateHash();
  const snackbar = useSnackbar();
  const { profile, isLoaded: isLoadedProfile } = useContext(ProfileContext)!;

  useEffect(() => {
    if (error instanceof NoEthereumProviderError) {
      snackbar("error", formatMessage({ id: "errors.no-metamask-provider" }));
    }
  }, [error]);

  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="8"
      py="6"
      minH="24"
    >
      {isHome ? (
        <Box />
      ) : (
        <Link to={HOME_PATH}>
          <Logo />
        </Link>
      )}

      {active ? (
        isLoadedProfile &&
        (profile ? (
          <Button
            onClick={() => navigateHash(PROFILE_HASH)}
            variant="outline"
            minH="12"
            px="2"
            minW="24"
            maxW="60"
            justifyContent="flex-start"
          >
            <Avatar address={profile.account} size="8" />
            <Box ml="2" textAlign="left" overflow="hidden">
              <Text fontWeight="bold" isTruncated>
                {profile.name}
              </Text>
              <Text fontSize="sm" color="gray.300" isTruncated>
                {shortenAddress(profile.account, 8)}
              </Text>
            </Box>
          </Button>
        ) : (
          <Button
            onClick={() => navigateHash(SETUP_PROFILE_HASH)}
            variant="outline"
            leftIcon={<Icon as={ProfileIcon} />}
          >
            <FormattedMessage id="header.setup-profile" />
          </Button>
        ))
      ) : (
        <HStack spacing="3">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <IconButton
                aria-label={formatMessage({
                  id: "common.info",
                })}
                icon={InfoIcon}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <FormattedMessage id="header.connect-wallet.info" />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button
            onClick={() => activateBrowserWallet()}
            variant="outline"
            leftIcon={<Icon as={MetaMaskIcon} w="5" h="auto" />}
          >
            <FormattedMessage id="header.connect-wallet.label" />
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default Header;
