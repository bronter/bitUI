import React from "react";
import cx from "classnames";
import {autobind} from "core-decorators";
import userStore from "../stores/user";

const userProxy = userStore.proxy();

export default class LoginRegisterDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
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
  }

  @autobind
  handleSubmit() {
    userProxy.submit();
  }

  render() {
    return (
      <div className={cx("dropdown login-register-dropdown", this.props.className)}>
        <div onClick={this.handleClick} className="item">
          {this.props.register ? "Register" : "Login"}
        </div>
        <div
          className={cx("content", {hidden: !this.state.open})}>
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
            className={cx({hidden: this.props.register})}
            type="password" id="confirm-password"
            placeholder="Confirm Password"
          />
          <input onClick={this.handleSubmit} value="Submit" type="button" />
        </div>
      </div>
    );
  }
};
