import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import AppBar from "./components/AppBar";
import PageBackground from "./components/PageBackground";
import ChannelListing from "./components/ChannelListing";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <PageBackground style={{height: '100vh'}}>
          <AppBar />
          <ChannelListing />
        </PageBackground>
      </MuiThemeProvider>
    );
  }
}

export default App;
