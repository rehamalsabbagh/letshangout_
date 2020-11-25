import React from 'react';
import { observer } from 'mobx-react';
import { useAppContext } from '../../../context';
import Row from '../../atoms/Row/Row';
import Align from '../../atoms/Align/Align';
import Post from '../Post/Post';

function PostsGrid(props) {
  let { postsStore } = useAppContext();
  postsStore.getUserPosts(props.user.id);

  function posts() {
    if (!postsStore.posts) return;
    let _posts = [];
    let _count = 0;
    for (var key in postsStore.posts) {
      let _post = { ...postsStore.posts[key], ...{ id: key } };
      _count++;
      _posts = [
        ..._posts,
        ...[
          <Post
            key={_count}
            {..._post}
            user={props.user}
            showHeader={null}
          ></Post>,
        ],
      ];
    }
    return (
      <Row
        portitions={{
          lg: new Array(_count).fill(0.3333),
          xs: new Array(_count).fill(1),
        }}
        spacing={{ lg: 20, xs: 0 }}
      >
        {_posts}
      </Row>
    );
  }
  return <Align align={'start'}>{posts()}</Align>;
}

export default observer(PostsGrid);
