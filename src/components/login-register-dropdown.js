import React from "react";
import cx from "classnames";
import {autobind} from "core-decorators";
import userStore from "../stores/user";
import Dropdown from "./dropdown";

const userProxy = userStore.proxy();

export default class LoginRegisterDropdown extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    password: React.PropTypes.string,
    register: React.PropTypes.bool,
  }

  static defaultProps = {
    className: "",
    name: "",
    password: "",
    register: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      password: "",
    };
  }

  @autobind
  handleClick() {
    this.setState({open: !this.state.open});
  }

  @autobind
  handleChangeForUsername(event) {
    userProxy.name = event.target.value;
  }

  @autobind
  handleChangeForPassword(event) {
    userProxy.password = event.target.value;
  }

  @autobind
  handleChangeForConfirmPassword(event) {
    this.setState({password: event.target.value});
  }

  @autobind
  handleSubmit() {
    userProxy[this.props.register ? "register" : "login" ]();
  }

  render() {
    const name = this.props.name;
    const pw = this.props.password;
    const pwConfirm = this.state.password;
    const blankPw = pw.length === 0 || (this.props.register && pwConfirm.length === 0)
    const blankField = blankPw || name.length === 0;
    const pwMismatch = this.props.register && (!blankPw) && pw !== pwConfirm;

    return (
      <Dropdown
        className={cx("login-register-dropdown", this.props.className)}
        label={this.props.register ? "Register" : "Login"}
      >
        <input
          onChange={this.handleChangeForUsername}
          type="text"
          placeholder="Username"
          id="username"
        />
        <input
          onChange={this.handleChangeForPassword}
          type="password"
          id="password"
          placeholder="Password"
        />
        <input
          onChange={this.handleChangeForConfirmPassword}
          className={cx({hidden: !this.props.register})}
          type="password" id="confirm-password"
          placeholder="Confirm Password"
        />
        <span className={cx("error-span", {hidden: !pwMismatch})}>
          Passwords do not match
        </span>
        <input onClick={this.handleSubmit} value="Submit" type="button" disabled={blankField || pwMismatch} />
      </Dropdown>
    );
  }
};
