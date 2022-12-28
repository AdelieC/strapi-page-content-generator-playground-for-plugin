import { object, string, number, date, InferType, array, mixed } from "yup";

export const baseSectionSchema = object({
  type: string()
    .oneOf(["hero", "gallery", "text", "list"])
    .meta({ type: "hidden" }),
  name: string()
    .required()
    .min(2)
    .max(30)
    .matches(/([a-z][a-z0-9]*)(-[a-z0-9]+)?/)
    .meta({ type: "string", baseTradId: "sections.base.name" }),
  catchline: string()
    .min(2)
    .max(150)
    .meta({ type: "string", baseTradId: "sections.base.catchline" }),
  heading: string()
    .min(2)
    .max(150)
    .meta({ type: "string", baseTradId: "sections.base.heading" }),
  subheading: string()
    .min(2)
    .max(150)
    .meta({ type: "string", baseTradId: "sections.base.subheading" })
});

export const buttonSchema = object({
  label: string()
    .required()
    .min(2)
    .max(30)
    .meta({ type: "string", baseTradId: "sections.buttons.label" }),
  variant: string()
    .oneOf(["primary", "secondary", "accent", "warning"])
    .default("secondary")
    .meta({ type: "enum", baseTradId: "sections.buttons.variant" }),
  href: string()
    .url()
    .meta({ type: "string", baseTradId: "sections.buttons.href" }),
  to: string().meta({
    type: "relation",
    source: "pages",
    optionsValue: "slug",
    optionsLabel: "nav_title",
    baseTradId: "sections.buttons.to"
  })
});

export const imageSchema = object({
  id: number().integer().positive(),
  url: string().url()
});

export const filterSchema = object({
  attribute: string().required().meta({
    type: "attribute",
    target: "resource",
    baseTradId: "sections.filters.attribute"
  }),
  operator: string()
    .required()
    .oneOf([
      "$eq",
      "$eqi",
      "$ne",
      "$in",
      "$notIn",
      "$lt",
      "$lte",
      "$gt",
      "$gte",
      "$between",
      "$contains",
      "$notContains",
      "$containsi",
      "$notContainsi",
      "$startsWith",
      "$endsWith",
      "$null",
      "$notNull"
    ])
    .default("$eq")
    .meta({ type: "enum", baseTradId: "sections.filters.operator" }),
  value: mixed()
    .required()
    .meta({ type: "string", baseTradId: "sections.filters.value" })
});
