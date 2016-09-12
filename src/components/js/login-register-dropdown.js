import LoginRegisterDropdown from "../monk/login-register-dropdown.monk";
import sessionStore from "../../stores/session";
import directives from "monkberry-directives";

export default class extends LoginRegisterDropdown {
  constructor() {
    super();

    this.directives = directives

    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.update(this.state);
  }

  handleClick(event) {
    this.state.open = !this.state.open;
    this.update(this.state);
  }

  checkConfirm() {
    if (!this.state.register) return true;
    const a = document.getElementById("password").value;
    const b = document.getElementById("confirm-password").value;
    return a !== "" && a === b;
  }

  onSubmit() {
    const username = document.getElementById("username").value;
    if (this.checkConfirm() && username !== "") {
      const action = this.state.register ? "register" : "login";
      const password = document.getElementById("password").value;
      sessionStore[action](username, password);
    }
  }
}
