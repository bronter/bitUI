import React from 'react';
import {autobind} from 'core-decorators';

import CloseSubmitDialog from './CloseSubmitDialog';
import TextField from 'material-ui/TextField';

import observer from '../utils/observer';

import {
  usernameObs, emailObs, passwordObs, confirmPasswordObs,
  usernameChanged, passwordChanged, confirmPasswordChanged,
  usernameValidate, passwordValidate, confirmPasswordValidate, registerFormValidate,
  doRegister
} from '../observables/session';

@observer
@autobind
class RegisterDialog extends React.Component {
  constructor(props) {
    super(props);

    this.props.subscribe({
      username: usernameObs,
      email: emailObs,
      password: passwordObs,
      confirmPassword: confirmPasswordObs,
      usernameChanged,
      passwordChanged,
      confirmPasswordChanged,
      usernameValidate,
      passwordValidate,
      confirmPasswordValidate,
      formValid: registerFormValidate
    });
  }

  handleChangeForUsername(evt, nextValue) {
    usernameObs.next(nextValue);
  }

  handleChangeForEmail(evt, nextValue) {
    emailObs.next(nextValue);
  }

  handleChangeForPassword(evt, nextValue) {
    passwordObs.next(nextValue);
  }

  handleChangeForConfirmPassword(evt, nextValue) {
    confirmPasswordObs.next(nextValue);
  }

  handleClickForSubmit() {
    if (this.props.formValid) {
      doRegister(this.props.username, this.props.email, this.props.password);
    }
  }

  render() {
    return (
      <CloseSubmitDialog
        title="register"
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
          errorText={this.props.usernameChanged && this.props.usernameValidate}
          onChange={this.handleChangeForUsername}
        />
        <br />
        <TextField
          name="email"
          hintText="Email (optional)"
          floatingLabelText="Email (optional)"
          fullWidth
          onChange={this.handleChangeForEmail}
        />
        <br />
        <TextField
          name="password"
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          fullWidth
          errorText={this.props.passwordChanged && this.props.passwordValidate}
          onChange={this.handleChangeForPassword}
        />
        <br />
        <TextField
          name="confirmpassword"
          hintText="Confirm Password"
          floatingLabelText="Confirm Password"
          type="password"
          fullWidth
          errorText={this.props.confirmPasswordChanged && this.props.confirmPasswordValidate}
          onChange={this.handleChangeForConfirmPassword}
        />
      </CloseSubmitDialog>
    );
  }
}

export default RegisterDialog;
