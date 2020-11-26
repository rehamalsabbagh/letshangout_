import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useAppContext } from '../../../context';
import Row from '../../atoms/Row/Row';
import Post from '../Post/Post';
import Text from '../../atoms/Text/Text';
import Align from '../../atoms/Align/Align';

function PostsGrid(props) {
  let { postsStore } = useAppContext();

  useEffect(() => {
    postsStore.getUserPosts(props.user.id);
  }, [postsStore, props.user.id]);

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
      <Align align={'start'}>
        <Row
          portitions={{
            lg: new Array(_count).fill(0.3333),
            xs: new Array(_count).fill(1),
          }}
          spacing={{ lg: 20, xs: 0 }}
        >
          {_posts}
        </Row>
      </Align>
    );
  }
  let _posts = posts();

  if (_posts) return _posts;
  if (!_posts) return <Text text={'This account does not have posts'} />;
}

export default observer(PostsGrid);
