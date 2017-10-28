import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Background extends React.Component {
  render() {
    return (
      <div style={{backgroundColor: this.props.muiTheme.palette.canvasColor, color: this.props.muiTheme.palette.textColor, ...this.props.style}}>
        {this.props.children}
      </div>
    );
  }
}

export default muiThemeable()(Background);//dafaq
