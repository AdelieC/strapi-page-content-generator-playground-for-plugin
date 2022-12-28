import React, { useEffect, useState } from "react";
import { Select, Option } from "@strapi/design-system";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import { useDataContext } from "../../utils/providers/DataProvider";
import { useFormikContext, useField } from "formik";
import WaitingForDependency from "../base/informative-tiles/WaitingForDependency";
import FetchError from "../base/informative-tiles/FetchError";

const dataKey = "collection-types";

const SelectAttributeField = ({ name, baseTradId, target }) => {
  const [field, meta, helpers] = useField(name);
  const { values } = useFormikContext();
  const { formatMessage } = useIntl();
  const { data } = useDataContext();

  const [attributes, setAttributes] = useState([]);

  const getAttributes = () => {
    const currentSource = data[dataKey].find(
      (collection) => collection.collectionName === values[target]
    );
    const attributesList = [];
    Object.entries(currentSource.attributes).forEach(([key, value]) => {
      if (value.type === "relation") {
        const relationName = value?.target;
        const nestedCollection = data[dataKey].find((r) =>
          relationName?.includes(r.info.singularName)
        );
        if (nestedCollection?.attributes) {
          Object.entries(nestedCollection.attributes).forEach(
            ([nestedKey, nestedValue]) => {
              if (nestedValue.type !== "relation") {
                attributesList.push(`${key}.${nestedKey}`);
              }
            }
          );
        }
      } else {
        attributesList.push(key);
      }
    });
    return attributesList;
  };

  useEffect(() => {
    if (values[target]) {
      setAttributes(getAttributes());
    }
  }, [values[target]]);

  if (!data[dataKey]?.length) return <FetchError resourceName={dataKey} />;
  if (!target || !values[target])
    return <WaitingForDependency dependencyName={target} />;
  return (
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
      error={
        meta.error &&
        formatMessage({
          id: getTrad(`${baseTradId}.error`),
          defaultMessage: "Please select an attribute..."
        })
      }
      hint={formatMessage({
        id: getTrad(`${baseTradId}.hint`),
        defaultMessage: `Select an attribute from relation ${target}`
      })}
      onChange={(value) => helpers.setValue(value)}
    >
      {attributes?.map((attribute) => {
        return (
          <Option key={attribute} value={attribute}>
            {attribute}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectAttributeField;
