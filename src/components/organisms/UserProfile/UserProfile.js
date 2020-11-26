import React from 'react';
import { useAppContext } from '../../../context';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Image from '../../atoms/Image/Image';
import Row from '../../atoms/Row/Row';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import { observer } from 'mobx-react';

function UserProfile(props) {
  let { postsStore } = useAppContext();
  let { usersStore } = useAppContext();
  let _user = props.user;
  let _posts = !postsStore.posts ? '0' : Object.keys(postsStore.posts).length;
  let _followers = !_user.followers ? '0' : Object.keys(_user.followers).length;
  let _following = !_user.following ? '0' : Object.keys(_user.following).length;
  let _followingId = followingId();
  let _followerId = followerId();
  // console.log(_followingId);
  // console.log(_followerId);

  let _profileInfoProps = {
    style: { xs: { fontSize: '0.8rem' } },
    level: { xs: 'span' },
  };

  function followingId() {
    let _followingId = null;
    for (const key in usersStore.authUser.following) {
      if (usersStore.authUser.following[key].user === props.user.id)
        _followingId = key;
    }
    return _followingId;
  }

  function followerId() {
    let _followerId = null;
    for (const key in props.user.followers) {
      if (props.user.followers[key].user === usersStore.authUser.id)
        _followerId = key;
    }
    return _followerId;
  }

  return (
    <Align align={'start'}>
      <Row spacing={{ lg: 50, xs: 20 }} verticalAlign={'middle'}>
        <Image
          src={'https://www.flaticon.com/svg/static/icons/svg/1738/1738691.svg'}
          style={{
            lg: { height: '150px', width: '150px' },
            xs: { height: '80px', width: '80px' },
          }}
        />
        <Container>
          <Text text={_user.username} level={{ lg: 'h4', xs: 'h5' }} />
          <Spacing space={{ lg: 15, xs: 10 }} />
          <Row spacing={{ lg: 50, xs: 13 }}>
            <Text text={_posts + ' posts'} {..._profileInfoProps} />
            <Text text={_followers + ' followers'} {..._profileInfoProps} />
            <Text text={_following + ' following'} {..._profileInfoProps} />
          </Row>
          <Spacing space={{ lg: 15, xs: 10 }} />
          {usersStore.authUser.username !== _user.username && (
            <Button
              text={{ text: _followingId ? 'Unfollow' : 'Follow' }}
              primaryColor={'#ffffff'}
              secondaryColor={'#454545'}
              onClick={() =>
                _followingId
                  ? usersStore.unfollow(_user.id, _followingId, _followerId)
                  : usersStore.follow(_user.id)
              }
            />
          )}
        </Container>
      </Row>
    </Align>
  );
}

export default observer(UserProfile);
