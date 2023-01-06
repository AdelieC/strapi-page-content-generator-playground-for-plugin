import React, { memo } from "react";
import { getTrad } from "../../../../utils/getTrad";
import { useIntl } from "react-intl";
import { Typography, Stack } from "@strapi/design-system";

const SchemaError = () => {
  const { formatMessage } = useIntl();
  return (
    <Stack hasRadius={true} padding={3} background={"warning500"}>
      <Typography variant="omega" textColor="error">
        {formatMessage({
          id: getTrad(`info.missing-schema`),
          defaultMessage:
            "Missing or wrong schema key somewhere in /utils/schemas :",
        })}
      </Typography>
    </Stack>
  );
};

export default memo(SchemaError);
