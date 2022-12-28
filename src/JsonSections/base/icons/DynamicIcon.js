import React, { memo } from "react";
import Icons from "./Icons";

const DynamicIcon = ({ iconName }) => {
  const Icon = Icons?.[iconName] || Icons.puzzle;
  return <Icon />;
};

export default memo(DynamicIcon);
