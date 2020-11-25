import { decorate, observable } from 'mobx';
import firebase from 'firebase';
import { DEFAULT_FIELD_VALUE } from './constants/FormConstants';
class PostsStore {
  constructor() {
    this.posts = null;
    this.clearForm();
  }

  clearForm() {
    this.post = {
      image: DEFAULT_FIELD_VALUE,
      date: DEFAULT_FIELD_VALUE,
      time: DEFAULT_FIELD_VALUE,
      location: DEFAULT_FIELD_VALUE,
      description: DEFAULT_FIELD_VALUE,
    };
  }

  onChange(key, value) {
    this.post[key].value = value;
  }

  addPost(userkey) {
    firebase
      .database()
      .ref('/posts/' + userkey)
      .push({
        image: this.post.image.value,
        date: this.post.date.value,
        time: this.post.time.value,
        location: this.post.location.value,
        description: this.post.description.value,
      });
  }

  getUserPosts(userkey) {
    let _this = this;
    if (_this.posts === null)
      firebase
        .database()
        .ref()
        .once('value')
        .then(function (snapshot) {
          if (snapshot.val() && snapshot.val().posts[userkey]) {
            _this.posts = snapshot.val().posts[userkey];
          }
        });
  }
}

decorate(PostsStore, {
  posts: observable,
  post: observable,
});

export default new PostsStore();
