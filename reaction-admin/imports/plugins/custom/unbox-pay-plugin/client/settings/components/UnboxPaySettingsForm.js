import React, { useState } from 'react';
import { TextField, Translation } from '/imports/plugins/core/ui/client/components';
import PropTypes from 'prop-types';
import { Components } from '@reactioncommerce/reaction-components';

const handleSubmit = (props, e, sellerId) => {
  e.preventDefault();

  const { onSubmit } = props;

  return onSubmit(sellerId);
};

const UnboxPaySettingsForm = props => {
  const { settings, isLoadingPaymentShopSettings } = props;
  const { unboxPayPluginSellerId } = settings || {};

  const [sellerId, setSellerId] = useState(unboxPayPluginSellerId);

  if (isLoadingPaymentShopSettings) return <Components.Loading />;

  return (
    <div>
      {!sellerId && (
        <div className="alert alert-info">
          <Translation
            defaultValue="UnboxPay Credentials"
            i18nKey="admin.paymentSettings.exampleCredentials"
          />
        </div>
      )}
      <form onSubmit={e => handleSubmit(props, e, sellerId)}>
        <TextField
          label="Seller ID"
          name="sellerId"
          type="text"
          onChange={e => setSellerId(e.target.value)}
          value={sellerId}
        />

        <button className="btn btn-primary pull-right" type="submit">
          <Translation defaultValue="Save Changes" i18nKey="app.saveChanges" />
        </button>
      </form>
    </div>
  );
};

UnboxPaySettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default UnboxPaySettingsForm;
