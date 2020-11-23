import React, { useContext } from 'react';
import usersStore from '../stores/UsersStore';

const AppContext = React.createContext({
  usersStore: usersStore,
});

export const useAppContext = () => useContext(AppContext);
