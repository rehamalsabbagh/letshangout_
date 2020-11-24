import { decorate, observable } from 'mobx';
import FormUtil from './utils/FormUtil';

class SignInStore {
  constructor(usersStore) {
    this.usersStore = usersStore;
    this.user = {
      username: { value: '', error: false },
      password: { value: '', error: false },
    };
  }

  onChange(key, value) {
    this.user[key].value = FormUtil.removeSpaces(value);
  }

  setUser(user) {
    this.user = user;
  }

  singIn() {
    const _user = this.usersStore.retriveUser(this.user.username.value);
    if (
      FormUtil.isAllFilled(this.user) &&
      _user &&
      _user.password === this.user.password.value
    ) {
      this.setUser(_user);
      this.signedin = true;
      console.log(_user);
    }
  }
}
decorate(SignInStore, {
  user: observable,
  signedin: observable,
});
export default SignInStore;
