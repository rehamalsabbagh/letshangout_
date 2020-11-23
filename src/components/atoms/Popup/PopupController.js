import React from 'react';
import ComposeUtil from '../../../utils/ComposeUtil';
import { decorate, observable } from 'mobx';

class PopupController {
  constructor() {
    this.state = 'close';
    this.child = <React.Fragment />;
  }

  setState(args) {
    this.state = args.state;
    this.child = ComposeUtil.composeComponent(args.child);
  }
}

decorate(PopupController, {
  state: observable,
  child: observable,
});

export default new PopupController();
