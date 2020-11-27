import React from 'react';
import { useAppContext } from '../../../context';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Row from '../../atoms/Row/Row';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';
import Text from '../../atoms/Text/Text';
import { observer } from 'mobx-react';
import UploadImage from '../UploadImage/UploadImage';
import GeneralUtil from '../../utils/GeneralUtil';
const account_src =
  'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png';

function UserProfile(props) {
  let { postsStore } = useAppContext();
  let { usersStore } = useAppContext();
  let _user = props.user;
  let _isAuthUser = usersStore.authUser.username === _user.username;
  let _posts = !postsStore.posts ? '0' : Object.keys(postsStore.posts).length;
  let _followers = !_user.followers ? '0' : Object.keys(_user.followers).length;
  let _following = !_user.following ? '0' : Object.keys(_user.following).length;
  let _followingId = followingId();
  let _followerId = followerId();
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

  function userImage(_isAuthUser, _user) {
    let backgroundUrl = _user.image !== undefined ? _user.image : account_src;
    let _addStyle = {
      backgroundImage: 'url(' + backgroundUrl + ')',
      backgroundSize: 'cover',
      borderRadius: '500px',
    };
    let _style = {
      lg: {
        ...{ height: '150px', width: '150px' },
        ..._addStyle,
      },
      xs: {
        ...{ height: '80px', width: '80px' },
        ..._addStyle,
      },
    };
    let __style = GeneralUtil.responsiveObj(_style);
    return !_isAuthUser ? (
      <Container style={__style} />
    ) : (
      <UploadImage
        style={__style}
        onUpload={(image) => usersStore.setUserImage(image)}
        directory={'/userimage/' + usersStore.authUser.id}
      />
    );
  }

  return (
    <Align align={'start'}>
      <Row spacing={{ lg: 50, xs: 20 }} verticalAlign={'middle'}>
        {userImage(_isAuthUser, _user)}
        <Container>
          <Text text={_user.username} level={{ lg: 'h4', xs: 'h5' }} />
          <Spacing space={{ lg: 15, xs: 10 }} />
          <Row spacing={{ lg: 50, xs: 13 }}>
            <Text text={_posts + ' posts'} {..._profileInfoProps} />
            <Text text={_followers + ' followers'} {..._profileInfoProps} />
            <Text text={_following + ' following'} {..._profileInfoProps} />
          </Row>
          <Spacing space={{ lg: 15, xs: 10 }} />
          {!_isAuthUser && (
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
