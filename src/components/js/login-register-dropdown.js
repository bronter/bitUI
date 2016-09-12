import LoginRegisterDropdown from "../monk/login-register-dropdown.monk";
import sessionStore from "../../stores/session";
import directives from "monkberry-directives";
import {autobind} from "core-decorators";

export default class extends LoginRegisterDropdown {
  constructor() {
    super();

    this.directives = directives;

    this.state = {
      open: false,
    };

    this.update(this.state);
  }

  @autobind
  handleClick(event) {
    this.state.open = !this.state.open;
    this.update(this.state);
  }

  @autobind
  handleChangeForUsername(event) {
    this.state.username = event.target.value;
  }

  @autobind
  handleChangeForPassword(event) {
    this.state.password = event.target.value;
  }

  @autobind
  handleChangeForConfirmPassword(event) {
    this.state.confirmPassword = event.target.value;
  }

  checkConfirm() {
    if (!this.state.register) return true;
    const a = this.state.password;
    const b = this.state.confirmPassword;
    return a !== "" && a === b;
  }

  @autobind
  onSubmit() {
    const username = this.state.username;
    if (this.checkConfirm() && username !== "") {
      const action = this.state.register ? "register" : "login";
      const password = this.state.password;
      sessionStore[action](username, password);
    }
  }
}
