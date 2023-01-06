import StringField from "./StringField";
import EnumField from "./EnumField";
import TextField from "./TextField";
import NumberField from "./NumberField";
import SelectMultiple from "./ImagesField/SelectMultiple";
import SelectOne from "./ImagesField/SelectOne";
import SelectRelationField from "./SelectRelationField";
import SelectCollectionField from "./SelectCollectionField";
import SelectAttributeField from "./SelectAttributeField";
import { memo } from "react";
import MultipleField from "./MultipleField";
import ToggleField from "./ToggleField";

export default {
  textarea: memo(TextField),
  string: memo(StringField),
  enum: memo(EnumField),
  number: memo(NumberField),
  images: memo(SelectMultiple),
  image: memo(SelectOne),
  relation: memo(SelectRelationField),
  collection: memo(SelectCollectionField),
  attribute: memo(SelectAttributeField),
  multiple: memo(MultipleField),
  toggle: memo(ToggleField),
};
