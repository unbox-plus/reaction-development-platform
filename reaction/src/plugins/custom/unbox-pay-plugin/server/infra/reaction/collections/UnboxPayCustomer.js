import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import {
  createdAtAutoValue,
  schemaIdAutoValue,
  updatedAtAutoValue
} from '/imports/collections/schemas/helpers';
// import { check } from 'meteor/check';
// import { Tracker } from 'meteor/tracker';
import { registerSchema } from '@reactioncommerce/schemas';

/**
 * @name UnboxPayCustomer
 * @memberof Schemas
 * @type {SimpleSchema}
 * @summary UnboxPayCustomer schema
 */
const UnboxPayCustomerSchema = new SimpleSchema(
  {
    _id: {
      type: String,
      autoValue: schemaIdAutoValue,
      label: 'UnboxPayCustomer ID'
    },
    email: {
      type: String,
      label: 'Unique Email User Id'
    },
    paymentProcessorId: {
      type: String,
      label: 'External Payment Processor Customer ID'
    },
    createdAt: {
      type: Date,
      autoValue: createdAtAutoValue
    },
    updatedAt: {
      type: Date,
      autoValue: updatedAtAutoValue
    }
  },
  { check: true }
  // { check, tracker: Tracker }
);

registerSchema('UnboxPayCustomerSchema', UnboxPayCustomerSchema);

const UnboxPayCustomer = new Mongo.Collection('UnboxPayCustomer');
UnboxPayCustomer.attachSchema(UnboxPayCustomerSchema);

export default UnboxPayCustomer;
