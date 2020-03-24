import './settings/templates/unboxPay';
import { registerBlock } from '/imports/plugins/core/components/lib';

import UnboxPaySettingsFormContainer from './settings/containers/UnboxPaySettingsFormContainer';

console.log('UnboxPaySettingsFormContainer', UnboxPaySettingsFormContainer);

registerBlock({
  label: 'UnboxPay',
  name: 'unboxpay-payments',
  region: 'PaymentSettings',
  component: UnboxPaySettingsFormContainer
});
