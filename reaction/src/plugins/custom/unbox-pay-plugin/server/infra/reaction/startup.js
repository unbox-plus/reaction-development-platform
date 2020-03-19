/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default function startup(context) {
  // eslint-disable-next-line no-param-reassign
  context.collections.ExampleIOUPaymentRefunds = context.app.db.collection(
    'ExampleIOUPaymentRefunds'
  );
}
