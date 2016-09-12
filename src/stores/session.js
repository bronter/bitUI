import {observable} from "mobx";
import {client} from "../config";
import config from "../config";

class Session {
  @observable username:string;
  @observable token:string;
  @observable pic:string;
  @observable hasSession:bool;

  constructor() {
    this.hasSession = false;
    this.username = "Kermit";
    this.token = "ainteasybeinggreen";
    this.pic = "";
  }

  async register(username, password) {
    this.username = username;
    let res = await client.post("/user", {
      body: {
        username,
        email: "",
        password,
      },
    });

    if (res.ok) {
      this.login(username, password);
    }
  }

  async login(username, password) {
    this.username = username;
    const res = await client.post("/session", {
      body: {
        username,
        password
      }
    });

    if (res.ok) {
      this.token = res.body.token;
      this.hasSession = true;
    }
  }
}

export default new Session();
