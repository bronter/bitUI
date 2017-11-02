import React from 'react';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import KermitTea from '../media/images/kermit_tea.jpg';

import {createChannel, channelNameObs, channelNameValid} from "../observables/socket.js";
import {session} from '../observables/session';
import {channelListObs, getChannels} from "../observables/channel";
import observer from '../utils/observer';

const Tile = props => (
  <Paper zDepth={3} style={{
    height: 200, width: 300,
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: `url(${KermitTea})`
  }} onClick={props.onClick}>
    {props.children}
  </Paper>
);

@observer
@autobind
class ChannelListing extends React.Component {
  static defaultProps = {channelName: "", session: {hasSession: false}, channels: []};
  constructor(props) {
    super(props);

    this.props.subscribe({
      channelName: channelNameObs,
      channelNameValid,
      session,
      channels: channelListObs
    });
  }

  componentWillMount() {
    getChannels();
  }

  handleChangeForChannelName(evt, newValue) {
    channelNameObs.next(newValue);
  }

  handleClickForNewChannel() {
    createChannel(this.props.channelName, this.props.session.token);
  }

  render() {
    console.log(this.props.channels);
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {this.props.session.hasSession && <Tile>
          <TextField
            name="channelName"
            onChange={this.handleChangeForChannelName}
            style={{maxWidth: 136, backgroundColor: "rgba(0, 0, 0, 0.3)"}}
            value={this.props.channelName}
          />
          <RaisedButton
            label="NEW CHANNEL"
            disabled={!this.props.channelNameValid}
            onClick={this.handleClickForNewChannel}
          />
        </Tile>}
        {this.props.channels.map(channel => (
          <Link key={channel} to={`/channels/${channel}`}>
            <Tile>{channel}</Tile>
          </Link>
        ))}
      </div>
    );
  }
}

export default ChannelListing;
