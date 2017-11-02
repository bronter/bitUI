import React from 'react';

import observer from '../utils/observer';

import {messageChannel} from "../observables/channel";

@observer
class Channel extends React.Component {
  componentWillMount() {
    messageChannel(this.props.match.params.channelName, "wew laddy");
  }

  render() {
    return null;
  }
}

export default Channel;
