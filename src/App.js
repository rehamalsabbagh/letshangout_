import React from 'react';
import { observer } from 'mobx-react';
import Container from './components/atoms/Container/Container';
import PageTemplate from './components/templates/PageTemplate/PageTemplate';
import Header from './components/organisms/Header/Header';
import SignUpIn from './components/organisms/SignUpIn/SignUpIn';
import { useAppContext } from './context';
import CentralPage from './components/templates/CentralPage/CentralPage';
import './App.css';
import UserPage from './components/templates/UserPage/UserPage';

function App() {
  let { signInStore } = useAppContext();

  return (
    <Container className={'App'} dir={'ltr'}>
      {signInStore.authenticated && (
        <PageTemplate header={<Header />} body={<UserPage />} />
      )}
      {!signInStore.authenticated && <CentralPage body={<SignUpIn />} />}
    </Container>
  );
}

export default observer(App);
