import React from 'react';
import { observer } from 'mobx-react';
import { useAppContext } from '../../../context';
import Row from '../../atoms/Row/Row';
import Card from '../../atoms/Card/Card';
import Align from '../../atoms/Align/Align';

function PostsGrid() {
  let { postsStore } = useAppContext();
  let { signInStore } = useAppContext();
  postsStore.getUserPosts(signInStore.authUser.key);

  function posts() {
    if (!postsStore.posts) return;
    let _posts = [];
    let _count = 0;
    for (var key in postsStore.posts) {
      _count++;
      _posts = [
        ..._posts,
        ...[
          <Card key={_count}>
            {postsStore.posts[key].name}
            {postsStore.posts[key].date}
            {postsStore.posts[key].time}
            {postsStore.posts[key].location}
          </Card>,
        ],
      ];
    }
    return (
      <Row
        portitions={{
          lg: new Array(_count).fill(0.3333),
          xs: new Array(_count).fill(1),
        }}
        spacing={{ lg: 10, xs: 0 }}
      >
        {_posts}
      </Row>
    );
  }
  return <Align align={'start'}>{posts()}</Align>;
}

export default observer(PostsGrid);
