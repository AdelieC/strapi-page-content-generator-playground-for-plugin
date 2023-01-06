import React from "react";
import { ToggleInput } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { getTrad } from "../../../utils/getTrad";
import { FastField } from "formik";

const ToggleField = ({ name, baseTradId }) => {
  const { formatMessage } = useIntl();
  return (
    <FastField name={name}>
      {({ field, form, meta }) => (
        <ToggleInput
          hint={formatMessage({
            id: getTrad(`${baseTradId}.hint`),
            defaultMessage: "Your text..."
          })}
          error={
            meta.error &&
            formatMessage({
              id: getTrad(`${baseTradId}.error`),
              defaultMessage: "Please enter a valid text."
            })
          }
          label={formatMessage({
            id: getTrad(`${baseTradId}.label`),
            defaultMessage: baseTradId
          })}
          name={name}
          onLabel={formatMessage({
            id: getTrad(`${baseTradId}.on-label`),
            defaultMessage: "Yes"
          })}
          offLabel={formatMessage({
            id: getTrad(`${baseTradId}.off-label`),
            defaultMessage: "No"
          })}
          checked={
            typeof field.value === "boolean"
              ? field.value
              : field.value === "true"
          }
          onChange={(e) => form.setFieldValue(name, e.target.checked)}
        />
      )}
    </FastField>
  );
};

export default ToggleField;
