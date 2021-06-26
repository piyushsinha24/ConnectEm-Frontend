import classNames from 'classnames';
import React from 'react';

const alertType = {
  SUCCESS: 'success',
  DANGER: 'danger',
  INFO: 'info',
};

const Alert = ({ displayType, children, className, ...rest }) => {
  const defaultClassName =
    'rounded-4 font-work text-12 text-dark-default w-full py-8 px-12 border-1 border-dark-default';

  const typeToClassNames = (displayType) => {
    switch (displayType) {
      case alertType.SUCCESS:
        return 'text-primary-default border-primary-default bg-primary-light';
      case alertType.DANGER:
        return 'text-red-default border-red-default bg-red-light';
      case alertType.INFO:
        return 'text-blue-default border-blue-default bg-blue-light';
      default:
        return defaultClassName;
    }
  };

  const allClassNames = classNames(
    defaultClassName,
    typeToClassNames(displayType),
    className
  );

  return (
    <p {...rest} className={allClassNames}>
      {children}
    </p>
  );
};

Alert.defaultProps = {
  displayType: '',
  className: '',
};

export default Alert;
