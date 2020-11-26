import React from 'react';
import Center from '../Center/Center';
import { observer } from 'mobx-react-lite';
import Container from '../Container/Container';

function Poppup(props) {
  require('./Popup.css');
  const className = props.className + ' lho_popup ';

  return (
    <Container
      {...props}
      className={className + props.popupStore.state}
      onClick={() => props.popupStore.setState('close')}
    >
      <Center style={{ cursor: 'auto' }} onClick={(e) => e.stopPropagation()}>
        {props.popupStore.state === 'open' && props.children}
      </Center>
    </Container>
  );
}

export default observer(Poppup);
