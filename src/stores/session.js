import {observable} from "mobx";

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

  register(username, password) {
    console.log("register");
    this.username = username;
    this.hasSession = true;
  }

  login(username, password) {
    console.log("login");
    this.username = username;
    this.hasSession = true;
  }
}

export default new Session();
