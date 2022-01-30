import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import JoinChatForm from "components/home/JoinChatForm";
import ProfileTrigger from "components/home/ProfileTrigger";
import CreateChatForm from "components/home/CreateChatForm";
import { useEthers } from "@usedapp/core";

const HomePage: React.FC = () => {
  const { activateBrowserWallet, account, active } = useEthers();

  return (
    <>
      {active ? (
        <Box p="4">
          <p>Address: {account}</p>

          <VStack mt="4" w="sm" spacing="8">
            <JoinChatForm />
            <CreateChatForm />
            <ProfileTrigger />
          </VStack>
        </Box>
      ) : (
        <button
          type="button"
          onClick={() => {
            activateBrowserWallet();
          }}
        >
          Connect wallet
        </button>
      )}
    </>
  );
};

export default HomePage;
