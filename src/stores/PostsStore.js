import { decorate, observable } from 'mobx';
import firebase from 'firebase';
import { DEFAULT_FIELD_VALUE } from './constants/FormConstants';
import FormUtil from './utils/FormUtil';
class PostsStore {
  constructor() {
    this.posts = {};
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
    console.log(value);
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
}

decorate(PostsStore, {
  posts: observable,
  post: observable,
});

export default new PostsStore();
