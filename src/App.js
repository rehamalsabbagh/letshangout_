import React from 'react';
import { observer } from 'mobx-react';
import Container from './components/atoms/Container/Container';
import PageTemplate from './components/templates/PageTemplate/PageTemplate';
import Header from './components/organisms/Header/Header';
import SignUpIn from './components/organisms/SignUpIn/SignUpIn';
import { useAppContext } from './context';
import CentralPage from './components/templates/CentralPage/CentralPage';
import { Switch, Route, withRouter } from 'react-router-dom';

import './App.css';
import UserPage from './components/templates/UserPage/UserPage';

function App() {
  let { usersStore } = useAppContext();

  return (
    <Container className={'App'} dir={'ltr'}>
      {usersStore.authUser && (
        <PageTemplate
          header={<Header />}
          body={
            <Switch>
              <Route
                exact={true}
                path={'/'}
                render={() => <React.Fragment />}
              />
              <Route
                exact={true}
                path={'/:username'}
                render={() => <UserPage user={usersStore.authUser} />}
              />
            </Switch>
          }
        />
      )}
      {!usersStore.authUser && <CentralPage body={<SignUpIn />} />}
    </Container>
  );
}

export default withRouter(observer(App));
