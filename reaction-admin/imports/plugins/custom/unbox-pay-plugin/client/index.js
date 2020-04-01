import { registerBlock } from '/imports/plugins/core/components/lib';

import {
  UnboxPaySettingsForm,
  withUnboxPayShopSettings,
  withUpdateUnboxPayShopSettings
} from './settings/components';

registerBlock({
  label: 'UnboxPay',
  name: 'unboxpay-payments',
  region: 'PaymentSettings',
  component: UnboxPaySettingsForm,
  hocs: [withUnboxPayShopSettings, withUpdateUnboxPayShopSettings]
});
