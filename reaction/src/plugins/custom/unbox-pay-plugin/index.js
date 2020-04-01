/* eslint camelcase: 0 */
import startup from './server/infra/reaction/startup';
import schemas from './server/infra/reaction/graphql';
import exampleCapturePayment from './server/infra/reaction/payments/exampleCapturePayment';
import exampleCreateRefund from './server/infra/reaction/payments/exampleCreateRefund';
import exampleListRefunds from './server/infra/reaction/payments/exampleListRefunds';
import authorizeTransactionReaction from './server/infra/reaction/payments/authorizeTransactionReaction';
import SimpleSchema from 'simpl-schema';

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: 'UnboxPay',
    name: 'unboxpay-payments',
    icon: 'fa fa-credit-card-alt',
    autoEnable: true,
    collections: {
      UnboxPayCustomer: {
        name: 'UnboxPayCustomer'
      }
    },
    graphQL: {
      schemas
    },
    functionsByType: {
      startup: [startup]
    },
    paymentMethods: [
      {
        name: 'unboxpay_credit',
        displayName: 'UnboxPay Credit Card',
        functions: {
          capturePayment: exampleCapturePayment,
          createAuthorizedPayment: authorizeTransactionReaction,
          createRefund: exampleCreateRefund,
          listRefunds: exampleListRefunds
        }
      },
      {
        name: 'unboxpay_boleto',
        displayName: 'UnboxPay Boleto',
        functions: {
          capturePayment: exampleCapturePayment,
          createAuthorizedPayment: authorizeTransactionReaction,
          createRefund: exampleCreateRefund,
          listRefunds: exampleListRefunds
        }
      }
    ],
    registry: [
      // Settings panel
      {
        label: 'Unbox Pay', // this key (minus spaces) is used for translations
        provides: ['paymentSettings'],
        container: 'dashboard',
        template: 'UnboxPaySettingsFormContainer'
      }
    ],
    shopSettingsConfig: {
      unboxPayPluginSellerId: {
        defaultValue: 'sellerIdTeste',
        simpleSchema: {
          type: String
        },
        permissionsThatCanEdit: ['reaction:legacy:shops/update']
      }
    }
  });
}
