import { decorate, observable } from 'mobx';
import firebase from 'firebase';
import { useAppContext } from '../../../Context/AppContext';

class SignUpStore {
  constructor() {
    this.user = { username: '', email: '', password: '', confirm_password: '' };
    this.valid = true;
  }

  onChange(key, value) {
    this.user[key] = value;
    console.log(JSON.parse(JSON.stringify(this.user)));
  }

  singUp() {
    let _this = this;
    firebase
      .database()
      .ref('/users')
      .set({
        // users: {
        ...JSON.parse(JSON.stringify(useAppContext.usersStore.users)),
        ...{ [`${this.user.username}`]: this.user },
        // },
      });
    setTimeout(() => {
      useAppContext.usersStore.getUsers();
    }, 2000);
  }

  setCurrentUser() {}
}
decorate(SignUpStore, {
  user: observable,
});

let signUpStore = new SignUpStore();
export default signUpStore;
