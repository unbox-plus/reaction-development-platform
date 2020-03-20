import {
  OrderItem as OrderItemCollection,
  SelectedFulfillmentOption as SelectedFulfillmentOptionCollections
} from '/imports/collections/schemas';
import {
  orderItemInputSchema,
  OrderItem,
  SelectedFulfillmentOption
} from '/imports/node-app/core-services/orders/simpleSchemas';

export const orderExtension = {
  thumbnail: {
    type: String,
    optional: true
  }
};

orderItemInputSchema.extend(orderExtension);
OrderItem.extend(orderExtension);
OrderItemCollection.extend(orderExtension);

export const ShippingMethodFields = {
  externalId: {
    type: String,
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
  handling: {
    type: Number,
    optional: true
  },
  enableSchedule: {
    type: Boolean,
    optional: true
  },
  schedulingStart: {
    type: String,
    optional: true
  },
  schedulingEnd: {
    type: String,
    optional: true
  }
};

SelectedFulfillmentOptionCollections.extend(ShippingMethodFields);
SelectedFulfillmentOption.extend(ShippingMethodFields);
