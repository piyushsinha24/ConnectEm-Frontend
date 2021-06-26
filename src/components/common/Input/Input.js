import React from 'react';

const Input = ({ error, className, ...rest }) => {
  return (
    <div className={`w-full ${className}`}>
      <input
        {...rest}
        className="rounded-4 w-full py-12 px-16 border-1 border-light-grey"
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
