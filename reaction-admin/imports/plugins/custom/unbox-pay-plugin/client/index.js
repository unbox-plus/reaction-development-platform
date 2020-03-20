import './settings/templates/unboxPay';
import { registerBlock } from '/imports/plugins/core/components/lib';

const MyExtraProductFields = props => '<div>custom things...</div>';

registerBlock({
  label: 'UnboxPay',
  name: 'unboxpay-payments',
  region: 'PaymentSettings',
  component: MyExtraProductFields
  // template: 'unboxPaySettings'
});
