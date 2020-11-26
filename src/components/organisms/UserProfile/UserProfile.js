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
  let _posts = !postsStore.posts ? '0' : Object.keys(postsStore.posts).length;
  let _profileInfoProps = {
    style: { xs: { fontSize: '0.86rem' } },
    level: { xs: 'span' },
  };
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
          <Text text={props.user.username} level={{ lg: 'h4', xs: 'h5' }} />
          <Spacing space={{ lg: 15, xs: 10 }} />
          <Row spacing={{ lg: 50, xs: 13 }}>
            <Text text={_posts + ' posts'} {..._profileInfoProps} />
            <Text text={'0 followers'} {..._profileInfoProps} />
          </Row>
          <Spacing space={{ lg: 15, xs: 10 }} />
          {usersStore.authUser.username !== props.user.username && (
            <Button
              text={{ text: 'Follow' }}
              primaryColor={'#ffffff'}
              secondaryColor={'#454545'}
            />
          )}
        </Container>
      </Row>
    </Align>
  );
}

export default observer(UserProfile);
