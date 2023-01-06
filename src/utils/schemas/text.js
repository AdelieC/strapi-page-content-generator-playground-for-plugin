import { string, array } from "yup";
import { imageSchema, baseSectionSchema } from "./common";

export default baseSectionSchema.shape({
  text: string()
    .min(20)
    .max(1000)
    .required()
    .meta({ type: "textarea", baseTradId: "sections.text.text" }),
  images: array(imageSchema).meta({
    type: "images",
    baseTradId: "sections.text.images",
  }),
});
