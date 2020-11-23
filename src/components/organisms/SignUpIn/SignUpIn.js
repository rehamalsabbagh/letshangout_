import React, { useState } from 'react';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import Spacing from '../../atoms/Spacing/Spacing';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import Button from '../../atoms/Button/Button';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

function SignUpIn() {
  const [state, setState] = useState('signin');
  let fields_spacing = <Spacing space={{ lg: 10 }} />;
  let button_text = state === 'signin' ? "I don't have an account" : 'Sign In';

  function switchState() {
    if (state === 'signin') setState('signup');
    if (state === 'signup') setState('signin');
  }

  return (
    <React.Fragment>
      <TextLogo text={'Letshangout'} level={{ lg: 'h2' }} />
      <Spacing space={{ lg: 20 }} />
      <Card>
        <Align align={{ lg: 'start' }}>
          {state === 'signin' && <SignIn />}
          {state === 'signup' && <SignUp />}
          {fields_spacing}
          <Button
            onClick={() => switchState()}
            shape={'bordered'}
            text={{
              text: button_text,
            }}
          />
        </Align>
      </Card>
    </React.Fragment>
  );
}

export default SignUpIn;
