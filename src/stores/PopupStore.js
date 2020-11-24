import React from 'react';
import { decorate, observable } from 'mobx';

class PopupStore {
  constructor() {
    this.state = 'close';
    this.child = <React.Fragment />;
  }

  setState(args) {
    this.state = args.state;
    this.child = args.child;
  }
}

decorate(PopupStore, {
  state: observable,
  child: observable,
});

export default new PopupStore();
