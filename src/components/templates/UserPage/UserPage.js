import React from 'react';
import Container from '../../atoms/Container/Container';
import Spacing from '../../atoms/Spacing/Spacing';
import PostsGrid from '../../organisms/PostsGrid/PostsGrid';
import UserProfile from '../../organisms/UserProfile/UserProfile';
import './UserPage.css';

function UserPage(props) {
  return (
    <Container className={'lho_user_page'}>
      <UserProfile user={props.user} />
      <Spacing space={{ lg: 40, xs: 30 }} />
      <Container style={{ borderBottom: '1px solid #e4e4e4' }} />
      <Spacing space={{ lg: 50, xs: 30 }} />
      <PostsGrid user={props.user} />
    </Container>
  );
}

export default UserPage;
