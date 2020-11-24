import React from 'react';
import Align from '../../atoms/Align/Align';
import Container from '../../atoms/Container/Container';
import Icon from '../../atoms/Icon/Icon';
import Row from '../../atoms/Row/Row';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import { useAppContext } from '../../../context/AppContext';
import './Header.css';
let account_src =
  'https://www.flaticon.com/svg/static/icons/svg/1738/1738691.svg';
let signout_src =
  'https://www.flaticon.com/svg/static/icons/svg/251/251376.svg';

function Header() {
  let { signInStore } = useAppContext();
  let iconStyle = { cursor: 'pointer' };

  return (
    <Container className={'lho_header'}>
      <Container className={'page_container'}>
        <Row portitions={{ lg: [0.5, 0.5] }} verticalAlign={'middle'}>
          <Align align={{ lg: 'start' }}>
            <TextLogo text={'Letshangout'} />
          </Align>
          <Align align={{ lg: 'end' }}>
            <Row spacing={{ lg: 10 }} verticalAlign={'middle'}>
              <Icon
                src={signout_src}
                size={'md'}
                style={iconStyle}
                onClick={() => signInStore.singOut()}
              />
              <Icon src={account_src} size={'md'} style={iconStyle} />
            </Row>
          </Align>
        </Row>
      </Container>
    </Container>
  );
}

export default Header;
