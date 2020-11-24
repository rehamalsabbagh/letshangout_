import React from 'react';
import Container from '../../atoms/Container/Container';
import Spacing from '../../atoms/Spacing/Spacing';
import AddPost from '../../organisms/AddPost/AddPost';

function PageTemplate(props) {
  return (
    <Container className={'lho_page'}>
      <AddPost />
      <Container className={'lho_page_header'}>{props.header}</Container>
      <Spacing space={{ lg: 90, xs: 45 }} />
      <Container className={'lho_page_body'}>{props.body}</Container>
    </Container>
  );
}

export default PageTemplate;
