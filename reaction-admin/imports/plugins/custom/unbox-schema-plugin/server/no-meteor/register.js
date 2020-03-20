import schemas from './schemas';

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionNodeApp} app The ReactionNodeApp instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: 'Schema Extension Plugin',
    name: 'unbox-schema-plugin',
    collections: {
      VariantExtraFields: {
        name: 'VariantExtraFields',
        indexes: [
          // Create indexes. We set specific names for backwards compatibility
          // with indexes created by the aldeed:schema-index Meteor package.
          [{ shopId: 1 }],
          [{ erpCode: 1 }],
          [{ isDeleted: 1 }]
        ]
      },
      Quotations: {
        name: 'Quotations',
        indexes: [[{ shopId: 1 }]]
      },
      UnboxPayCustomer: {
        name: 'UnboxPayCustomer'
      }
    },
    graphQL: {
      schemas
    },
    registry: [
      {
        label: 'Unbox Scheme',
        provides: ['unboxSchema']
      }
    ]
  });
}
