import { decorate, observable } from 'mobx';
import FormUtil from './utils/FormUtil';

class SignInStore {
  constructor(usersStore) {
    this.user = { username: '', password: '' };
    this.signedin = false;
    this.usersStore = usersStore;
  }

  onChange(key, value) {
    this.user[key] = FormUtil.removeSpaces(value);
  }

  setUser(user) {
    this.user = user;
  }

  singIn() {
    const _user = this.usersStore.retriveUser(this.user.username);
    if (
      FormUtil.isAllFilled(this.user) &&
      _user &&
      _user.password === this.user.password
    ) {
      this.setUser(_user);
      this.signedin = true;
      console.log(_user);
      // console.log('success');
    }
  }
}
decorate(SignInStore, {
  user: observable,
  signedin: observable,
});
export default SignInStore;
