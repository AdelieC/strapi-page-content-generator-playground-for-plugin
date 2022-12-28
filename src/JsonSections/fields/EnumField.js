import React from "react";
import { Select, Option } from "@strapi/design-system";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import { FastField } from "formik";

const EnumField = ({ name, baseTradId, options }) => {
  const { formatMessage } = useIntl();

  return (
    <FastField name={name}>
      {({ field, form, meta }) => (
        <Select
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
              defaultMessage: "Your text..."
            })
          }
          onChange={(value) => form.setFieldValue(name, value)}
        >
          {options?.map((option) => {
            return (
              <Option key={option} value={option}>
                {formatMessage({
                  id: getTrad(`${baseTradId}.options.${option}`),
                  defaultMessage: option
                })}
              </Option>
            );
          })}
        </Select>
      )}
    </FastField>
  );
};

export default EnumField;
