import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "components/shared/Header";
import { isDesktop } from "react-device-detect";

const Layout: React.FC = ({ children }) => (
  <Box
    h="full"
    display="flex"
    flexDirection="column"
    justifyContent="stretch"
    m={!isDesktop ? "4" : undefined}
  >
    {isDesktop && <Header />}

    {children}
  </Box>
);

export default Layout;
