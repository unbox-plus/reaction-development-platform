import { Address } from '/imports/collections/schemas';
import { OrderAddress } from '/imports/node-app/core-services/orders/simpleSchemas';
import { CartAddress } from '/imports/node-app/core-services/cart/simpleSchemas';

export const addressExtension = {
  taxPayerId: {
    type: String,
    optional: true
  },
  number: {
    type: String,
    optional: true
  },
  reference: {
    type: String,
    optional: true
  },
  neighborhood: {
    type: String,
    optional: true
  },
  mobile: {
    type: String,
    optional: true
  },
  trackByMobile: {
    type: Boolean,
    optional: true
  }
};

Address.extend(addressExtension);
OrderAddress.extend(addressExtension);
CartAddress.extend(addressExtension);
