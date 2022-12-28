import { string, array, object } from "yup";
import { baseSectionSchema, buttonSchema, imageSchema } from "./common";

export default baseSectionSchema.shape({
  text: string()
    .required()
    .meta({ type: "textarea", baseTradId: "sections.gallery.text" }),
  buttons: array(buttonSchema).meta({
    type: "multiple",
    baseTradId: "sections.gallery.buttons",
    iconName: "buttons"
  }),
  background_color: string()
    .oneOf(["primary", "secondary", "accent", "warning"])
    .default("secondary")
    .meta({ type: "enum", baseTradId: "sections.gallery.background-color" }),
  images: array(imageSchema)
    .meta({ type: "images", baseTradId: "sections.gallery.images" })
    .min(2)
    .required()
});
