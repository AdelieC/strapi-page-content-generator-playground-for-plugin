import { string, array } from "yup";
import { baseSectionSchema, imageSchema } from "./common";

export default baseSectionSchema.shape({
  text: string()
    .required()
    .meta({ type: "textarea", baseTradId: "sections.hero.text" }),
  background_image_light: imageSchema.meta({
    type: "image",
    baseTradId: "sections.hero.background-image-light",
  }),
  content_position_light: string()
    .oneOf(["left", "right", "center"])
    .default("right")
    .meta({ type: "enum", baseTradId: "sections.hero.content-position-light" }),
  background_image_dark: imageSchema.meta({
    type: "image",
    baseTradId: "sections.hero.background-image-dark",
  }),
  content_position_dark: string()
    .oneOf(["left", "right", "center"])
    .default("right")
    .meta({ type: "enum", baseTradId: "sections.hero.content-position-dark" }),
});
