import React from "react";
import { IntlProvider } from "react-intl";
import messagesEn from "lang/en.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dappConfig from "app/dappConfig";
import theme from "app/theme";
import { CHAT_PATH, HOME_PATH } from "constants/routes";

import { DAppProvider } from "@usedapp/core";
import { ChakraProvider } from "@chakra-ui/react";
import ProfileProvider from "providers/ProfileProvider";
import SetupProfileDialogProvider from "providers/SetupProfileDialogProvider";
import ProfileDialogProvider from "providers/ProfileDialogProvider";

import HomePage from "pages/HomePage";
import ChatPage from "pages/ChatPage";

const App: React.FC = () => {
  return (
    <IntlProvider locale="en" messages={messagesEn}>
      <BrowserRouter>
        <DAppProvider config={dappConfig}>
          <ChakraProvider theme={theme}>
            <ProfileProvider>
              <Routes>
                <Route path={HOME_PATH} element={<HomePage />} />
                <Route path={CHAT_PATH} element={<ChatPage />} />
              </Routes>

              <SetupProfileDialogProvider />
              <ProfileDialogProvider />
            </ProfileProvider>
          </ChakraProvider>
        </DAppProvider>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
