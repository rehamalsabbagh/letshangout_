import { decorate, observable } from 'mobx';
import firebase from 'firebase';
import FormUtil from './utils/FormUtil';
class SignUpStore {
  constructor(usersStore) {
    this.user = { username: '', email: '', password: '', confirm_password: '' };
    this.valid = true;
    this.usersStore = usersStore;
  }

  onChange(key, value) {
    this.user[key] = FormUtil.removeSpaces(value);
  }

  isPasswordsMatch() {
    return this.user.password === this.user.confirm_password;
  }

  singUp(callBack) {
    if (
      FormUtil.isAllFilled(this.user) &&
      !this.usersStore.retriveUser(this.user.username) &&
      this.isPasswordsMatch()
    ) {
      firebase.database().ref('/users').push(this.user);
      setTimeout(() => {
        this.usersStore.getUsers();
        setTimeout(() => {
          if (callBack) callBack();
        }, 500);
      }, 2000);
    }
  }
}
decorate(SignUpStore, {
  user: observable,
});
export default SignUpStore;
