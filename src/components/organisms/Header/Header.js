import React from 'react';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Icon from '../../atoms/Icon/Icon';
import Row from '../../atoms/Row/Row';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import { useAppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import PopupStore from '../../atoms/Popup/PopupStore';
import Popup from '../../atoms/Popup/Popup';
import SearchAccounts from '../../templates/SearchAccounts/SearchAccounts';
import './Header.css';

let account_src =
  'https://www.flaticon.com/svg/static/icons/svg/1738/1738691.svg';
let signout_src =
  'https://www.flaticon.com/svg/static/icons/svg/251/251376.svg';

let search_src = 'https://www.flaticon.com/svg/static/icons/svg/482/482631.svg';

function Header() {
  let { signInStore } = useAppContext();
  let { usersStore } = useAppContext();
  let popupStore = new PopupStore();
  let iconStyle = { cursor: 'pointer' };

  return (
    <React.Fragment>
      <Popup popupStore={popupStore}>
        <Container className={'page_container'}>
          <SearchAccounts />
        </Container>
      </Popup>
      <Container className={'lho_header'}>
        <Container className={'page_container'}>
          <Row portitions={{ lg: [0.5, 0.5] }} verticalAlign={'middle'}>
            <Align align={{ lg: 'start' }}>
              <Link to={'/'}>
                <TextLogo text={'Letshangout'} />
              </Link>
            </Align>
            <Align align={{ lg: 'end' }}>
              <Row spacing={{ lg: 15 }} verticalAlign={'middle'}>
                <Icon
                  src={search_src}
                  size={'md'}
                  style={iconStyle}
                  onClick={() => popupStore.setState('open')}
                />
                <Link to={'/'}>
                  <Icon
                    src={signout_src}
                    size={'md'}
                    style={iconStyle}
                    onClick={() => signInStore.signOut()}
                  />
                </Link>
                <Link to={'/' + usersStore.authUser.username}>
                  <Icon src={account_src} size={'md'} style={iconStyle} />
                </Link>
              </Row>
            </Align>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default Header;
