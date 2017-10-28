import React from 'react';
import {autobind} from "core-decorators";

import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import KermitTea from '../media/images/kermit_tea.jpg';

import {createChannel, channelNameObs, channelNameValid} from "../observables/socket.js";
import observer from '../utils/observer';

@observer
@autobind
class ChannelListing extends React.Component {
  static defaultProps = {channelName: ""};
  constructor(props) {
    super(props);

    this.props.subscribe({
      channelName: channelNameObs,
      channelNameValid
    });
  }

  handleChangeForChannelName(evt, newValue) {
    channelNameObs.next(newValue);
  }

  render() {
    return (
      <GridList>
        <Paper zDepth={3} style={{
          height: 200, width: 300,
          margin: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: `url(${KermitTea})`
        }}>
          <TextField
            name="channelName"
            onChange={this.handleChangeForChannelName}
            style={{maxWidth: 136, backgroundColor: "rgba(0, 0, 0, 0.3)"}}
            value={this.props.channelName}
          />
          <RaisedButton label="NEW CHANNEL" disabled={!this.props.channelNameValid}/>
        </Paper>
      </GridList>
    );
  }
}

export default ChannelListing;
