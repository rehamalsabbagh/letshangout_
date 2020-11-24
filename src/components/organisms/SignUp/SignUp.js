import React from 'react';
import Input from '../../atoms/Input/Input';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';
import { observer } from 'mobx-react';
import { useAppContext } from '../../../context/index.js';

function SignUp() {
  const { signUpStore } = useAppContext();
  const { signInStore } = useAppContext();

  let fields_spacing = <Spacing space={{ lg: 10 }} />;
  return (
    <React.Fragment>
      <Input
        error={signUpStore.user.username.error}
        value={signUpStore.user.username.value}
        placeholder={'Username'}
        onChange={(e) => signUpStore.onChange('username', e.target.value)}
      />
      {fields_spacing}
      <Input
        error={signUpStore.user.email.error}
        value={signUpStore.user.email.value}
        placeholder={'Email Adress'}
        onChange={(e) => signUpStore.onChange('email', e.target.value)}
      />
      {fields_spacing}
      <Input
        error={signUpStore.user.password.error}
        value={signUpStore.user.password.value}
        placeholder={'Password'}
        type={'password'}
        onChange={(e) => signUpStore.onChange('password', e.target.value)}
      />
      {fields_spacing}
      <Input
        error={signUpStore.user.confirm_password.error}
        value={signUpStore.user.confirm_password.value}
        placeholder={'Confirm Password'}
        type={'password'}
        onChange={(e) =>
          signUpStore.onChange('confirm_password', e.target.value)
        }
      />
      {fields_spacing}
      <Button
        text={{ text: 'Sign Up' }}
        onClick={() => {
          signUpStore.singUp(() => {
            signInStore.setUser(signUpStore.user);
            signInStore.singIn();
          });
          // setTimeout(() => {
          //   signInStore.setUser(signUpStore.user);
          //   signInStore.singIn();
          // }, 2500);
        }}
      />
    </React.Fragment>
  );
}
export default observer(SignUp);
