import React, { memo } from "react";

import { Flex } from "@strapi/design-system";

import SectionFormsList from "./base/SectionFormsList";
import AddSectionButtons from "./base/buttons/AddSectionButtons";

const JsonSections = () => {
  return (
    <Flex gap={6} direction={"column"} alignItems={"stretch"}>
      <SectionFormsList />
      <AddSectionButtons />
    </Flex>
  );
};

export default memo(JsonSections);
