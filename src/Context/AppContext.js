import React, { useContext } from 'react';
import usersStore from '../stores/UsersStore';
import SignUpStore from '../stores/SignUpStore';
import SignInStore from '../stores/SignInStore';

const AppContext = React.createContext({
  usersStore: usersStore,
  signUpStore: new SignUpStore(usersStore),
  signInStore: new SignInStore(usersStore),
});

export const useAppContext = () => useContext(AppContext);
