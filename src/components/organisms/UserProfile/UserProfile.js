import React from 'react';
import { useAppContext } from '../../../context';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Image from '../../atoms/Image/Image';
import Row from '../../atoms/Row/Row';
import Spacing from '../../atoms/Spacing/Spacing';
import Text from '../../atoms/Text/Text';
import { observer } from 'mobx-react';

function UserProfile(props) {
  let { postsStore } = useAppContext();
  let _posts = !postsStore.posts ? '0' : Object.keys(postsStore.posts).length;

  return (
    <Align align={'start'}>
      <Row spacing={{ lg: 50, xs: 20 }} verticalAlign={'middle'}>
        <Image
          src={'https://www.flaticon.com/svg/static/icons/svg/1738/1738691.svg'}
          style={{
            lg: { height: '150px', width: '150px' },
            xs: { height: '85px', width: '85px' },
          }}
        />
        <Container>
          <Text text={props.user.username} level={{ lg: 'h4', xs: 'h5' }} />
          <Spacing space={15} />
          <Row spacing={50}>
            <Text text={_posts + ' posts'} />
            <Text text={'0 followers'} />
          </Row>
          <Spacing space={15} />
        </Container>
      </Row>
    </Align>
  );
}

export default observer(UserProfile);
