import React from 'react';
import { observer } from 'mobx-react';
import Container from './components/atoms/Container/Container';
import PageTemplate from './components/templates/PageTemplate/PageTemplate';
import Header from './components/organisms/Header/Header';
import CentralPage from './components/organisms/CentralPage/CentralPage';
import SignUpIn from './components/organisms/SignUpIn/SignUpIn';
import './App.css';
import { useAppContext } from './context';
import Popup from './components/atoms/Popup/Popup';

function App() {
  let { signInStore } = useAppContext();

  return (
    <Container className={'App'} dir={'ltr'}>
      <Popup />
      {signInStore.authenticated && (
        <PageTemplate header={<Header />} body={null} />
      )}
      {!signInStore.authenticated && <CentralPage body={<SignUpIn />} />}
    </Container>
  );
}

export default observer(App);
