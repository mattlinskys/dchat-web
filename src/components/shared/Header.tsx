import React, { useContext } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import Logo from "components/assets/Logo";
import { Link, useMatch } from "react-router-dom";
import { HOME_PATH } from "constants/routes";
import { FormattedMessage } from "react-intl";
import WalletIcon from "components/icons/WalletIcon";
import { useEthers } from "@usedapp/core";
import ProfileContext from "contexts/ProfileContext";
import ProfileIcon from "components/icons/ProfileIcon";
import { PROFILE_HASH, SETUP_PROFILE_HASH } from "constants/hashes";
import VCard from "components/shared/VCard";
import useNavigateHash from "hooks/useNavigateHash";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Header: React.FC = () => {
  const isHome = !!useMatch(HOME_PATH);
  const { activateBrowserWallet, active } = useEthers();
  const navigateHash = useNavigateHash();
  const { profile, isLoaded: isLoadedProfile } = useContext(ProfileContext)!;

  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="8"
      py="6"
      minH="92"
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
            // px="3"
            // minW="36"
            // justifyContent="flex-start"
          >
            <VCard
              user={profile}
              account={profile.account}
              isLoaded
              avatarSize="6"
            />
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
        <HStack spacing="2">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <IconButton
                aria-label="Info"
                variant="ghost"
                minW="6"
                opacity="0.8"
                h="6"
                verticalAlign="top"
                icon={<InfoOutlineIcon />}
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
            leftIcon={<Icon as={WalletIcon} />}
          >
            <FormattedMessage id="header.connect-wallet.label" />
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default Header;
