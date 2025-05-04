import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "category"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in NPR",
      }
    },
    {
        name: "category",
        type: "relationship",
        relationTo: "categories",
        hasMany: false,
    },
    {
        name: "tags",
        type: "relationship",
        relationTo: "tags",
        hasMany: true,
    },
    {
        name: "images",
        type: "upload",
        relationTo: "media",
    }, 
    {
        name: "refund-policy",
        type: "select",
        options: ['30-days', '60-days', '90-days', 'No-Refund', '7-days'],
        defaultValue: '30-days',
    }
  ],
};
