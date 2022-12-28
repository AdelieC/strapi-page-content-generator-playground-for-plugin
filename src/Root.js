import React, { useState, memo } from "react";
import {
  ThemeProvider,
  lightTheme,
  darkTheme,
  Flex,
  Box
} from "@strapi/design-system";
import flattenMessages from "./utils/flattenMessages";

import App from "./App";

import { IntlProvider } from "react-intl";
import locale_en from "./translations/en.json";
import locale_fr from "./translations/fr.json";

const data = {
  fr: locale_fr,
  en: locale_en
};

const Root = () => {
  const [theme, setTheme] = useState("dark");
  const [target, setTarget] = useState({});
  const name = "content";
  const attribute = {
    type: "json"
  };
  const value = JSON.stringify([]);

  return (
    <IntlProvider messages={flattenMessages(data.fr)} locale={"fr"}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <Flex
          alignItems={"stretch"}
          justifyContent={"stretch"}
          minHeight={"100%"}
        >
          <Box background={"neutral100"} grow={"1"} padding={10}>
            <App
              attribute={attribute}
              name={name}
              onChange={(changes) => {
                console.log(changes.target);
              }}
              value={value}
            />
          </Box>
        </Flex>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default memo(Root);
