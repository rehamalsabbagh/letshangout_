import { decorate, observable } from 'mobx';
import firebase from 'firebase';
class SignUpStore {
  constructor([{ usersStore }, props]) {
    this.user = { username: '', email: '', password: '', confirm_password: '' };
    this.valid = true;
    this.usersStore = usersStore;
  }
  onChange(key, value) {
    this.user[key] = value.replace(/\s/g, '');
  }

  isAllFilled(obj) {
    let _isAllFilled = true;
    for (var key in obj) {
      _isAllFilled = _isAllFilled && obj[key] !== '';
    }
    return _isAllFilled;
  }

  isPasswordsMatch() {
    return this.user.password === this.user.confirm_password;
  }

  isUsernameExist() {
    let _isUsernameExist = false;
    let _users = this.usersStore.users;
    for (var key in _users) {
      _isUsernameExist =
        _isUsernameExist || _users[key].username === this.user.username;
    }
    return _isUsernameExist;
  }

  singUp() {
    if (
      this.isAllFilled(this.user) &&
      this.isPasswordsMatch() &&
      !this.isUsernameExist()
    )
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
