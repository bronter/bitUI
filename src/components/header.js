import React from "react";
import cx from "classnames";
import Kermit from "../../media/images/kermit.jpg";

export default class Header extends React.Component {
  render() {
    const {name, hasSession, pic, title} = this.props;
    const imgAlt = `${name}'s profile pic'`;

    return (
      <div className="header">
        <div className={cx("pic-and-name", {hasSession})}>
          <img className="pic" src={pic || Kermit} alt={imgAlt}/>
          <span className={cx("name", {hidden: !hasSession})}>{name}</span>
        </div>
        <div className={cx("title", {"no-profile": hasSession})}>{title}</div>
      </div>
    );
  }
};
