import { string, array, object } from "yup";
import {
  baseSectionSchema,
  buttonSchema,
  imageSchema,
  colorStyleSchema,
} from "./common";

export default baseSectionSchema.shape({
  text: string()
    .required()
    .meta({ type: "textarea", baseTradId: "sections.gallery.text" }),
  images: array(imageSchema)
    .meta({ type: "images", baseTradId: "sections.gallery.images" })
    .min(2)
    .required(),
});
