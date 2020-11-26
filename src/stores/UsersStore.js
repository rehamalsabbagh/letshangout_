import { decorate, observable } from 'mobx';
import config from '../firebase/config';
import firebase from 'firebase';
firebase.initializeApp(config);

class UsersStore {
  constructor() {
    this.users = {};
    this.authUser = null;
  }

  retriveUser(username) {
    let _user = false;
    for (var key in this.users) {
      if (this.users[key].username === username)
        _user = { ...this.users[key], ...{ id: key } };
    }
    return _user;
  }

  getUserPosts(userId) {
    let _this = this;
    firebase
      .database()
      .ref('/posts/' + userId)
      .on('value', (snapshot) => {
        _this.posts = snapshot.val();
      });
  }

  getUsers() {
    let _this = this;
    firebase
      .database()
      .ref('/users')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          _this.users = snapshot.val();
          if (_this.authUser)
            _this.authUser = this.retriveUser(_this.authUser.username);
        }
      });
  }

  follow(userId) {
    firebase
      .database()
      .ref('/users/' + this.authUser.id + '/following')
      .push({
        user: userId,
      });
    firebase
      .database()
      .ref('/users/' + userId + '/followers')
      .push({
        user: this.authUser.id,
      });
  }

  unfollow(userId, followingId, followerId) {
    let followingRef = firebase
      .database()
      .ref('/users/' + this.authUser.id + '/following/' + followingId);
    followingRef.remove(() => {
      let followerRef = firebase
        .database()
        .ref('/users/' + userId + '/followers/' + followerId);
      followerRef.remove();
    });
  }
}
decorate(UsersStore, {
  users: observable,
  authUser: observable,
});

let usersStore = new UsersStore();
usersStore.getUsers();
export default usersStore;
