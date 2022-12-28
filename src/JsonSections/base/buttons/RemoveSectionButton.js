import React, { memo } from "react";
import { useIntl } from "react-intl";
import getTrad from "../../../utils/getTrad";
import { IconButton } from "@strapi/design-system";
import DynamicIcon from "../icons/DynamicIcon";
import { useSectionsServiceContext } from "../../../utils/providers/SectionsProvider";

const RemoveSectionButton = ({ id }) => {
  const { removeSection } = useSectionsServiceContext();
  const { formatMessage } = useIntl();

  return (
    <IconButton
      onClick={() => removeSection(id)}
      label={formatMessage({
        id: getTrad(`sections.delete`),
        defaultMessage: `Delete section`
      })}
      noBorder
      icon={<DynamicIcon iconName={"trash"} />}
    />
  );
};

export default memo(RemoveSectionButton);
