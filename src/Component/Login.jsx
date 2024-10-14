import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .matches(/^admin$/, 'Username must be "admin"'),
      password: Yup.string()
        .required('Password is required')
        .matches(/^password123$/, 'Password must be "password123"'),
    }),
    onSubmit: (values) => {
      if (values.username === 'admin' && values.password === 'password123') {
        localStorage.setItem('isAuthenticated', 'true');
        setIsLoggedIn(true); 
        setError(''); 
      } else {
        setError('Invalid username or password'); 
      }
    },
  });

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      
      {!isLoggedIn ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="input"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error-message">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="input"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      ) : (
        <div className="options-container">
          <h2>Where would you like to go?</h2>
          <button className="option-button" onClick={() => handleNavigation('/weather')}>Weather Dashboard</button>
          <button className="option-button" onClick={() => handleNavigation('/todolist')}>To-Do List</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
