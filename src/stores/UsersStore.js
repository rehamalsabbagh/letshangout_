import { decorate, observable } from 'mobx';
import config from '../firebase/config';
import firebase from 'firebase';
firebase.initializeApp(config);

class UsersStore {
  constructor() {
    this.users = {};
  }

  getUsers() {
    let _this = this;
    firebase
      .database()
      .ref()
      .once('value')
      .then(function (snapshot) {
        if (snapshot.val().users) {
          _this.users = snapshot.val().user;
          console.log(snapshot.val().users);
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
