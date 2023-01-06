# Playground for page content generator strapi plugin

## Description :

This is a dev environnement mimicking the structure and behavior of a strapi custom plugin with custom field. There is no server, so the fake api calls are just fetching the content of a json file. The page content generator plugin aims to create json sections for front pages.

It contains a Page collection-type, with seo attributes such as title, keywords and description, and a json attribute "sections" which is generated and managed by a "custom field" (more a huge dynamic form than a FIELD...). You can add as many sections as you want in your front end page. I created 5 types of sections in ./src/utils/schemas. Thoses schemas are in fact yup validation objects, with meta attributes to handle needed infos to build the form. I could have chosen to handle fields rendering from json schemas, but I needed complex validation for formik, so i chose to kill to birds with one stone and use yup objects to build the form.

## Dependencies :

### Strapi :

- Strapi design system
- react
- react router + router-dom
- react intl

### Other :

- Formik
- Yup
- uuid

## Usage :

### Create a new section type :

1. Create a new file named [my-section-type].js in ./src/utils/schemas
2. Put your new yup object in there, taking the other schemas as example. I chose to make all sections inherit a baseSectionSchema yup object.
   The list of available field types is here.
3. Import it, and add it to the list of exports in ./src/utils/schemas/index.js

### Existing fieldtypes :

- [string](#string-field)
- [textarea](#textarea-field)
- [number](#number-field)
- [enum](#enum-field)
- [collection](#collection-field)
- [attribute](#attribute-field) (/!\ this one relies on the existence of a "collection" field)
- [relation](#relation-field)
- [multiple](#multiple-field)
- [toggle](#toggle-field)
- [images](#images-field)
- [image](#image-field)

#### String field

It's a simple text input. You can use all the yup methods for string(), like min, max, match, required etc...

The meta object must have at least these attributes :

- type:"string"
- baseTradId: "sections.your-base-trad-id"

#### Textarea field

It's just a textarea. You can use the same yup methods as for string field.

The meta object must have at least these attributes :

- type:"textarea"
- baseTradId: "sections.your-base-trad-id"

#### Number field

It's a number input. You can use all the yup methods for number().

The meta object must have at least these attributes :

- type:"number"
- baseTradId: "sections.your-base-trad-id"

#### Enum field

It's a select with predefined options. You need to declare it as a yup array. It's better to define another yup object for the content of the array.

Required schema for the content of the array must be a yup string().oneOf([...yourOptions])

The meta object must have at least these attributes :

- type:"enum"
- baseTradId: "sections.your-base-trad-id"

#### Collection field

It's a select with fetched options. The idea is to have in strapi a custom route that fetches all your collectionTypes, returns them as an array that will be passed as options to the select.
Here, it's faked within the db.json file. The api call (to the collection-types route) is handled by the existing field.

The meta object must have at least these attributes :

- type:"collection"
- baseTradId: "sections.your-base-trad-id"

#### Attribute field

A collection field is required because the attribute field is a select with the previously selected collection type's attributes as options. You must define this field as a yup string. Everything else will be handled in the meta object like so :

```
your_field_name: string().meta({
    type: "attribute",
    target: "name-of-your-collection-field",
    baseTradId: "sections.your-base-trad-id",
  }),
```

Before the user selects a value for you collection field, this field displays a message saying that the user needs to select a collection to continue.

#### Relation field

It's a select that fetches whatever collection type items list you tell it to fetch within the meta object.
Be careful, within strapi, you need to make sure to have a route corresponding to the source you will specify inside the meta object, and it needs to send back an array of items with ids.

Declare this field base on this model :

```
your_field_name: string().meta({
    type: "relation",
    source: "plural-name-of-the-resource-you-want-to-fetch",
    optionsValue: "name-of-the-attribute-that-will-be-used-as-value-in-options",
    optionsLabel: "name-of-the-attribute-that-will-be-used-as-label-in-options",
    baseTradId: "sections.your-base-trad-id",
  }),

```

#### Multiple field

This one will in fact be a formik FieldArray. It can contain multiple fields.
There's a button to add a set of defined fields, and buttons to delete each of them.

You need to create a separate yup object for the nested fields, with schemas and metas corresponding to the fields types, and define the main field (the multiple field) as a yup array of the separate yup object that you will have defined earlier.

The main field will need the following attributes in the meta object :

- type: "multiple"
- baseTradId: "sections.your-base-trad-id"
- iconName: "your-icon-name"

To add an icon to the existing ones, go to ./src/JsonSections/base/icons and add the one you want with the name you gave as 'iconName' in index.js

Ex :

```
//nested yup object with nested fields
export const buttonSchema = object({
  label: string()
    .required()
    .min(2)
    .max(30)
    .meta({ type: "string", baseTradId: "sections.buttons.label" }),
  variant: colorStyleSchema.meta({
    type: "enum",
    baseTradId: "sections.buttons.variant",
  }),
  href: string()
    .url()
    .meta({ type: "string", baseTradId: "sections.buttons.href" }),
  to: string().meta({
    type: "relation",
    source: "pages",
    optionsValue: "slug",
    optionsLabel: "nav_title",
    baseTradId: "sections.buttons.to",
  }),
});
```

```
//main multiple field yup object definition
export const myCustomSectionSchema = object({
  ...
  buttons: array(buttonSchema).meta({
    type: "multiple",
    baseTradId: "sections.base.buttons",
    iconName: "buttons",
  }),
  ...
});
```

#### Toggle field

This one is basically a switch or a checkbox. You need to define it as a boolean yup object.

The meta object must have at least these attributes :

- type:"toggle"
- baseTradId: "sections.your-base-trad-id"

In your translation file, you will need on-label and off-label keys besides the usual field keys (label, error, hint, placeholder)

#### Images field

It's a formik FieldArray. The existing field handles getting your list of existing images. To add an image to the field array, you just have to select it, and you can remove it (trash icon button on the image).

You need to define it like so :

```
your-images-field-array-name: array(imageSchema).meta({
    type: "images",
    baseTradId: "sections.your-base-trad-id",
  }),

```

imageSchema is already defined in common.js in the schemas folder.

#### Image field

It's a simple select that fetches all your images and lets you choose one as a select option.

You need to define it like so :

```
your-image-field-name: imageSchema.meta({
    type: "image",
    baseTradId: "sections.your-base-trad-id",
  }),

```
