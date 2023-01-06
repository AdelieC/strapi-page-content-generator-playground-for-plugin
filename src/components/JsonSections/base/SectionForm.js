import React, { memo, useMemo } from "react";
import { Stack, Typography, Flex } from "@strapi/design-system";
import schemas from "../../../utils/schemas";
import { useIntl } from "react-intl";
import { getTrad } from "../../../utils/getTrad";
import { Formik, Form } from "formik";
import AccordionLayout from "./AccordionLayout";
import FieldsList from "./FieldsList";
import RemoveSectionButton from "./buttons/RemoveSectionButton";

const shouldNotRerender = (oldProps, newProps) => {
  return oldProps.id === newProps.id;
};

const SectionForm = ({ id, type, initialValues }) => {
  const { formatMessage } = useIntl();
  const schema = useMemo(() => schemas?.[type]?.describe(), [type]);

  return (
    <Formik initialValues={initialValues} validationSchema={schemas[type]}>
      <AccordionLayout
        iconName={type}
        heading={`${formatMessage({
          id: getTrad(`sections.${type}.heading`),
          defaultMessage: `${type} section `,
        })}`}
        action={<RemoveSectionButton id={id} />}
      >
        <Stack padding={2} background={"neutral0"} hasRadius={true}>
          <Typography
            textColor="neutral800"
            variant={"epsilon"}
            textAlign={"center"}
          >
            {formatMessage({
              id: getTrad(`sections.${type}.description`),
              defaultMessage: `Create your own ${type} section`,
            })}
          </Typography>
        </Stack>
        <Form>
          <Flex gap={6} direction={"column"} alignItems={"stretch"}>
            <FieldsList fields={schema.fields} />
          </Flex>
        </Form>
      </AccordionLayout>
    </Formik>
  );
};

export default memo(SectionForm, shouldNotRerender);
