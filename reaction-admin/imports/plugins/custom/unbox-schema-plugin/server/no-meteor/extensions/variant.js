import { ProductVariant } from '/imports/collections/schemas';
import { UrlString } from './ImageUrls';

export const variantExtension = {
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

ProductVariant.extend(variantExtension);
