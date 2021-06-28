import classNames from 'classnames';
import React from 'react';

const btnType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DISABLED: 'disabled',
};

const btnSize = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
};

const Button = ({ displayType, size, className, children, ...rest }) => {
  const defaultClassName = `box-border rounded-4 font-bold`;

  const sizeToClassNames = (size) => {
    switch (size) {
      case btnSize.SM:
        return 'text-12 px-16 h-36';
      case btnSize.MD:
        return 'text-16 px-16 h-48';
      case btnSize.LG:
        return 'text-16 py-8 px-16';
      default:
        return '';
    }
  };

  const typeToClassNames = (displayType) => {
    switch (displayType) {
      case btnType.PRIMARY:
        return 'text-light-bright bg-primary-default';
      case btnType.SECONDARY:
        return 'text-dark-default border-dark-default border-2';
      case btnType.DISABLED:
        return 'text-light-grey border-light-grey border-2 cursor-not-allowed';
      default:
        return '';
    }
  };

  const allClassNames = classNames(
    defaultClassName,
    sizeToClassNames(size),
    typeToClassNames(displayType),
    className
  );

  return (
    <button {...rest} className={allClassNames}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  displayType: btnType.PRIMARY,
  size: btnSize.MD,
  className: '',
};

export default Button;
