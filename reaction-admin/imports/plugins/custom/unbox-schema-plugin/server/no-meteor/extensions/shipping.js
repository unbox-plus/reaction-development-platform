import SimpleSchema from 'simpl-schema';
import { ShippingMethod } from '/imports/collections/schemas';

export const ShippingMethodFields = new SimpleSchema({
  externalId: {
    type: String,
    optional: true
  },
  daysToDeliver: {
    type: Number,
    optional: true
  }
});

ShippingMethod.extend(ShippingMethodFields);
