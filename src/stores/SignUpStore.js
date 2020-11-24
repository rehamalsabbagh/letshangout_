import { decorate, observable } from 'mobx';
import firebase from 'firebase';
import FormUtil from './utils/FormUtil';
class SignUpStore {
  constructor(usersStore) {
    this.user = {
      username: { value: '', error: false },
      email: { value: '', error: false },
      password: { value: '', error: false },
      confirm_password: { value: '', error: false },
    };
    this.valid = true;
    this.usersStore = usersStore;
  }

  onChange(key, value) {
    this.user[key].value = FormUtil.removeSpaces(value);
  }

  isPasswordsMatch() {
    return this.user.password.value === this.user.confirm_password.value;
  }

  singUp(callBack) {
    if (
      FormUtil.isAllFilled(this.user) &&
      !this.usersStore.retriveUser(this.user.username.value) &&
      this.isPasswordsMatch()
    ) {
      firebase.database().ref('/users').push({
        username: this.username.value,
        password: this.password.value,
        email: this.email.value,
      });
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
