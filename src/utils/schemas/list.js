import { string, number, array } from "yup";
import { baseSectionSchema, buttonSchema, filterSchema } from "./common";

export default baseSectionSchema.shape({
  resource: string()
    .required()
    .meta({ type: "collection", baseTradId: "sections.list.resource" }),
  group_by: string().meta({
    type: "attribute",
    target: "resource",
    baseTradId: "sections.list.group-by"
  }),
  limit: number().meta({ type: "number", baseTradId: "sections.list.limit" }),
  filters: array(filterSchema).meta({
    type: "multiple",
    baseTradId: "sections.list.filters",
    iconName: "filters"
  }),
  buttons: array(buttonSchema).meta({
    type: "multiple",
    baseTradId: "sections.list.buttons",
    iconName: "buttons"
  })
});
