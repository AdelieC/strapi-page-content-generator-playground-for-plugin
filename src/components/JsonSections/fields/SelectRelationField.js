import React, { useEffect } from "react";
import { Select, Option } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { getTrad } from "../../../utils/getTrad";
import { useDataContext } from "../../../utils/providers/DataProvider";
import { useField } from "formik";
import FetchError from "../base/informative-tiles/FetchError";

const SelectRelationField = ({
  name,
  baseTradId,
  source,
  optionsValue,
  optionsLabel,
}) => {
  const [field, meta, helpers] = useField(name);
  const { formatMessage } = useIntl();
  const { data, fetchData } = useDataContext();

  useEffect(() => {
    if (!(source in data)) fetchData(source);
  }, [data]);

  if (!data[source]?.length) return <FetchError resourceName={source} />;

  return (
    <Select
      name={name}
      value={field.value}
      label={formatMessage({
        id: getTrad(`${baseTradId}.label`),
        defaultMessage: baseTradId,
      })}
      placeholder={formatMessage({
        id: getTrad(`${baseTradId}.placeholder`),
        defaultMessage: "Your text...",
      })}
      hint={formatMessage({
        id: getTrad(`${baseTradId}.hint`),
        defaultMessage: "Your text...",
      })}
      error={
        meta.error &&
        formatMessage({
          id: getTrad(`${baseTradId}.error`),
          defaultMessage: "Please select a value...",
        })
      }
      onChange={(value) => helpers.setValue(value)}
    >
      {data[source]?.map((item) => {
        return (
          <Option key={item[optionsValue]} value={item[optionsValue]}>
            {item[optionsLabel]}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectRelationField;
