import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import shopSettingsQuery from './shopSettingsQuery';

const withUnboxPayShopSettings = Component =>
  class UnboxPayShopSettingsQuery extends React.Component {
    static propTypes = {
      shopId: PropTypes.string
    };

    render() {
      const { shopId } = this.props;
      if (!shopId) return null;

      return (
        <Query query={shopSettingsQuery} variables={{ shopId }}>
          {({ loading, data }) => {
            const props = {
              ...this.props,
              shopId,
              isLoadingPaymentShopSettings: loading
            };

            if (!loading && data) {
              props.settings = data.shopSettings;
            }

            return <Component {...props} />;
          }}
        </Query>
      );
    }
  };

export default withUnboxPayShopSettings;
