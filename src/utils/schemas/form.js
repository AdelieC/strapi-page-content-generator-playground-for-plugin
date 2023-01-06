import { string, array, object, boolean } from "yup";
import {
  baseSectionSchema,
  buttonSchema,
  imageSchema,
  colorStyleSchema,
} from "./common";

const fieldTypeSchema = string()
  .oneOf(["textarea", "text", "tel", "email", "checkbox", "radio", "number"])
  .default("text");

const methodSchema = string().oneOf(["GET", "POST"]).default("POST");

const fieldSchema = object({
  label: string()
    .required()
    .min(2)
    .max(30)
    .meta({ type: "string", baseTradId: "sections.form.fields.label" }),
  placeholder: string()
    .required()
    .min(2)
    .max(30)
    .meta({ type: "string", baseTradId: "sections.form.fields.placeholder" }),
  errorMessage: string()
    .required()
    .min(2)
    .max(30)
    .meta({ type: "string", baseTradId: "sections.form.fields.error-message" }),
  hintMessage: string()
    .required()
    .min(2)
    .max(30)
    .meta({ type: "string", baseTradId: "sections.form.fields.hint-message" }),
  fieldType: fieldTypeSchema.meta({
    type: "enum",
    baseTradId: "sections.form.fields.field-type",
  }),
  isRequired: fieldTypeSchema.meta({
    type: "toggle",
    baseTradId: "sections.form.fields.is-required",
  }),
});

export default baseSectionSchema.shape({
  fields: array(fieldSchema)
    .required()
    .meta({ type: "multiple", baseTradId: "sections.form.fields" }),
  action: string().meta({
    type: "relation",
    source: "routes",
    optionsValue: "path",
    optionsLabel: "path",
    baseTradId: "sections.form.action",
  }),
  method: methodSchema.meta({
    type: "enum",
    baseTradId: "sections.form.method",
  }),
  hasCaptcha: boolean().meta({
    type: "toggle",
    baseTradId: "sections.form.has-captcha",
  }),
  submitLabel: string().required().meta({
    type: "string",
    baseTradId: "sections.form.submit-label",
  }),
});
