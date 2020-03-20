import { CatalogProduct, VariantBaseSchema } from '/imports/collections/schemas';
import { UrlString } from './ImageUrls';

export const catalogExtension = {
  imageUrls: {
    type: Array,
    optional: true
  },
  'imageUrls.$': {
    type: UrlString
  },
  erpCode: {
    type: String,
    optional: true
  }
};

CatalogProduct.extend(catalogExtension);
VariantBaseSchema.extend(catalogExtension);
