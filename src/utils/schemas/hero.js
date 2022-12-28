import { string, array } from "yup";
import { baseSectionSchema, buttonSchema, imageSchema } from "./common";

export default baseSectionSchema.shape({
  text: string()
    .required()
    .meta({ type: "textarea", baseTradId: "sections.hero.text" }),
  buttons: array(buttonSchema).meta({
    type: "multiple",
    baseTradId: "sections.hero.buttons",
    iconName: "buttons"
  }),
  background_color: string()
    .oneOf(["primary", "secondary", "accent", "warning"])
    .default("secondary")
    .meta({ type: "enum", baseTradId: "sections.hero.background-color" }),
  background_images: array(imageSchema).meta({
    type: "images",
    baseTradId: "sections.hero.background-images"
  })
});
