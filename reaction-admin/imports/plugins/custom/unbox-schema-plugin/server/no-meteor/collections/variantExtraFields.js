import { registerSchema } from '@reactioncommerce/schemas';
import Random from '@reactioncommerce/random';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const VariantExtraFields = new SimpleSchema({
  _id: {
    type: String,
    defaultValue: Random.id(),
    optional: true
  },
  shopId: {
    type: String
  },
  variantId: {
    label: 'Variant ID',
    type: String
  },
  erpCode: {
    label: 'ERP Code',
    type: String
  },
  warehouseId: {
    label: 'Warehouse ID',
    type: String
  },
  warranty: {
    type: String
  },
  ean: {
    type: String
  },
  cest: {
    type: String
  },
  ncm: {
    type: String
  },
  sped: {
    type: String
  },
  originCode: {
    type: String
  },
  unity: {
    type: String
  },
  perBox: {
    type: String
  },
  freeShipping: {
    type: String
  },
  externalLink: {
    type: String
  },
  videoUrl: {
    type: String
  },
  thumbnailUrl: {
    type: String
  },
  observations: {
    type: String
  },
  selfManufactured: {
    type: Boolean
  },
  crossDocking: {
    type: String
  },
  expirationDate: {
    type: String
  },
  productId: {
    type: String
  },
  isDeleted: {
    type: Boolean
  }
});

registerSchema('VariantExtraFields', VariantExtraFields);
const VariantExtraFieldsCollection = new Mongo.Collection('VariantExtraFields');
export default VariantExtraFieldsCollection;

VariantExtraFieldsCollection.attachSchema(VariantExtraFields);
