import React, { memo } from "react";

import schemas from "../../../utils/schemas";
import { useIntl } from "react-intl";
import getTrad from "../../../utils/getTrad";
import { Button, Flex } from "@strapi/design-system";
import DynamicIcon from "../icons/DynamicIcon";
import { useSectionsServiceContext } from "../../../utils/providers/SectionsProvider";
import { v4 as uuid } from "uuid";

const generateSectionFromType = (type) => {
  const section = { type, id: uuid() };
  Object.entries(schemas[type].fields).forEach(([key, value]) => {
    if (key !== "type") {
      section[key] =
        value.type === "array" ? [] : value.type === "number" ? 0 : "";
    }
  });
  return section;
};

const AddSectionButtons = () => {
  const { addSection } = useSectionsServiceContext();
  const { formatMessage } = useIntl();

  return (
    <Flex
      alignItems={"center"}
      gap={4}
      wrap={"wrap"}
      justifyContent={"center"}
    >
      {Object?.entries(schemas)?.map(([key, value]) => (
        <Button
          key={`button${key}`}
          onClick={() => addSection(generateSectionFromType(key))}
          variant="secondary"
          startIcon={<DynamicIcon iconName={"plus"} />}
        >
          {formatMessage({
            id: getTrad(`sections.${key}.add`),
            defaultMessage: `Add ${key} section`
          })}
        </Button>
      ))}
    </Flex>
  );
};

export default memo(AddSectionButtons);
