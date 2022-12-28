import { string, array } from "yup";
import { buttonSchema, imageSchema, baseSectionSchema } from "./common";

export default baseSectionSchema.shape({
  text: string()
    .min(20)
    .max(1000)
    .required()
    .meta({ type: "textarea", baseTradId: "sections.text.text" }),
  buttons: array(buttonSchema).meta({
    type: "multiple",
    baseTradId: "sections.text.buttons",
    iconName: "buttons"
  }),
  background_color: string()
    .oneOf(["primary", "secondary", "accent", "warning"])
    .default("secondary")
    .meta({ type: "enum", baseTradId: "sections.text.background-color" }),
  images: array(imageSchema).meta({
    type: "images",
    baseTradId: "sections.text.images"
  })
});
