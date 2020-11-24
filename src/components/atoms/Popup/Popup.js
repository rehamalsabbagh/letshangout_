import React from 'react';
import Center from '../Center/Center';
import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../../context/AppContext';
import Container from '../Container/Container';

function Poppup(props) {
  require('./Popup.css');
  const className = props.className + ' lho_popup ';
  const { popupStore } = useAppContext();

  return (
    <Container
      {...props}
      className={className + popupStore.state}
      onClick={() => popupStore.setState({ state: 'close' })}
    >
      <Center style={{ cursor: 'auto' }} onClick={(e) => e.stopPropagation()}>
        {popupStore.child}
      </Center>
    </Container>
  );
}

export default observer(Poppup);
