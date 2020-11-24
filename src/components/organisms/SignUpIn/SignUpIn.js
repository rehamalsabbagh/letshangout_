import React, { useState } from 'react';
import Align from '../../atoms/Align/Align';
import Card from '../../atoms/Card/Card';
import Spacing from '../../atoms/Spacing/Spacing';
import TextLogo from '../../atoms/TextLogo/TextLogo';
import Button from '../../atoms/Button/Button';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Container from '../../atoms/Container/Container';
import Popover from '../../atoms/Popover/Popover';
import Text from '../../atoms/Text/Text';
import ErrorCard from '../../atoms/ErrorCard/ErrorCard';
import { useAppContext } from '../../../context';
import { observer } from 'mobx-react-lite';

function SignUpIn() {
  const [state, setState] = useState('signin');
  let fields_spacing = <Spacing space={{ lg: 10 }} />;
  let { signUpStore } = useAppContext();
  let { signInStore } = useAppContext();

  function switchState() {
    if (state === 'signin') setState('signup');
    if (state === 'signup') setState('signin');
  }

  function errMsgs(_errMsgs) {
    // console.log(_errMsgs);
    if (!_errMsgs.length) return false;
    return _errMsgs.map((_errMsg) => <Text text={'● ' + _errMsg} />);
  }

  let _errMsgs;
  if (state === 'signin') _errMsgs = errMsgs(signInStore.errorMessages);
  if (state === 'signup') _errMsgs = errMsgs(signUpStore.errorMessages);

  let button_text;
  if (state === 'signin') button_text = "I don't have an account";
  if (state === 'signup') button_text = 'I have an account';
  return (
    <Popover
      appear={true}
      trigger={
        <Container>
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
        </Container>
      }
      content={
        _errMsgs && (
          <React.Fragment>
            <Spacing space={{ lg: 20 }} />
            <ErrorCard>
              <Align align={{ lg: 'start' }}>{_errMsgs}</Align>
            </ErrorCard>
          </React.Fragment>
        )
      }
    />
  );
}

export default observer(SignUpIn);
