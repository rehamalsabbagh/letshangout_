import React from 'react';
import GeneralUtil from '../../utils/GeneralUtil';
import Row from '../Row/Row';

function Input(props) {
  require('./Input.css');
  let level = GeneralUtil.responsiveObj(props.level);
  let style = GeneralUtil.responsiveObj(props.style);
  style = { ...style, ...{ backgroundColor: props.primarycolor } };
  if (props.shape === 'bordered') style.borderColor = props.secondarycolor;

  let _input = (
    <input
      {...props}
      className={'t_input ' + level}
      style={{ width: 'calc(' + style.width + ' - 80px)' }}
    />
  );

  return (
    <div
      style={style}
      className={
        ' t_input_container ' +
        props.shape +
        ' t_error_' +
        props.error +
        ' ' +
        props.className
      }
    >
      {!props.prefix && _input}
      {props.prefix && (
        <Row
          verticalAlign={'middle'}
          spacing={{ lg: props.prefix ? 15 : 0 }}
          style={{ lg: { textAlign: 'initial' } }}
        >
          <div className={'t_input_prefix'}>{props.prefix}</div>
          {_input}
        </Row>
      )}
    </div>
  );
}

Input.defaultProps = {
  style: {},
  className: '',
  level: { lg: 'h6' },
  prefix: null,
  shape: 'bordered', /// bordered /// flat
  primarycolor: '#f7f7f7',
  secondarycolor: '#e4e4e4',
};

export default Input;
