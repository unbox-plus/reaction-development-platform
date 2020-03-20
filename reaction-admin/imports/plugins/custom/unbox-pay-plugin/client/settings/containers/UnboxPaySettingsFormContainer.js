import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { composeWithTracker } from '@reactioncommerce/reaction-components';
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
    const { packageData } = this.props;
    const packageId = packageData._id;
    const { name } = packageData;
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
        settings={packageData.settings['unboxpay-payments']}
      />
    );
  }
}

UnboxPaySettingsFormContainer.propTypes = {
  packageData: PropTypes.object.isRequired
};

const composer = (props, onData) => {
  const shopId = Reaction.getShopId();
  const subscription = Meteor.subscribe('Packages', shopId);

  if (subscription.ready()) {
    const packageData = Packages.findOne({
      name: 'unboxpay-payments',
      shopId: Reaction.getShopId()
    });

    onData(null, { packageData });
  }
};

export default composeWithTracker(composer)(UnboxPaySettingsFormContainer);
