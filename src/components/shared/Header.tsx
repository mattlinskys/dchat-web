import React from "react";
import { Box } from "@chakra-ui/react";
import Logo from "components/assets/Logo";
import { Link } from "react-router-dom";
import { HOME_PATH } from "constants/routes";

const Header: React.FC = () => {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="8"
      py="6"
    >
      <Link to={HOME_PATH}>
        <Logo />
      </Link>
    </Box>
  );
};

export default Header;
