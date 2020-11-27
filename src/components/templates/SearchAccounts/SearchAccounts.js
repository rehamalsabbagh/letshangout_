import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../context';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import Container from '../../atoms/Container/Container';
import Icon from '../../atoms/Icon/Icon';
import Input from '../../atoms/Input/Input';
import Row from '../../atoms/Row/Row';
import Spacing from '../../atoms/Spacing/Spacing';
import Text from '../../atoms/Text/Text';
let account_src =
  'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png';

function SearchAccounts(props) {
  const { usersStore } = useAppContext();
  const [filteredUsers, setFilteredUsers] = useState(null);
  if (!filteredUsers) filterUsers('');

  function filterUsers(string) {
    let _filteredUsers = [];
    for (const key in usersStore.users) {
      if (usersStore.users[key].username.indexOf(string) > -1)
        _filteredUsers.push(usersStore.users[key]);
    }
    setFilteredUsers(_filteredUsers);
  }

  function listItem(key, image, text) {
    let _listItemStyle = {
      padding: '10px 0px',
      borderTop: key === 0 ? '' : '1px solid #f7f7f7',
    };
    return (
      <Container key={key} style={_listItemStyle}>
        <Row spacing={10} verticalAlign={'middle'}>
          <Icon
            size={'xlg'}
            style={{ borderRadius: '500px' }}
            src={image ? image : account_src}
          />
          <Text text={text} />
        </Row>
      </Container>
    );
  }

  let scrollConStyle = {
    height: '250px',
    overflow: 'hidden',
    overflowY: 'scroll',
  };
  return (
    <Card>
      <Align align={'start'}>
        <Input
          placeholder={'Search account'}
          onChange={(e) => filterUsers(e.target.value)}
        />
        <Spacing space={17} />
        <Container style={scrollConStyle}>
          {filteredUsers &&
            filteredUsers.map((user, key) => (
              <Link to={'/' + user.username} key={key}>
                {listItem(key, user.image, user.username)}
              </Link>
            ))}
        </Container>
      </Align>
    </Card>
  );
}

export default SearchAccounts;
