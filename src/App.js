import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import AppBar from "./components/AppBar";
import PageBackground from "./components/PageBackground";
import ChannelListing from "./components/ChannelListing";
import ChannelView from "./components/ChannelView";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <PageBackground style={{height: '100vh'}}>
          <AppBar />
          <Router>
            <div>
              <Route exact path="/" render={() => <Redirect to="/channels" />} />
              <Route exact path="/channels" component={ChannelListing} />
              <Route path="/channels/:channelName" component={ChannelView} />
            </div>
          </Router>
        </PageBackground>
      </MuiThemeProvider>
    );
  }
}

export default App;
