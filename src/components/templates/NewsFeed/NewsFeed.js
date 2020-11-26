import React, { useEffect } from 'react';
import { useAppContext } from '../../../context';
import Center from '../../atoms/Center/Center';
import Container from '../../atoms/Container/Container';
import Icon from '../../atoms/Icon/Icon';
import Row from '../../atoms/Row/Row';
import Spacing from '../../atoms/Spacing/Spacing';
import Text from '../../atoms/Text/Text';
import PopupStore from '../../atoms/Popup/PopupStore';
import Popup from '../../atoms/Popup/Popup';
import SearchAccounts from '../SearchAccounts/SearchAccounts';
import { observer } from 'mobx-react';
import './NewsFeed.css';
import Post from '../../organisms/Post/Post';

const popupStore = new PopupStore();
const search_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/975/975658.svg';
function NewsFeed() {
  const { usersStore } = useAppContext();
  const { postsStore } = useAppContext();

  useEffect(() => {
    postsStore.getAllPosts();
  }, [postsStore]);

  function posts() {
    let _posts = [];
    let _count = 0;
    for (const key in postsStore.posts) {
      let _post = postsStore.posts[key];
      _posts = [
        ..._posts,
        ...[
          <Post
            {..._post}
            key={_count}
            // user={props.user}
            showHeader={null}
          ></Post>,
        ],
      ];
      _count++;
    }
    return _posts;
  }

  return (
    <React.Fragment>
      <Popup popupStore={popupStore}>
        <Container className={'page_container'}>
          <SearchAccounts />
        </Container>
      </Popup>
      <Container className={'lho_newsfeed'}>
        {!usersStore.authUser.following && (
          <React.Fragment>
            <Container style={{ height: 'calc(100vh - 300px)' }}>
              <Center>
                <Text text={'You are not following any account'} level={'h5'} />
                <Text text={'Follow your friends and check their hangouts!'} />
                <Spacing space={15} />
                <Row
                  spacing={10}
                  verticalAlign={'middle'}
                  onClick={() => popupStore.setState('open')}
                >
                  <Text
                    text={'Search accounts'}
                    className={'lho_newsfeed_search'}
                  />
                  <Icon src={search_icon_src} size={'lg'} />
                </Row>
              </Center>
            </Container>
          </React.Fragment>
        )}
        {usersStore.authUser.following && postsStore.posts && posts()}
      </Container>
    </React.Fragment>
  );
}

export default observer(NewsFeed);
