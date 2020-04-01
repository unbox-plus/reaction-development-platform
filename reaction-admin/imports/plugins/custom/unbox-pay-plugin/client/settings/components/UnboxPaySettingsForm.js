import React, { useState } from 'react';
import { TextField, Translation } from '/imports/plugins/core/ui/client/components';
import PropTypes from 'prop-types';
import { Components } from '@reactioncommerce/reaction-components';

const handleSubmit = (props, e, sellerId, shopId) => {
  e.preventDefault();

  const { onSubmit } = props;

  return onSubmit({
    variables: {
      input: {
        settingsUpdates: {
          unboxPayPluginSellerId: sellerId
        },
        shopId
      }
    }
  });
};

function UnboxPaySettingsForm(props) {
  const { settings, isLoadingPaymentShopSettings, shopId } = props;
  const { unboxPayPluginSellerId } = settings || {};

  if (isLoadingPaymentShopSettings) return <Components.Loading />;

  const [sellerId, setSellerId] = useState(unboxPayPluginSellerId);

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
      <form onSubmit={e => handleSubmit(props, e, sellerId, shopId)}>
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
}

UnboxPaySettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default UnboxPaySettingsForm;
