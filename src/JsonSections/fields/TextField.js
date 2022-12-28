import React from "react";
import { Textarea } from "@strapi/design-system";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import { FastField } from "formik";

const TextField = ({ name, baseTradId }) => {
  const { formatMessage } = useIntl();
  return (
    <FastField name={name}>
      {({ field, form, meta }) => (
        <Textarea
          name={name}
          value={field.value}
          label={formatMessage({
            id: getTrad(`${baseTradId}.label`),
            defaultMessage: baseTradId
          })}
          placeholder={formatMessage({
            id: getTrad(`${baseTradId}.placeholder`),
            defaultMessage: "Your text..."
          })}
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
          onChange={(e) => form.setFieldValue(name, e.target.value)}
        />
      )}
    </FastField>
  );
};

export default TextField;
