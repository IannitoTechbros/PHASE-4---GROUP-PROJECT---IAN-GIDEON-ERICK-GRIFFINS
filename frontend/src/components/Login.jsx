import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/login', values);
        console.log('Response data:', response.data);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user)); 
          
          const userRole = response.data.user?.role;

          if (!userRole) {
            throw new Error('User role not found in response');
          }

          setMessage('Logged in successfully');

          if (userRole === 'admin') {
            navigate('/adminevents', { replace: true });
          } else {
            navigate('/events', { replace: true });
          }

          formik.resetForm();
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setMessage(error.response?.data?.message || 'Invalid credentials. Please try again.');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200 px-4 py-8">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl text-center font-bold mb-6">Login</h2>
        {message && (
          <p
            className={
              message === 'Logged in successfully'
                ? 'text-green-500 text-center mb-4'
                : 'text-red-500 text-center mb-4'
            }
          >
            {message}
          </p>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <input
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 mt-2">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 mt-2">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <p className="text-gray-600 text-lg">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
