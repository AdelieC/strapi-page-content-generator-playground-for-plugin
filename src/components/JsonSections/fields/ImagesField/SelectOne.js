import React, { useEffect } from "react";
import { Select, Option, Stack, Typography } from "@strapi/design-system";
import { getTrad } from "../../../../utils/getTrad";
import { useIntl } from "react-intl";
import { FieldArray, FastField } from "formik";
import { useDataContext } from "../../../../utils/providers/DataProvider";
import styled from "styled-components";
import FetchError from "../../base/informative-tiles/FetchError";

const OptionWithBackground = styled(Option)`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 6rem;
  :hover {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 6rem;
  }
`;

const ImageThumbnail = styled.img`
  max-width: 6rem;
  border-radius: 3px;
`;

const imageCanBeAdded = (image, value) => {
  return value?.id !== image.id;
};

const SelectOne = ({ name, baseTradId }) => {
  const { formatMessage } = useIntl();
  const { data, fetchData } = useDataContext();

  useEffect(() => {
    if (!("images" in data)) fetchData("images");
  }, [data]);

  if (!data.images?.length) return <FetchError resourceName={"images"} />;

  return (
    <FastField name={name}>
      {({ field, form, meta }) => (
        <Stack spacing={4}>
          {field?.value ? (
            <ImageThumbnail src={field.value.url} />
          ) : (
            <Typography variant={"omega"}>
              {formatMessage({
                id: getTrad(`${baseTradId}.empty`),
                defaultMessage: "No image yet",
              })}
            </Typography>
          )}

          <Select
            label={formatMessage({
              id: getTrad(`${baseTradId}.label`),
              defaultMessage: "New image",
            })}
            placeholder={formatMessage({
              id: getTrad(`${baseTradId}.placeholder`),
              defaultMessage: "Select an image",
            })}
            hint={formatMessage({
              id: getTrad(`${baseTradId}.hint`),
              defaultMessage: "Select an image to add it to this section",
            })}
            error={
              meta.error &&
              formatMessage({
                id: getTrad(`${baseTradId}.error`),
                defaultMessage: "Your text...",
              })
            }
            onChange={(value) => {
              form.setFieldValue(
                name,
                data.images.find((i) => i.id === value)
              );
            }}
          >
            {data.images?.map(
              (image) =>
                imageCanBeAdded(image, field.value) && (
                  <OptionWithBackground
                    key={`${name}-${image.id}`}
                    value={image.id}
                    style={{ backgroundImage: `url("${image.url}")` }}
                  >
                    {""}
                  </OptionWithBackground>
                )
            )}
          </Select>
        </Stack>
      )}
    </FastField>
  );
};

export default SelectOne;
