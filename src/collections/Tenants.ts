import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
      label: 'Store Name',
      admin: {
        description: 'This is the name of your store.',

      }
    },
    {
        name: 'slug',
        type: 'text',
        required: true,
        index: true,
        unique: true,
        admin: {
            description: 'This is the slug of your store. It will be used in the URL.',
        }
    },
    {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
    },
    {
        name: 'stripeAccountId',
         type: 'text',
         required: true,
         admin: {
            readOnly: true,
            description: 'This is the stripe account id of your store. It will be used to connect your store to stripe.',
        }
    },
    {
        name: 'stripeDetailSubmitted',
        type: 'checkbox',
        admin: {
            readOnly: true,
            description: 'you need to submit your stripe details to connect your store to stripe.',
        }
    },
  ],
}
