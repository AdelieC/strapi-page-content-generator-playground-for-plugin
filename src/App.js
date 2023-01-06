import React, { memo } from "react";

import JsonSections from "./components/JsonSections";

const shouldNotRender = (oldProps, newProps) => {
  return oldProps.name === newProps.name;
};

const App = (props) => {
  return <JsonSections {...props} />;
};

export default memo(App, shouldNotRender);
