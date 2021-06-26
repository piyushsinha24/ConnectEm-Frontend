import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { loginUser } from '../../services/authService';

const Login = () => {
  const { setAuthInfo } = useAuthContext();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const a = 10;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      const userInfo = {
        id: data.data.id,
        email: data.data.email,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
      };

      setAuthInfo({ token: 123, userInfo });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          className="mb-16"
          type="email"
          name="email"
          required
          onChange={onInputChange}
        />
        <input type="password" name="password" required onChange={onInputChange} />
        <button>Submit</button>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
