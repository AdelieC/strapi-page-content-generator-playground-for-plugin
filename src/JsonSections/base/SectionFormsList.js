import React, { memo } from "react";
import SectionForm from "./SectionForm";
import { useSectionsStateContext } from "../../utils/providers/SectionsProvider";

const SectionFormsList = () => {
  const { sections } = useSectionsStateContext();

  return sections?.map((section) => {
    return (
      <SectionForm
        key={section.id}
        id={section.id}
        type={section.type}
        initialValues={section}
      />
    );
  });
};

export default memo(SectionFormsList);
