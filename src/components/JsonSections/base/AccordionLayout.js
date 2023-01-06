import React, { useState, memo, useCallback } from "react";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  Stack
} from "@strapi/design-system";
import DynamicIcon from "./icons/DynamicIcon";

const shouldNotRerender = (oldProps, newProps) => {
  return oldProps.heading === newProps.heading;
};

const AccordionLayout = ({ iconName, heading, children, action }) => {
  const [toggle, setToggle] = useState(false);
  const changeToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  return (
    <Accordion expanded={toggle} onToggle={changeToggle} size="S">
      <AccordionToggle
        startIcon={<DynamicIcon iconName={iconName} />}
        title={heading}
        togglePosition="right"
        action={action}
      />
      <AccordionContent>
        <Stack spacing={6} shrink={0} padding={3} background="primary100">
          {children}
        </Stack>
      </AccordionContent>
    </Accordion>
  );
};

export default memo(AccordionLayout, shouldNotRerender);
