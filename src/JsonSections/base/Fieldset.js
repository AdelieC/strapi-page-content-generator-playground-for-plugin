import React, { memo } from "react";
import { IconButton } from "@strapi/design-system";
import { useIntl } from "react-intl";

import DynamicIcon from "./icons/DynamicIcon";
import getTrad from "../../utils/getTrad";
import AccordionLayout from "./AccordionLayout";
import FieldsList from "./FieldsList";

const shouldNotRerender = (oldProps, newProps) => {
  return oldProps.name === newProps.name;
};

const Fieldset = ({ fields, name, baseTradId, remove, index, iconName }) => {
  const { formatMessage } = useIntl();

  return (
    <AccordionLayout
      iconName={iconName}
      heading={`${formatMessage({
        id: getTrad(`${baseTradId}.heading`),
        defaultMessage: name
      })}${index + 1}`}
      action={
        <IconButton
          onClick={() => remove(index)}
          label={formatMessage({
            id: getTrad(`${baseTradId}.delete`),
            defaultMessage: "Remove"
          })}
          noBorder
          icon={<DynamicIcon iconName={"trash"} />}
        />
      }
    >
      <FieldsList baseName={`${name}[${index}]`} fields={fields} />
    </AccordionLayout>
  );
};

export default memo(Fieldset, shouldNotRerender);
