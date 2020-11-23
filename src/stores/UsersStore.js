import { decorate, observable } from 'mobx';
import config from '../firebase/config';
import firebase from 'firebase';
firebase.initializeApp(config);

class UsersStore {
  constructor() {
    this.users = {};
  }

  retriveUser(username) {
    let _user = false;
    for (var key in this.users) {
      if (this.users[key].username === username)
        _user = { ...this.users[key], ...{ key: key } };
    }
    return _user;
  }

  getUsers() {
    let _this = this;
    firebase
      .database()
      .ref()
      .once('value')
      .then(function (snapshot) {
        if (snapshot.val().users) {
          _this.users = snapshot.val().users;
        }
      });
  }
}
decorate(UsersStore, {
  users: observable,
});

let usersStore = new UsersStore();
usersStore.getUsers();
export default usersStore;
