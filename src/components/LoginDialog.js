import React from 'react';
import {autobind} from 'core-decorators';

import TextField from 'material-ui/TextField';

import CloseSubmitDialog from './CloseSubmitDialog';

import observer from '../utils/observer';

import {
  usernameObs, passwordObs,
  usernameChanged, passwordChanged,
  usernameValidate, passwordValidate, loginFormValidate,
  doLogin
} from '../observables/session';

@observer
@autobind
class LoginDialog extends React.Component {
  constructor(props) {
    super(props);

    this.props.subscribe({
      username: usernameObs,
      usernameValidate,
      passwordValidate,
      usernameChanged,
      passwordChanged,
      password: passwordObs,
      formValid: loginFormValidate
    });
  }

  handleChangeForUsername(evt, newValue) {
    usernameObs.next(newValue);
  }

  handleChangeForPassword(evt, newValue) {
    passwordObs.next(newValue);
  }

  handleClickForSubmit() {
    if (this.props.formValid) {
      doLogin(this.props.username, this.props.password);
    }
  }

  render() {
    return (
      <CloseSubmitDialog
        title="Login"
        open={this.props.open}
        onClose={this.props.onClose}
        onSubmit={this.handleClickForSubmit}
        submitEnabled={this.props.formValid}
      >
        <TextField
          name="username"
          hintText="User Name"
          floatingLabelText="User Name"
          fullWidth
          onChange={this.handleChangeForUsername}
          errorText={this.props.usernameChanged && this.props.usernameValidate}
          value={this.props.username}
        />
        <br />
        <TextField
          name="password"
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          fullWidth
          onChange={this.handleChangeForPassword}
          errorText={this.props.passwordChanged && this.props.passwordValidate}
          value={this.props.password}
        />
      </CloseSubmitDialog>
    );
  }
}

export default LoginDialog;
