import React from "react";
import { IntlProvider } from "react-intl";
import messagesEn from "lang/en.json";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DAppProvider } from "@usedapp/core";
import dappConfig from "app/dappConfig";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "app/theme";
import { CHAT_PATH, HOME_PATH } from "constants/routes";

import HomePage from "pages/HomePage";
import ChatPage from "pages/ChatPage";

const App: React.FC = () => {
  return (
    <IntlProvider locale="en" messages={messagesEn}>
      <BrowserRouter>
        <DAppProvider config={dappConfig}>
          <ChakraProvider theme={theme}>
            <Routes>
              <Route path={HOME_PATH} element={<HomePage />} />
              <Route path={CHAT_PATH} element={<ChatPage />} />
            </Routes>
          </ChakraProvider>
        </DAppProvider>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
