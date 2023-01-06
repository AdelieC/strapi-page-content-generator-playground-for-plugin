import React, { memo } from "react";
import fields from "../fields";
import SchemaError from "./informative-tiles/SchemaError";

const findCorrespondingComponent = (type) => {
  if (type in fields) return fields?.[type];
  else return SchemaError;
};

const DynamicField = (props) => {
  const Component = findCorrespondingComponent(props.type);
  return <Component {...props} />;
};

export default memo(DynamicField);
