import React, { memo } from "react";

import JsonSections from "./JsonSections";
import { DataProvider } from "./utils/providers/DataProvider";
import { SectionsProvider } from "./utils/providers/SectionsProvider";

const shouldNotRender = (oldProps, newProps) => {
  return oldProps.name === newProps.name;
};

const App = ({ attribute, name, onChange, value }) => {
  return (
    <SectionsProvider
      name={name}
      jsonValue={value}
      type={attribute.type}
      onChange={onChange}
    >
      <DataProvider>
        <JsonSections />
      </DataProvider>
    </SectionsProvider>
  );
};

export default memo(App, shouldNotRender);
