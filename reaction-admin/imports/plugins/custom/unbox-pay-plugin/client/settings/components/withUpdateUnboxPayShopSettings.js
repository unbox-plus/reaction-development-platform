import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import shopSettingsQuery from './shopSettingsQuery';

const updateUnboxPayShopSettingsMutation = gql`
  mutation updateUnboxPayShopSettingsMutation($input: UpdateShopSettingsInput!) {
    updateShopSettings(input: $input) {
      shopSettings {
        unboxPayPluginSellerId
      }
    }
  }
`;

export default Component =>
  class WithUpdateUnboxPayShopSettings extends React.Component {
    static propTypes = {
      shopId: PropTypes.string.isRequired
    };

    render() {
      const { shopId } = this.props;

      return (
        <Mutation
          mutation={updateUnboxPayShopSettingsMutation}
          update={(cache, { data: { updateShopSettings } }) => {
            if (updateShopSettings && updateShopSettings.shopSettings) {
              cache.writeQuery({
                query: shopSettingsQuery,
                variables: {
                  shopId
                },
                data: {
                  shopSettings: { ...updateShopSettings.shopSettings }
                }
              });
            }
          }}
        >
          {updateInventoryShopSettings => (
            <Component {...this.props} onSubmit={updateInventoryShopSettings} />
          )}
        </Mutation>
      );
    }
  };
