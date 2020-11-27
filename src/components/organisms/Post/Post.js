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
import Align from '../../atoms/Align/Align';
import { Link } from 'react-router-dom';
import Container from '../../atoms/Container/Container';

const account_src =
  'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png';
const date_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/2948/2948239.svg';
const time_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/2088/2088617.svg';
const location_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/1008/1008001.svg';
const going_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/1612/1612618.svg';
const going_colored_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/1612/1612763.svg';
function Post(props) {
  const { postsStore } = useAppContext();
  const { usersStore } = useAppContext();
  const _userImage = props.user.image ? props.user.image : account_src;
  const _likes = !props.likes ? '0' : Object.keys(props.likes).length;
  const _userLike = userLike();

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

  return (
    <Align align={'start'}>
      <Card
        className={'lho_post'}
        header={
          props.showHeader && (
            <Link to={'/' + props.user.username}>
              <Row spacing={10} verticalAlign={'middle'}>
                <Icon
                  size={'xlg'}
                  src={_userImage}
                  style={{ borderRadius: '500px' }}
                />
                <Text text={props.user.username} />
              </Row>
            </Link>
          )
        }
        image={
          props.grid ? (
            <Container
              style={{
                height: '230px',
                backgroundImage: 'url(' + props.image + ')',
              }}
            />
          ) : (
            <Image src={props.image} />
          )
        }
      >
        <Row spacing={7} verticalAlign={'middle'}>
          <Icon
            size={'xlg'}
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
            text={_likes + ' attendees'}
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
    </Align>
  );
}

Post.defaultProps = {
  showHeader: 1,
  grid: undefined,
};

export default observer(Post);
