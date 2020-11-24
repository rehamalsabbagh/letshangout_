import { decorate, observable } from 'mobx';
import FormUtil from './utils/FormUtil';
import { DEFAULT_FIELD_VALUE } from './constants/FormConstants';

class SignInStore {
  constructor(usersStore) {
    this.usersStore = usersStore;
    this.authenticated = false;
    this.errorMessages = [];
    this.user = {
      username: DEFAULT_FIELD_VALUE,
      password: DEFAULT_FIELD_VALUE,
    };
  }

  onChange(key, value) {
    FormUtil.onChange(this.user[key], value);
  }

  addErrorMessage(message) {
    this.errorMessages = FormUtil.addToArray(this.errorMessages, message);
  }

  clearErrorMessages() {
    this.errorMessages = [];
    FormUtil.clearErrorMessages(this.user);
  }

  setUser(user) {
    this.user = user;
  }

  singIn() {
    const _user = this.usersStore.retriveUser(this.user.username.value);
    if (
      _user &&
      _user.password === this.user.password.value &&
      FormUtil.isAllFilled(this.user)
    ) {
      this.setUser(_user);
      this.authenticated = true;
    }
  }
}
decorate(SignInStore, {
  errorMessages: observable,
  authenticated: observable,
  user: observable,
});
export default SignInStore;
