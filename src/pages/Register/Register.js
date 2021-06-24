/* eslint-disable no-console */
import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { registerUser } from '../../services/authService';

const Register = () => {
  const { setAuthInfo } = useAuthContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(formData);
      console.log(data);
      const userInfo = {
        id: data.data.id,
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
      };

      setAuthInfo({ token: data.data.token, userInfo });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="firstName" required onChange={onInputChange} />
        <input type="text" name="lastName" required onChange={onInputChange} />
        <input type="email" name="email" required onChange={onInputChange} />
        <input type="password" name="password" required onChange={onInputChange} />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
