/* eslint camelcase: 0 */
import startup from './server/infra/reaction/startup';
import schemas from './server/infra/reaction/graphql';
import exampleCapturePayment from './server/infra/reaction/payments/exampleCapturePayment';
import exampleCreateRefund from './server/infra/reaction/payments/exampleCreateRefund';
import exampleListRefunds from './server/infra/reaction/payments/exampleListRefunds';
import authorizeTransactionReaction from './server/infra/reaction/payments/authorizeTransactionReaction';

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    registry: [
      // Settings panel
      {
        label: 'Unbox Pay', // this key (minus spaces) is used for translations
        provides: ['paymentSettings'],
        container: 'dashboard',
        template: 'UnboxPaySettingsFormContainer'
      }
    ]
  });
}
