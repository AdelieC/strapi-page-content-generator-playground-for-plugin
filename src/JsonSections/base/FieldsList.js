import { useFormikContext } from "formik";
import React, { memo, useEffect } from "react";

import DynamicField from "./DynamicField";

import { useSectionsServiceContext } from "../../utils/providers/SectionsProvider";

const shouldNotRerender = (oldProps, newProps) => {
  return oldProps.fields === newProps.fields;
};

const FieldsList = ({ fields, baseName = "" }) => {
  const { values } = useFormikContext();
  const { handleChange } = useSectionsServiceContext();

  useEffect(() => {
    handleChange(values, values.id);
  }, [values]);

  return (
    <>
      {Object.entries(fields)?.map(([key, value]) => {
        const fieldType = value?.meta?.type;
        if (fieldType === "hidden") return <React.Fragment key={key} />;
        const baseTradId = value?.meta?.baseTradId;
        const name = baseName ? `${baseName}.${key}` : key;
        return (
          <DynamicField
            key={baseTradId || key}
            fields={value?.innerType?.fields}
            target={value.meta?.target}
            options={value.oneOf}
            type={fieldType}
            name={name}
            source={value?.meta?.source}
            optionsLabel={value?.meta?.optionsLabel}
            optionsValue={value?.meta?.optionsValue}
            baseTradId={baseTradId}
            iconName={value?.meta?.iconName}
          />
        );
      })}
    </>
  );
};

export default memo(FieldsList, shouldNotRerender);
