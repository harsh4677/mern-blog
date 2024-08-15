import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='flex p-10 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-12 bg-white shadow-2xl rounded-lg border border-gray-300'>
        {/* Left */}
        <div className='flex-1 text-center md:text-left'>
          <Link to='/' className='font-bold text-6xl text-gray-900'>
            <span className='px-4 py-2 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-lg text-white'>
              Sahand's
            </span>
            Blog
          </Link>
          <p className='text-lg mt-6 text-gray-600'>
            Join us and be a part of the community! Sign up with your email and password or use Google.
          </p>
        </div>
        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='username' className='text-lg font-medium text-gray-800'>
                Username
              </label>
              <input
                type='text'
                placeholder='Enter your username'
                id='username'
                onChange={handleChange}
                className='mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-150 ease-in-out'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='email' className='text-lg font-medium text-gray-800'>
                Email Address
              </label>
              <input
                type='email'
                placeholder='you@example.com'
                id='email'
                onChange={handleChange}
                className='mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-150 ease-in-out'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='password' className='text-lg font-medium text-gray-800'>
                Password
              </label>
              <input
                type='password'
                placeholder='••••••••••'
                id='password'
                onChange={handleChange}
                className='mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-150 ease-in-out'
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-150 ease-in-out'
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
                'Sign Up'
              )}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-6 justify-center md:justify-start'>
            <span className='text-gray-700'>Already have an account?</span>
            <Link to='/sign-in' className='text-blue-500 hover:underline'>
              Sign In
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
