import React from 'react';
import { observer } from 'mobx-react';
import Container from '../../atoms/Container/Container';
import { useAppContext } from '../../../context';
import Row from '../../atoms/Row/Row';
import Card from '../../atoms/Card/Card';

function PostsGrid() {
  let { postsStore } = useAppContext();
  let { signInStore } = useAppContext();
  postsStore.getUserPosts(signInStore.authUser.key);

  //   function _posts() {

  //     for (var key in postsStore.posts)
  //       return <Card>{postsStore.posts[key].location}</Card>;
  //   }

  function posts() {
    if (!postsStore.posts) return;
    let _posts = [];
    for (var key in postsStore.posts)
      _posts = [..._posts, ...[<Card>{postsStore.posts[key].location}</Card>]];
    return (
      <Row>
        {/* {_posts()} */}
        {/* {postsStore.posts.map((post, key) => (
          <Card>{'hello'}</Card>
        ))} */}
      </Row>
    );
  }
  return <Container>{posts()}</Container>;
}

export default observer(PostsGrid);
