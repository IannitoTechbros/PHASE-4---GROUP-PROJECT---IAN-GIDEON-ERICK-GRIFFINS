import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import sha1 from 'sha1';

async function isPasswordPwned(password) {
  const hash = sha1(password);
  const prefix = hash.substring(0, 5);
  const suffix = hash.substring(5).toUpperCase();

  const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
  const pwnedList = response.data.split('\n').map(line => line.split(':')[0]);

  return pwnedList.includes(suffix);
}

function Signup() {
  const [message, setMessage] = useState(null);
  const nav = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, "Must be 20 characters or less").required("Name is required"),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
        .required('Password is required'),
        passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')
    }),
    onSubmit: async (values) => {
      try {
        const passwordPwned = await isPasswordPwned(values.password);
        if (passwordPwned) {
          setMessage('This password has been compromised in a data breach. Please use a different password.');
          return;
        }

        const response = await axios.post('/signup', values);
        if (response.status === 201) {
          setMessage('User created successfully');
          formik.resetForm();
          setTimeout(() => {
            setMessage(null);
          }, 10000);
          nav('/login')
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  });

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-200'>
      <form className='bg-white shadow-md rounded-lg px-10 pt-8 pb-12 mb-4 w-full max-w-lg' onSubmit={formik.handleSubmit}>
        <h2 className='text-2xl text-center font-bold mb-6'>Welcome to Event Hub</h2>
        <div className='mb-4'>
          <input
            className='shadow appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2'
            type="text"
            name='name'
            placeholder='Enter your name'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <p className='text-red-500'>{formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}</p>
        </div>
        <div className='mb-4'>
          <input
            className='shadow appearance-none py-3 px-4 text-gray-700 w-full mt-2 leading-tight rounded border border-blue-300 focus:outline-none'
            type="email"
            name='email'
            placeholder='Enter your email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p className='text-red-500'>{formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}</p>
        </div>
        <div className='mb-4'>
          <input
            className='shadow appearance-none py-3 px-4 text-gray-700 w-full mt-2 leading-tight rounded border border-blue-300 focus:outline-none'
            type="password"
            name='password'
            placeholder='Enter your password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <p className='text-red-500'>{formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}</p>
        </div>
        <div className='mb-4'>
          <input
            className='shadow appearance-none py-3 px-4 text-gray-700 w-full mt-2 leading-tight rounded border border-blue-300 focus:outline-none'
            type="password"
            name='passwordConfirmation'
            placeholder='Confirm your password'
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
          />
          <p className='text-red-500'>{formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? <p>{formik.errors.passwordConfirmation}</p> : null}</p>
        </div>
        <div className='flex items-center justify-center'>
          <button type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mt-2'
          >
            Sign Up
          </button>
        </div>
        {message && (
          <p className='text-center mt-4'>{message}</p>
        )}
      </form>
      <p className='text-gray-600 text-md'>
        Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
      </p>
    </div>
  );
}

export default Signup;
