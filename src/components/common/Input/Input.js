import React from 'react';

const Input = ({ error, className, label, ...rest }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="font-work text-12">{label}</label>}
      <input
        {...rest}
        className={`rounded-4 w-full py-12 px-16 border-1 ${
          !!error ? 'border-red-default' : 'border-light-grey'
        }`}
      />
      {error && <p className="text-12 text-red-default mt-8">{error}</p>}
    </div>
  );
};

Input.defaultProps = {
  error: '',
  className: '',
};

export default Input;
