import React from 'react';
import { observer } from 'mobx-react';
import Container from './components/atoms/Container/Container';
import PageTemplate from './components/templates/PageTemplate/PageTemplate';
import Header from './components/organisms/Header/Header';
import CentralPage from './components/organisms/CentralPage/CentralPage';
import SignUpIn from './components/organisms/SignUpIn/SignUpIn';
import './App.css';

// function store(value) {
//   console.log(value);
//   firebase
//     .database()
//     .ref()
//     .set({
//       kw: {
//         collect: JSON.stringify(value),
//       },
//     });
// }

function App() {
  let userExist = false;

  return (
    <Container className={'App'} dir={'ltr'}>
      {userExist && <PageTemplate header={<Header />} body={null} />}
      {!userExist && <CentralPage body={<SignUpIn />} />}
    </Container>
  );
}

export default observer(App);
