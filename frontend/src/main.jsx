import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";

// changing the background of the body depending upon the light or dark mode
const styles = {
  global: (props) => ({
    body: {
      color: mode("grey.800", "whiteAlpha.900")(props), //first argument(grey color) is used for light mode and second for dark mode
      bg: mode("grey.100", "#101010")(props), //grey background for dark mode
    },
  }),
};

const config = {
  initialColorMode: "dark", //as name suggest initially it will be dark
  useSystemColorMode: true, // if the browser has set mode of light then it will be light mode
};

const colors = {
  grey: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};

export const theme = extendTheme({ config, styles, colors });


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
