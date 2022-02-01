import React from "react";
import { Box } from "@chakra-ui/react";
import Logo from "components/assets/Logo";

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
      <Logo />
    </Box>
  );
};

export default Header;
