import React from "react";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class CloseSubmitDialog extends React.Component {
  static defaultProps = {
    submitEnabled: true
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.onClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.props.onSubmit}
        disabled={!this.props.submitEnabled}
      />,
    ];

    return (
      <Dialog
        autoScrollBodyContent
        title={this.props.title}
        actions={actions}
        open={this.props.open}
        contentStyle={{maxWidth: '400px'}}
        onRequestClose={this.props.onClose}
      >
        {this.props.children}
      </Dialog>
    );
  }
}
