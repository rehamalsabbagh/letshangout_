import React from 'react';
import Input from '../../atoms/Input/Input';
import Spacing from '../../atoms/Spacing/Spacing';
import Button from '../../atoms/Button/Button';
import { observer } from 'mobx-react';
import SingUpStore from './SignUpStore';
import { useAppContext, useVm } from '../../../context/index.js';
function SignUp(props) {
  const vm = useVm(SingUpStore, [useAppContext(), props]);
  let fields_spacing = <Spacing space={{ lg: 10 }} />;
  return (
    <React.Fragment>
      <Input
        placeholder={'Username'}
        onChange={(e) => vm.onChange('username', e.target.value)}
      />
      {fields_spacing}
      <Input
        placeholder={'Email Adress'}
        onChange={(e) => vm.onChange('email', e.target.value)}
      />
      {fields_spacing}
      <Input
        placeholder={'Password'}
        type={'password'}
        onChange={(e) => vm.onChange('password', e.target.value)}
      />
      {fields_spacing}
      <Input
        placeholder={'Confirm Password'}
        type={'password'}
        onChange={(e) => vm.onChange('confirm_password', e.target.value)}
      />
      {fields_spacing}
      <Button
        text={{ text: 'Sign Up' }}
        onClick={() => {
          vm.singUp();
        }}
      />
    </React.Fragment>
  );
}
export default observer(SignUp);
