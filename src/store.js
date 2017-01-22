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
      const kept = (obs.props || []).reduce((accum, prop) => {
        if (prop in this) {
          accum[prop] = this[prop];
        }
        return accum;
      }, {});
      if (Object.keys(kept).length > 0) {
        obs.cb(kept);
      }
    });
  }

  proxy() {
    const handler = {
      set: function(target, name, value) {
        if (name in target) {
          target[name] = value;
          target.dispatch();
          return true;
        } else {
          throw new Error(`Target store has no prop ${name}`);
        }
      }
    }
    return new Proxy(this, handler);
  }
};
