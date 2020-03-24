import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { composeWithTracker, registerComponent } from '@reactioncommerce/reaction-components';
import { Meteor } from 'meteor/meteor';
import { Packages } from '/lib/collections';
import { Reaction, i18next } from '/client/api';
import { UnboxPaySettingsForm } from '../components';

class UnboxPaySettingsFormContainer extends Component {
  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleSubmit(settings) {
    // const { packageData } = this.props;
    const packageId = 'unbox-pay-id';
    const name = 'unbox-pay-teste';
    // fields sent to the API
    const fields = [
      {
        property: 'sellerId',
        value: settings.sellerId
      }
    ];
    this.saveUpdate(packageId, name, fields);
  }

  saveUpdate(packageId, name, fields) {
    Meteor.call('registry/update', packageId, name, fields, error => {
      if (error) {
        return Alerts.toast(i18next.t('admin.settings.saveFailed'), 'error');
      }
      return Alerts.toast(i18next.t('admin.settings.saveSuccess'), 'success');
    });
  }

  render() {
    const { packageData } = this.props;

    return (
      <UnboxPaySettingsForm
        onChange={(name, value) => this.handleChange(name, value)}
        onSubmit={settings => this.handleSubmit(settings)}
        settings={{}}
      />
    );
  }
}

UnboxPaySettingsFormContainer.propTypes = {
  packageData: PropTypes.object
};

const composer = (props, onData) => {
  console.log('etapa 1');
  const shopId = Reaction.getShopId();
  console.log('etapa 2');
  const subscription = Meteor.subscribe('Packages', shopId);
  console.log('etapa 3');

  // if (subscription.ready()) {
  console.log('etapa 4');
  const packageData = Packages.findOne({
    name: 'unboxpay-payments',
    shopId: Reaction.getShopId()
  });
  console.log('etapa 5');
  onData(null, { packageData });
  // }
};

registerComponent(
  'UnboxPaySettingsFormContainer',
  UnboxPaySettingsFormContainer,
  composeWithTracker(composer)
);

export default UnboxPaySettingsFormContainer;
