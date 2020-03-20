import React, { Component } from 'react';
import { TextField, Translation } from '/imports/plugins/core/ui/client/components';
import PropTypes from 'prop-types';

class UnboxPaySettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsState: {
        sellerId: props.settings.sellerId
      }
    };
  }

  handleStateChange(value, name = '') {
    const { settingsState } = this.state;
    settingsState[name] = value;
    this.setState({ settingsState });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { settingsState } = this.state;

    return onSubmit(settingsState);
  }

  render() {
    const { settings } = this.props;
    const { settingsState } = this.state;

    return (
      <div>
        {!settings.sellerId && (
          <div className="alert alert-info">
            <Translation
              defaultValue="UnboxPay Credentials"
              i18nKey="admin.paymentSettings.exampleCredentials"
            />
          </div>
        )}
        <form onSubmit={e => this.handleSubmit(e)}>
          <TextField
            label="Seller ID"
            name="sellerId"
            type="text"
            onChange={e => this.handleStateChange(e.target.value, 'sellerId')}
            value={settingsState.sellerId}
          />

          <button className="btn btn-primary pull-right" type="submit">
            <Translation defaultValue="Save Changes" i18nKey="app.saveChanges" />
          </button>
        </form>
      </div>
    );
  }
}

UnboxPaySettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default UnboxPaySettingsForm;
