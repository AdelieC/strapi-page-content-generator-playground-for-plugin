import React, { useEffect } from "react";
import { Select, Option } from "@strapi/design-system";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import { useDataContext } from "../../utils/providers/DataProvider";
import { useField } from "formik";
import FetchError from "../base/informative-tiles/FetchError";

const dataKey = "collection-types";

const SelectCollectionField = ({ name, baseTradId }) => {
  const [field, meta, helpers] = useField(name);
  const { formatMessage } = useIntl();
  const { data, fetchData } = useDataContext();

  useEffect(() => {
    if (!(dataKey in data)) fetchData(dataKey);
  }, [data]);

  if (!data[dataKey]?.length) return <FetchError resourceName={dataKey} />;

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
        defaultMessage: "Select a collection"
      })}
      hint={formatMessage({
        id: getTrad(`${baseTradId}.hint`),
        defaultMessage: "Choose a collection from your collection types."
      })}
      error={
        meta.error &&
        formatMessage({
          id: getTrad(`${baseTradId}.error`),
          defaultMessage: "Please select a value..."
        })
      }
      onChange={(value) => helpers.setValue(value)}
    >
      {data[dataKey]?.map((collection) => {
        return (
          <Option
            key={collection.collectionName}
            value={collection.collectionName}
          >
            {collection?.info?.displayName || collection.collectionName}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectCollectionField;
