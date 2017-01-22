export default class Store {
  constructor() {
    this.observers = [];
  }

  registerObserver(props, cb) {
    if (cb == null) throw new Error("Tried to register observer without a callback");
    this.observers.push({props, cb});
  }

  dispatch() {
    this.observers.map((obs) => {
      if (obs.props == null || name in obs.props) {
        obs.cb({[name]: value});
      }
    });
  }

  proxy() {
    const handler = {
      set: function(target, name, value) {
        if (name in target) {
          target[name] = value;
          target.dispatch();
          return value;
        } else {
          throw new Error(`Target store has no prop ${name}`);
        }
      }
    }
    return new Proxy(this, handler);
  }
};
