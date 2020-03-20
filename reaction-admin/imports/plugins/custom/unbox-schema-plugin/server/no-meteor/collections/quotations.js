import { registerSchema } from '@reactioncommerce/schemas';
import Random from '@reactioncommerce/random';
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const ItemsFields = new SimpleSchema({
  id: {
    type: String,
    defaultValue: Random.id(),
    optional: true
  },
  erpCode: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  height: {
    type: Number,
    optional: true
  },
  weight: {
    type: Number,
    optional: true
  },
  width: {
    type: Number,
    optional: true
  },
  length: {
    type: Number,
    optional: true
  },
  quantityOfItems: {
    type: Number,
    optional: true
  },
  totalItemPrice: {
    type: Number,
    optional: true
  },
  productCategory: {
    type: String,
    optional: true
  }
});

registerSchema('ItemsFields', ItemsFields);

export const VolumesFields = new SimpleSchema({
  description: {
    type: String,
    optional: true
  },
  height: {
    type: Number,
    optional: true
  },
  weight: {
    type: Number,
    optional: true
  },
  width: {
    type: Number,
    optional: true
  },
  length: {
    type: Number,
    optional: true
  },
  quantityOfItems: {
    type: Number,
    optional: true
  },
  totalItemPrice: {
    type: Number,
    optional: true
  },
  type: {
    type: String,
    optional: true
  },
  productCategory: {
    type: String,
    optional: true
  },
  skuGroupsIds: {
    type: Array,
    optional: true
  },
  'skuGroupsIds.$': {
    type: String,
    optional: true
  }
});

registerSchema('VolumesFields', VolumesFields);

export const ShipmentMethodsFields = new SimpleSchema({
  externalId: {
    type: Number,
    optional: true
  },
  daysToDeliver: {
    type: Number,
    optional: true
  },
  providerShippingCost: {
    type: Number,
    optional: true
  },
  finalShippingCost: {
    type: Number,
    optional: true
  },
  label: {
    type: String,
    optional: true
  },
  carrier: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  schedulingStart: {
    type: String,
    optional: true,
    defaultValue: null
  },
  schedulingEnd: {
    type: String,
    optional: true,
    defaultValue: null
  }
});

registerSchema('ShipmentMethodsFields', ShipmentMethodsFields);

export const QuotationsFields = new SimpleSchema({
  _id: {
    type: String,
    defaultValue: Random.id(),
    optional: true
  },
  shopId: {
    type: String,
    optional: true
  },
  externalId: {
    type: Number,
    optional: true
  },
  originPostalCode: {
    type: String,
    optional: true
  },
  destinationPostalCode: {
    type: String,
    optional: true
  },
  quotingMode: {
    type: String,
    optional: true
  },
  createdAt: {
    type: String,
    optional: true
  },
  items: {
    type: Array,
    optional: true
  },
  'items.$': {
    type: ItemsFields,
    optional: true
  },
  volumes: {
    type: Array,
    optional: true
  },
  'volumes.$': {
    type: VolumesFields,
    optional: true
  },
  shipmentMethods: {
    type: Array,
    optional: true
  },
  'shipmentMethods.$': {
    type: ShipmentMethodsFields,
    optional: true
  },
  shipmentMethodIds: {
    type: Array,
    optional: true
  },
  'shipmentMethodIds.$': {
    type: String,
    optional: true
  },
  freeShiping: {
    type: Boolean,
    optional: true
  }
});

registerSchema('Quotations', QuotationsFields);

const quotationsFields = new Mongo.Collection('Quotations');
export default quotationsFields;

quotationsFields.attachSchema(QuotationsFields);
