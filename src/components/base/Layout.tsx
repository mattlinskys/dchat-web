import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "components/shared/Header";

const Layout: React.FC = ({ children }) => (
  <Box h="full" display="flex" flexDirection="column" justifyContent="stretch">
    <Header />
    {children}
  </Box>
);

export default Layout;
