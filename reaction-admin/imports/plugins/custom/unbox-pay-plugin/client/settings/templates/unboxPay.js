import { Template } from 'meteor/templating';
import { UnboxPaySettingsFormContainer } from '../containers';
import './unboxPay.html';

Template.unboxPaySettings.helpers({
  UnboxPaySettings() {
    return {
      component: UnboxPaySettingsFormContainer
    };
  }
});
