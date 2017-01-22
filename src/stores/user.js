import Store from "../store";
import {client} from "../config";

class UserStore extends Store {
  constructor() {
    super();

    this.hasSession = false;
    this.name = "";
    this.password = "";
    this.token = "";
  }

  async register(username, password) {
    const res = await client.post("/user", {
      body: {
        username: this.name,
        email: "",
        password: this.password,
      }
    });

    if (res.ok) {
      this.login();
    }
  }

  async login() {
    const res = await client.post("/session", {
      body: {
        username: this.name,
        password: this.password,
      }
    });

    if (res.ok) {
      this.token = res.body.token;
      this.hasSession = true;

      this.dispatch();
    }
  }
}

export default new UserStore();
