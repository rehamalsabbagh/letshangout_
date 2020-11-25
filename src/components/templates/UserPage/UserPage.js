import React from 'react';
import Container from '../../atoms/Container/Container';
import PostsGrid from '../../organisms/PostsGrid/PostsGrid';
import './UserPage.css';

function UserPage() {
  return (
    <Container className={'lho_user_page'}>
      <PostsGrid />
    </Container>
  );
}

export default UserPage;
