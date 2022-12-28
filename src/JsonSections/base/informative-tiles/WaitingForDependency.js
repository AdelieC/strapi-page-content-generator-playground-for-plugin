import React, { memo } from "react";
import getTrad from "../../../utils/getTrad";
import { useIntl } from "react-intl";
import { Typography, Stack } from "@strapi/design-system";

const WaitingForDependency = ({ dependencyName }) => {
  const { formatMessage } = useIntl();
  return (
    <Stack hasRadius={true} padding={3} background={"alternative600"}>
      <Typography variant="omega" textColor="neutral0">
        {`${formatMessage({
          id: getTrad(`info.waiting-for`),
          defaultMessage: "To continue, please choose a value for"
        })} ${dependencyName} `}
      </Typography>
    </Stack>
  );
};

export default memo(WaitingForDependency);
