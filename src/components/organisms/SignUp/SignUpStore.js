import { decorate, observable, toJS } from 'mobx';
import firebase from 'firebase';
class SignUpStore {
  constructor([{ usersStore }, props]) {
    this.user = { username: '', email: '', password: '', confirm_password: '' };
    this.valid = true;
    this.usersStore = usersStore;
  }
  onChange(key, value) {
    this.user[key] = value;
  }

  singUp() {
    // console.log(this.usersStore);
    firebase.database().ref('/users').push(this.user);
    setTimeout(() => {
      this.usersStore.getUsers();
    }, 2000);
  }
}
decorate(SignUpStore, {
  user: observable,
});
export default SignUpStore;
