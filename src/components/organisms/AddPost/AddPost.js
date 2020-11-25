import React from 'react';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';
import { useAppContext } from '../../../context/AppContext';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import Spacing from '../../atoms/Spacing/Spacing';
import Input from '../../atoms/Input/Input';
import { observer } from 'mobx-react';
import Popup from '../../atoms/Popup/Popup';
import popupStore from '../../atoms/Popup/PopupStore';
import './AddPost.css';

let addpost_btn_icon_src =
  'https://www.flaticon.com/svg/static/icons/svg/864/864380.svg';

function AddPost() {
  const { postsStore } = useAppContext();
  const { signInStore } = useAppContext();

  let addPostBtnIcon = {
    src: addpost_btn_icon_src,
    size: 'lg',
  };

  let fieldss_space = <Spacing space={{ lg: 10 }} />;

  return (
    <Container className={'lho_addpost_container'}>
      <Popup popupStore={popupStore}>
        <Container className={'page_container'}>
          <Align align={'start'}>
            <Card>
              <Input
                error={postsStore.post.image.error}
                value={postsStore.post.image.value}
                type={'file'}
                style={{ height: '200px' }}
                accept={'image/x-png,image/gif,image/jpeg'}
                onChange={(e) => postsStore.onChange('image', e.target.value)}
              />
              {fieldss_space}
              <Input
                error={postsStore.post.date.error}
                value={postsStore.post.date.value}
                placeholder={'Date'}
                type={'date'}
                onChange={(e) => postsStore.onChange('date', e.target.value)}
              />
              {fieldss_space}
              <Input
                error={postsStore.post.time.error}
                value={postsStore.post.time.value}
                placeholder={'Time'}
                type={'time'}
                onChange={(e) => postsStore.onChange('time', e.target.value)}
              />
              {fieldss_space}
              <Input
                error={postsStore.post.location.error}
                value={postsStore.post.location.value}
                placeholder={'Location'}
                onChange={(e) =>
                  postsStore.onChange('location', e.target.value)
                }
              />
              {fieldss_space}
              <Input
                error={postsStore.post.description.error}
                value={postsStore.post.description.value}
                placeholder={'Description'}
                onChange={(e) =>
                  postsStore.onChange('description', e.target.value)
                }
              />
              {fieldss_space}
              <Button
                text={{ text: 'Add a hangout' }}
                onClick={() => postsStore.addPost(signInStore.authUser.key)}
              />
            </Card>
          </Align>
        </Container>
      </Popup>
      <Button
        className={'lho_addpost_button'}
        primaryColor={'#ffffff'}
        secondaryColor={'#454545'}
        icon={addPostBtnIcon}
        onClick={() => popupStore.setState('open')}
      />
    </Container>
  );
}

export default observer(AddPost);
