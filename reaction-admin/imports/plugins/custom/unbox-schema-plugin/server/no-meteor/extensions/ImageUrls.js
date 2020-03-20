import { registerSchema } from '@reactioncommerce/schemas';
import SimpleSchema from 'simpl-schema';

export const UrlString = new SimpleSchema({
  url: {
    type: String,
    optional: true
  }
});

registerSchema('UrlString', UrlString);
