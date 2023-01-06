import React, { memo } from "react";
import { getTrad } from "../../../../utils/getTrad";
import { useIntl } from "react-intl";
import { Typography, Stack } from "@strapi/design-system";

const FetchError = ({ resourceName }) => {
  const { formatMessage } = useIntl();
  return (
    <Stack hasRadius={true} padding={3} background={"error500"}>
      <Typography variant="omega" textColor="error">
        {`${formatMessage({
          id: getTrad(`info.fetch-error`),
          defaultMessage:
            "Something went wrong while trying to fetch this resource :",
        })} ${resourceName}`}
      </Typography>
    </Stack>
  );
};

export default memo(FetchError);
