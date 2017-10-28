import React from 'react';
import {autobind} from "core-decorators";

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import Kermit from "../media/images/kermit.jpg";

import LoginDialog from "../components/LoginDialog";
import RegisterDialog from "../components/RegisterDialog";

import observer from '../utils/observer';
import {session} from '../observables/session';

@observer
@autobind
class AppBar extends React.Component {
  static defaultProps = {
    session: {hasSession: false}
  };

  constructor(props) {
    super(props);

    this.props.subscribe({session});

    this.state = {loginDialogOpen: false, registerDialogOpen: false};
  }

  handleCloseForLogin() {
    this.setState({loginDialogOpen: false});
  }

  handleCloseForRegister() {
    this.setState({registerDialogOpen: false});
  }

  handleClickForLogin() {
    this.setState(prevState => ({loginDialogOpen: !prevState.loginDialogOpen}));
  }

  handleClickForRegister() {
    this.setState(prevState => ({registerDialogOpen: !prevState.registerDialogOpen}));
  }

  render() {
    const loginRegisterStyle = {margin: 8};

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Avatar src={Kermit} size={38} style={{margin: 5}}/>
            <ToolbarTitle text={this.props.session.username || "bit.dj"} style={{color: "#303030"}} />
          </ToolbarGroup>
          <ToolbarGroup>
            <div style={this.props.session.hasSession ? {display: 'none'} : {}}>
              <RaisedButton
                label="LOGIN"
                style={loginRegisterStyle}
                onClick={this.handleClickForLogin}
              />
              <RaisedButton
                label="REGISTER"
                style={loginRegisterStyle}
                onClick={this.handleClickForRegister}
              />
            </div>
          </ToolbarGroup>
        </Toolbar>
        <LoginDialog
          open={(!this.props.session.hasSession) && this.state.loginDialogOpen}
          onClose={this.handleCloseForLogin}
        />
        <RegisterDialog
          open={(!this.props.session.hasSession) && this.state.registerDialogOpen}
          onClose={this.handleCloseForRegister}
        />
      </div>
    );
  }
}

export default AppBar;
