import { string, array } from "yup";
import { baseSectionSchema, imageSchema } from "./common";

export default baseSectionSchema.shape({
  text: string()
    .required()
    .meta({ type: "textarea", baseTradId: "sections.gallery.text" }),
  images: array(imageSchema)
    .meta({ type: "images", baseTradId: "sections.gallery.images" })
    .min(2)
    .required()
});
