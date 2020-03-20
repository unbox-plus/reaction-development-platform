import { CartItem } from '/imports/collections/schemas';
import {
  CartItem as CartSchema,
  ShippingMethod
} from '/imports/node-app/core-services/cart/simpleSchemas';

export const cartExtension = {
  thumbnail: {
    type: String,
    optional: true
  }
};

CartItem.extend(cartExtension);
CartSchema.extend(cartExtension);

export const ShippingMethodFields = {
  externalId: {
    type: String,
    optional: true
  },
  daysToDeliver: {
    type: Number,
    optional: true
  }
};

ShippingMethod.extend(ShippingMethodFields);
