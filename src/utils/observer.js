import React from "react";

export default function observer(WrappedComponent) {
  return class extends React.Component {
    constructor() {
      super();
      this.subscribe = this.subscribe.bind(this);
      this.unsubscribe = this.unsubscribe.bind(this);
      this.unsubscribeAll = this.unsubscribeAll.bind(this);
      this.state = {
        mapPropsToObservables: {},
        observableNextProps: {},
        observableErrorProps: {},
        observableCompleteProps: {}
      };
    }

    handleNextForObservable(obsProp, nextValue) {
      this.setState(prevState => {
        return {
          observableNextProps: {...prevState.observableNextProps, [obsProp]: nextValue}
        };
      });
    }

    handleErrorForObservable(obsProp, err) {
      console.log("Error: ", obsProp, err);
      this.setState((prevState, props) => ({
        observableErrorProps: {...prevState.observableProps, [obsProp + "Error"]: err}
      }));
    }

    handleCompleteForObservable(obsProp) {
      console.log("complete: ", obsProp);
      this.setState((prevState, props) => ({
        observableNextProps: {...prevState.observableProps, [obsProp + "Complete"]: true}
      }));
    }

    subscribe(mapPropsToObservables) {
      const newPropsToObservables = Object.keys(mapPropsToObservables).reduce((accum, curr) => ({
        ...accum,
        [curr]: {
          observable: mapPropsToObservables[curr],
          subscription: mapPropsToObservables[curr].subscribe({
            next: this.handleNextForObservable.bind(this, curr),
            error: this.handleErrorForObservable.bind(this, curr),
            complete: this.handleCompleteForObservable.bind(this, curr)
          })
        }
      }), {});

      this.setState(prevState => ({
        mapPropsToObservables: newPropsToObservables
      }));
    }

    unsubscribe(propName) {
      this.state.mapPropsToObservables[propName].subscription.unsubscribe();
      this.setState(prevState => ({
        mapPropsToObservables: {...this.state.mapPropsToObservables, [propName]: null},
        observableNextProps: {...this.state.observableNextProps, [propName]: null},
        observableErrorProps: {...this.state.observableErrorProps, [propName]: null},
        observableCompleteProps: {...this.state.observableCompleteProps, [propName]: null}
      }));
    }

    unsubscribeAll() {
      Object.keys(this.state.mapPropsToObservables).forEach(prop => this.state.mapPropsToObservables[prop].subscription.unsubscribe());
    }

    componentWillUnmount() {
      this.unsubscribeAll();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          subscribe={this.subscribe}
          unsubscribe={this.unsubscribe}
          {...this.state.observableNextProps}
          {...this.state.observableErrorProps}
          {...this.state.observableCompleteProps}
        />
      )
    }
  }
};
