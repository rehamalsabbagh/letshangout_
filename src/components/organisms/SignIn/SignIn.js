import React from 'react';
import Input from '../../atoms/Input/Input';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';

function SignIn(props) {
  let fields_spacing = <Spacing space={{ lg: 10 }} />;
  return (
    <React.Fragment>
      <Input placeholder={'Username'} />
      {fields_spacing}
      <Input placeholder={'Password'} type={'password'} />
      {fields_spacing}
      <Button text={{ text: 'Sign In' }} />
    </React.Fragment>
  );
}

export default SignIn;
