import Random from '@reactioncommerce/random';
import { Product } from '/imports/collections/schemas';
import { UrlString } from './ImageUrls';

export const productExtension = {
  _id: {
    type: String,
    defaultValue: Random.id()
  },
  erpCode: {
    type: String,
    optional: true
  },
  status: {
    type: String,
    optional: true
  },
  imageUrls: {
    type: Array,
    optional: true
  },
  'imageUrls.$': {
    type: UrlString
  }
};

Product.extend(productExtension);
