import React from "react";
import { NumberInput } from "@strapi/design-system";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import { FastField } from "formik";

const NumberField = ({ name, baseTradId }) => {
  const { formatMessage } = useIntl();
  return (
    <FastField name={name}>
      {({ field, form, meta }) => (
        <NumberInput
          name={name}
          value={field.value}
          label={formatMessage({
            id: getTrad(`${baseTradId}.label`),
            defaultMessage: baseTradId
          })}
          placeholder={formatMessage({
            id: getTrad(`${baseTradId}.placeholder`),
            defaultMessage: "Enter a number..."
          })}
          error={
            meta.error &&
            formatMessage({
              id: getTrad(`${baseTradId}.error`),
              defaultMessage: "Please enter a valid number."
            })
          }
          hint={formatMessage({
            id: getTrad(`${baseTradId}.hint`),
            defaultMessage: "Choose a number."
          })}
          onValueChange={(value) => form.setFieldValue(name, value)}
        />
      )}
    </FastField>
  );
};

export default NumberField;
