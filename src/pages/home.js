import React from "react";
import cx from "classnames";

import Header from "../components/header";
import LoginRegisterDropdown from "../components/login-register-dropdown";

import userStore from "../stores/user";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: userStore.name,
      pic: userStore.pic,
      hasSession: userStore.hasSession,
    };

    userStore.registerObserver(["name", "pic", "hasSession"], (user) => {
      this.setState(user);
    })
  }
  render() {
    const username = this.state.name;
    const hasSession = this.state.hasSession;
    const pic = this.state.pic;
    const title = "bit.dj";

    return (
      <div className="home">
        <Header {...this.state} title={title}/>
        <div className="sidebar-and-content">
          <div className="sidebar">
            <LoginRegisterDropdown className={cx({hidden: hasSession})} register={false}/>
            <LoginRegisterDropdown className={cx({hidden: hasSession})} register={true} />
          </div>
          <div className="content">
            This is some real quality content. 10/10
          </div>
        </div>
      </div>
    );
  }
};
