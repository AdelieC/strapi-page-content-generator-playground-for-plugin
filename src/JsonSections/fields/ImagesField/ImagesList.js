import React, { memo } from "react";
import { IconButton, Grid, GridItem, Box } from "@strapi/design-system";
import getTrad from "../../../utils/getTrad";
import { useIntl } from "react-intl";
import DynamicIcon from "../../base/icons/DynamicIcon";
import { useField } from "formik";

import styled from "styled-components";

const AbsoluteIconButton = styled(IconButton)`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 3px;
  right: 3px;
  z-index: 2;
`;

const RelativeBox = styled(Box)`
  position: relative;
`;

const ImageThumbnail = styled.img`
  max-width: 6rem;
  border-radius: 3px;
`;

const ImagesList = ({ name, remove, baseTradId }) => {
  const [field] = useField(name);
  const { formatMessage } = useIntl();
  return (
    <Grid gap={5}>
      {field.value?.map((value, i) => (
        <GridItem key={i} background="primary100" col={1}>
          <RelativeBox>
            <ImageThumbnail src={value.url} alt={i} />
            <AbsoluteIconButton
              onClick={() => remove(i)}
              label={formatMessage({
                id: getTrad(`${baseTradId}.delete`),
                defaultMessage: "Remove"
              })}
              noBorder
              icon={<DynamicIcon iconName={"trash"} />}
            />
          </RelativeBox>
        </GridItem>
      ))}
    </Grid>
  );
};

export default memo(ImagesList);
