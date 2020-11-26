import React from 'react';
import { observer } from 'mobx-react';
import { useAppContext } from '../../../context';
import Row from '../../atoms/Row/Row';
import Align from '../../atoms/Align/Align';
import Post from '../Post/Post';
import Text from '../../atoms/Text/Text';

function PostsGrid(props) {
  let { postsStore } = useAppContext();
  postsStore.getUserPosts(props.user.id);

  function posts() {
    if (!postsStore.posts) return null;
    let _posts = [];
    let _count = 0;
    for (var key in postsStore.posts) {
      let _post = { ...postsStore.posts[key], ...{ id: key } };
      _count++;
      _posts = [
        ..._posts,
        ...[
          <Post
            {..._post}
            key={_count}
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
  let _posts = posts();

  if (_posts) return <Align align={'start'}>{_posts}</Align>;
  if (!_posts) return <Text text={'This account does not have posts'} />;
}

export default observer(PostsGrid);
