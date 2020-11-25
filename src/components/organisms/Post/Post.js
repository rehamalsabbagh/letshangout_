import React from 'react';
import { observer } from 'mobx-react';
import Container from '../../atoms/Container/Container';
import Align from '../../atoms/Align/Align';

function Post() {
  return (
    <Container className={''}>
      <Align align={'start'}>{posts()}</Align>
    </Container>
  );
}

export default observer(Post);
