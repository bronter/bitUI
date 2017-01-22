import React from "react";
import cx from "classnames";
import {autobind} from "core-decorators";

export default class Dropdown extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    label: React.PropTypes.string,
  };

  static defaultProps = {
    className: "",
    label: "",
  };

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

  render() {
    return (
      <div className={cx("dropdown", this.props.className)}>
        <div onClick={this.handleClick} className="item">
          {this.props.label}
        </div>
        <div className={cx("content", {hidden: !this.state.open})}>
          {this.props.children}
        </div>
      </div>
    );
  }
};
