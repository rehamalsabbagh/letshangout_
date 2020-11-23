import React from 'react';
import Icon from '../Icon/Icon';
import Anchor from '../Anchor/Anchor';
import GeneralUtil from '../../utils/GeneralUtil';
import TextUtil from './TextUtil';

function Text(props) {
  require('./Text.css');

  function text(text, level) {
    switch (level) {
      case 'h1':
        return <h1 key={0}>{text}</h1>;
      case 'h2':
        return <h2 key={0}>{text}</h2>;
      case 'h3':
        return <h3 key={0}>{text}</h3>;
      case 'h4':
        return <h4 key={0}>{text}</h4>;
      case 'h5':
        return <h5 key={0}>{text}</h5>;
      case 'h6':
        return <h6 key={0}>{text}</h6>;
      case 'span':
        return <span key={0}>{text}</span>;
      default:
        return <h6 key={0}>{text}</h6>;
    }
  }

  function wrapper(props, style, children) {
    if (props.anchor)
      return (
        <Anchor {...props.anchor} {...props} style={style}>
          {children}
        </Anchor>
      );
    return (
      <span {...props} style={style}>
        {children}
      </span>
    );
  }

  let level = GeneralUtil.responsiveObj(props.level);
  let style = GeneralUtil.responsiveObj(props.style);
  let iconStyle = { lg: { verticalAlign: 'middle' } };
  if (props.font) TextUtil.importFont(props.font);

  return wrapper(props, { ...style, ...{ fontFamily: props.font.family } }, [
    props.text && text(props.text, level),
    props.text && props.icon && ' ',
    props.icon && <Icon {...props.icon} style={iconStyle} />,
    props.break && <br />,
  ]);
}

Text.defaultProps = {
  font: {},
  style: {},
  level: { lg: 'h6' },
  break: undefined,
  icon: null,
  anchor: null,
  onClick: () => {},
};

export default Text;
