import React, { memo } from "react";

import { DataProvider } from "../../utils/providers/DataProvider";
import { SectionsProvider } from "../../utils/providers/SectionsProvider";
import SectionFormsList from "./base/SectionFormsList";
import AddSectionButtons from "./base/buttons/AddSectionButtons";
import { Flex } from "@strapi/design-system";

const shouldNotRerender = (oldProps, newProps) => {
  return oldProps.name === newProps.name;
};

const JsonSections = ({ attribute, name, onChange, value }) => {
  return (
    <SectionsProvider
      name={name}
      jsonValue={value}
      type={attribute.type}
      onChange={onChange}
    >
      <DataProvider>
        <Flex gap={6} direction={"column"} alignItems={"stretch"}>
          <SectionFormsList />
          <AddSectionButtons />
        </Flex>
      </DataProvider>
    </SectionsProvider>
  );
};

export default memo(JsonSections, shouldNotRerender);
