import React from 'react';

const btnType = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DISABLED: 'disabled',
};

const Button = ({ displayType, className, children, ...rest }) => {
  const defaultClassName = `box-border h-48 rounded-4 font-bold text-16 py-8 px-16 ${className}`;

  const typeToClassNames = (displayType) => {
    switch (displayType) {
      case btnType.PRIMARY:
        return `${defaultClassName} text-light-default bg-primary-default`;
      case btnType.SECONDARY:
        return `${defaultClassName} text-dark-default border-dark-default border-2`;
      case btnType.DISABLED:
        return `${defaultClassName} text-light-grey border-light-grey border-2 cursor-not-allowed`;
      default:
        return defaultClassName;
    }
  };

  return (
    <button {...rest} className={typeToClassNames(displayType)}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  displayType: '',
  className: '',
};

export default Button;
