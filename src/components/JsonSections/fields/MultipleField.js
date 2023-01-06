import React from "react";
import { Button } from "@strapi/design-system";
import { getTrad } from "../../../utils/getTrad";
import { useIntl } from "react-intl";
import DynamicIcon from "../base/icons/DynamicIcon";
import { FieldArray, FastField } from "formik";
import Fieldset from "../base/Fieldset";

const generateFieldsetFromSchema = (fields) => {
  const fieldset = {};
  Object.entries(fields).forEach(([key, value]) => {
    fieldset[key] = value.type === "number" ? 0 : "";
  });
  return fieldset;
};

const MultipleField = ({ name, iconName, fields, baseTradId }) => {
  const { formatMessage } = useIntl();

  return (
    <FastField name={name}>
      {({ field, form, meta }) => {
        return (
          <FieldArray name={name}>
            {({ insert, remove, push }) => (
              <>
                {field.value?.map((value, i) => (
                  <Fieldset
                    key={baseTradId + i}
                    iconName={iconName}
                    fields={fields}
                    remove={remove}
                    index={i}
                    name={name}
                    baseTradId={baseTradId}
                  />
                ))}
                <Button
                  onClick={() => push(generateFieldsetFromSchema(fields))}
                  variant="secondary"
                  startIcon={<DynamicIcon iconName={"plus"} />}
                >
                  {formatMessage({
                    id: getTrad(`${baseTradId}.add`),
                    defaultMessage: `Add fieldset`,
                  })}
                </Button>
              </>
            )}
          </FieldArray>
        );
      }}
    </FastField>
  );
};

export default MultipleField;
