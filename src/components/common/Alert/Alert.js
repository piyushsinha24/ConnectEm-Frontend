import React from 'react';

const alertType = {
  SUCCESS: 'success',
  DANGER: 'danger',
  INFO: 'info',
};

const Alert = ({ displayType, children, className, ...rest }) => {
  const defaultClassName = `rounded-4 font-work text-12 text-dark-default w-full py-8 px-12 border-1 border-dark-default ${className}`;

  const typeToClassNames = (displayType) => {
    switch (displayType) {
      case alertType.SUCCESS:
        return `${defaultClassName} text-primary-default border-primary-default bg-primary-light`;
      case alertType.DANGER:
        return `${defaultClassName} text-red-default border-red-default bg-red-light`;
      case alertType.INFO:
        return `${defaultClassName} text-blue-default border-blue-default bg-blue-light`;
      default:
        return defaultClassName;
    }
  };

  return (
    <p {...rest} className={typeToClassNames(displayType)}>
      {children}
    </p>
  );
};

Alert.defaultProps = {
  displayType: '',
  className: '',
};

export default Alert;
