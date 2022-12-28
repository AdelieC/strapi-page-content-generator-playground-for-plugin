import React, { useEffect } from "react";
import { Select, Option } from "@strapi/design-system";
import getTrad from "../../../utils/getTrad";
import { useIntl } from "react-intl";
import { FieldArray, FastField } from "formik";
import { useDataContext } from "../../../utils/providers/DataProvider";
import styled from "styled-components";
import AccordionLayout from "../../base/AccordionLayout";
import FetchError from "../../base/informative-tiles/FetchError";
import ImagesList from "./ImagesList";

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

const imageCanBeAdded = (image, values) => {
  return values?.find((i) => i.id === image.id) === undefined;
};

const ImagesField = ({ name, baseTradId }) => {
  const { formatMessage } = useIntl();
  const { data, fetchData } = useDataContext();

  useEffect(() => {
    if (!("images" in data)) fetchData("images");
  }, [data]);

  if (!data.images?.length) return <FetchError resourceName={"images"} />;

  return (
    <AccordionLayout
      iconName={"images"}
      heading={formatMessage({
        id: getTrad(`${baseTradId}.heading`),
        defaultMessage: name
      })}
    >
      <FastField name={name}>
        {({ field, form, meta }) => (
          <FieldArray name={name}>
            {({ insert, remove, push }) => (
              <>
                <ImagesList
                  baseTradId={baseTradId}
                  name={name}
                  remove={remove}
                />
                <Select
                  label={formatMessage({
                    id: getTrad(`${baseTradId}.label`),
                    defaultMessage: "New image"
                  })}
                  placeholder={formatMessage({
                    id: getTrad(`${baseTradId}.placeholder`),
                    defaultMessage: "Select an image"
                  })}
                  hint={formatMessage({
                    id: getTrad(`${baseTradId}.hint`),
                    defaultMessage: "Select an image to add it to this section"
                  })}
                  error={
                    meta.error &&
                    formatMessage({
                      id: getTrad(`${baseTradId}.error`),
                      defaultMessage: "Your text..."
                    })
                  }
                  onChange={(value) => {
                    push(data.images.find((i) => i.id === value));
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
              </>
            )}
          </FieldArray>
        )}
      </FastField>
    </AccordionLayout>
  );
};

export default ImagesField;
