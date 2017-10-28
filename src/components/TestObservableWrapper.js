import React from "react";
import observer from "../utils/observer";
import {Observable} from 'rxjs/Rx';

const tickInterval = Observable.interval(1000);

@observer
class TestObservableWrapper extends React.Component {
  static defaultProps = {
    count: 0
  };

  componentWillMount() {
    this.props.subscribe({
      count: tickInterval
    })
  }

  render() {
    return <div>{this.props.count}</div>;
  }
}

export default TestObservableWrapper;
