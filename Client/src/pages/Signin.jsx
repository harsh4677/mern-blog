import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.email || !formData.password) {
  //     return dispatch(signInFailure('Please fill all the fields'));
  //   }
  //   try {
  //     dispatch(signInStart());
  //     const res = await fetch('/api/auth/signin', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(signInFailure(data.message));
  //     }

  //     if (res.ok) {
  //       dispatch(signInSuccess(data));
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     dispatch(signInFailure(error.message));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for missing fields
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
  
    try {
      dispatch(signInStart());
      
      // Make the API request
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is OK
      if (!res.ok) {
        // Try to get the error message from the response
        const errorData = await res.json();
        dispatch(signInFailure(errorData.message || 'An unexpected error occurred'));
        return;
      }
  
      // Parse the JSON response
      const data = await res.json();
      
      // Check the data's success flag
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }
  
    } catch (error) {
      dispatch(signInFailure('An error occurred: ' + error.message));
    }
  };
  

  return (
    <div className='min-h-screen flex items-center justify-center  '>
      <div className='flex p-8 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-8 bg-slate-100 shadow-xl rounded-lg border border-gray-200'>
        {/* Left */}
        <div className='flex-1 text-center md:text-left'>
          <Link to='/' className='font-bold text-5xl text-gray-900'>
            <span className='px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full text-white'>
              B
            </span>
              Spot
          </Link>
          <p className='text-base mt-4 text-gray-700'>
            Welcome! Sign in with your email and password or use Google to access your account.
          </p>
        </div>
        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-base font-medium text-gray-800'>
                Email Address
              </label>
              <input
                type='email'
                placeholder='example@domain.com'
                id='email'
                onChange={handleChange}
                className='mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-150 ease-in-out'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='password' className='text-base font-medium text-gray-800'>
                Password
              </label>
              <input
                type='password'
                placeholder='••••••••••'
                id='password'
                onChange={handleChange}
                className='mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-150 ease-in-out'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-150 ease-in-out'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <svg className='animate-spin h-6 w-6 text-white' viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                      fill='none'
                    />
                    <path
                      className='opacity-75'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='4'
                      d='M4 12a8 8 0 018-8v8H4z'
                    />
                  </svg>
                  <span className='ml-3'>Loading...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-6 justify-center md:justify-start'>
            <span className='text-gray-600'>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500 hover:underline'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <div className='mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
