import React from 'react';
import Input from '../../atoms/Input/Input';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';
import { observer } from 'mobx-react';
import singUpStore from './SignUpStore';

function SignUp() {
  let fields_spacing = <Spacing space={{ lg: 10 }} />;
  return (
    <React.Fragment>
      <Input
        placeholder={'Username'}
        onChange={(e) => singUpStore.onChange('username', e.target.value)}
      />
      {fields_spacing}
      <Input
        placeholder={'Email Adress'}
        onChange={(e) => singUpStore.onChange('email', e.target.value)}
      />
      {fields_spacing}
      <Input
        placeholder={'Password'}
        type={'password'}
        onChange={(e) => singUpStore.onChange('password', e.target.value)}
      />
      {fields_spacing}
      <Input
        placeholder={'Confirm Password'}
        type={'password'}
        onChange={(e) =>
          singUpStore.onChange('confirm_password', e.target.value)
        }
      />
      {fields_spacing}
      <Button
        text={{ text: 'Sign Up' }}
        onClick={() => {
          singUpStore.singUp();
        }}
      />
    </React.Fragment>
  );
}

export default observer(SignUp);
