import React from "react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { Box, VStack } from "@chakra-ui/react";
import JoinChatForm from "components/home/JoinChatForm";
import ProfileTrigger from "components/home/ProfileTrigger";
import CreateChatForm from "components/home/CreateChatForm";

const HomePage: React.FC = () => {
  const { activateBrowserWallet, account, active } = useEthers();
  const balance = useEtherBalance(account);

  return (
    <>
      {active ? (
        <Box p="4">
          <p>Address: {account}</p>
          {balance && <p>Balance: {balance?.toString()}</p>}

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
