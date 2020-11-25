import React from 'react';
import { observer } from 'mobx-react';
import Card from '../../atoms/Card/Card';
import Icon from '../../atoms/Icon/Icon';
import Row from '../../atoms/Row/Row';
import Image from '../../atoms/Image/Image';
import Text from '../../atoms/Text/Text';
import Spacing from '../../atoms/Spacing/Spacing';
import { useAppContext } from '../../../context';
import './Post.css';

let date_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/2948/2948239.svg';
let time_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/2088/2088617.svg';
let location_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/1008/1008001.svg';
let going_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/1216/1216575.svg';
let going_colored_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/1216/1216774.svg';
function Post(props) {
  let { postsStore } = useAppContext();
  let { usersStore } = useAppContext();

  function cardInfoText(text, iconSrc, isTitle) {
    return (
      <Row spacing={isTitle ? 0 : 10}>
        {iconSrc && (
          <Icon src={iconSrc} size={'xs'} style={{ padding: '2px' }} />
        )}
        <Text
          style={{ fontWeight: isTitle ? 500 : 100 }}
          className={'lho_post_info'}
          text={text}
          break={1}
          level={'span'}
        />
      </Row>
    );
  }

  function userLike() {
    let _userLike = null;
    for (const key in props.likes) {
      if (props.likes[key].user === usersStore.authUser.id) _userLike = key;
    }
    return _userLike;
  }

  let _likes = !props.likes ? '0' : Object.keys(props.likes).length;
  let _userLike = userLike();

  return (
    <Card
      className={'lho_post'}
      header={
        props.showHeader && (
          <Row spacing={10}>
            {/* props.user.image */}
            <Icon
              src={
                'https://www.flaticon.com/svg/static/icons/svg/1738/1738691.svg'
              }
            />
            <Text text={props.user.username} />
          </Row>
        )
      }
      // {/* props.image */}
      image={
        <Image
          src={
            'https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png'
          }
        />
      }
    >
      <Row spacing={7}>
        <Icon
          size={'md'}
          style={{ cursor: 'pointer' }}
          src={_userLike ? going_colored_icon_src : going_icon_src}
          onClick={() =>
            _userLike
              ? postsStore.unlikePost(_userLike, props.id, props.user.id)
              : postsStore.likePost(props.id, props.user.id)
          }
        />
        <Text
          style={{ fontWeight: 500 }}
          className={'lho_post_info'}
          text={_likes + ' likes'}
          level={'span'}
        />
      </Row>
      <Spacing space={10} />
      {cardInfoText(props.name, null, true)}
      <Spacing space={5} />
      {cardInfoText(props.date, date_icon_src)}
      {cardInfoText(props.time, time_icon_src)}
      {cardInfoText(props.location, location_icon_src)}
    </Card>
  );
}

Post.defaultProps = {
  showHeader: 1,
};

export default observer(Post);
