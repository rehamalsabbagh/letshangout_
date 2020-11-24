import React from 'react';
import Container from '../Container/Container';

function Card(props) {
  require('./Card.css');

  return (
    <Container {...props} className={props.className + ' lho_card'}>
      <Container className={' lho_card_body'}>{props.children}</Container>
    </Container>
  );
}

Card.defaultProps = {};

export default Card;
