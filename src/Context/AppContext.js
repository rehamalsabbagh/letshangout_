import React, { useContext } from 'react';
import usersStore from '../stores/UsersStore';
import SignUpStore from '../stores/SignUpStore';
import SignInStore from '../stores/SignInStore';
import popupStore from '../stores/PopupStore';
import postsStore from '../stores/PostsStore';

const AppContext = React.createContext({
  popupStore: popupStore,
  usersStore: usersStore,
  postsStore: postsStore,
  signUpStore: new SignUpStore(usersStore),
  signInStore: new SignInStore(usersStore),
});

export const useAppContext = () => useContext(AppContext);
