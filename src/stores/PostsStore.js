import { decorate, observable } from 'mobx';
import firebase from 'firebase';
import { DEFAULT_FIELD_VALUE } from './constants/FormConstants';
import FormUtil from './utils/FormUtil';
const empty_err_msg = 'The highlighted fields are requirerd';
class PostsStore {
  constructor() {
    this.errorMessages = [];
    this.posts = null;
    this.clearForm();
  }

  clearErrorMessages() {
    this.errorMessages = [];
    FormUtil.clearErrorMessages(this.user);
  }

  clearForm() {
    this.post = {
      image: DEFAULT_FIELD_VALUE,
      name: DEFAULT_FIELD_VALUE,
      date: DEFAULT_FIELD_VALUE,
      time: DEFAULT_FIELD_VALUE,
      location: DEFAULT_FIELD_VALUE,
    };
  }

  onChange(key, value) {
    FormUtil.clearError(this.post[key]);
    FormUtil.storeValue(this.post[key], value);
  }

  addErrorMessage(message) {
    this.errorMessages = FormUtil.addToArray(this.errorMessages, message);
  }

  addPost(userkey, callback) {
    this.clearErrorMessages();
    let _isAllFilled = FormUtil.isAllFilled(this.post);
    if (!_isAllFilled) this.addErrorMessage(empty_err_msg);
    if (_isAllFilled)
      firebase
        .database()
        .ref('/posts/' + userkey)
        .push(
          {
            image: this.post.image.value,
            name: this.post.name.value,
            date: this.post.date.value,
            time: this.post.time.value,
            location: this.post.location.value,
          },
          () => {
            if (callback) callback();
          }
        );
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
  errorMessages: observable,
});

export default new PostsStore();
