import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "styles/index.scss";

import "@fontsource/lato/300.css";
import "@fontsource/lato/300-italic.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/700-italic.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
