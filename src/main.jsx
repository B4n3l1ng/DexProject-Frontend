import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import { MantineProvider } from "@mantine/core";
import ScrollToTop from "./components/ScrollToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <AuthProviderWrapper>
          <App />
          <ScrollToTop />
        </AuthProviderWrapper>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
