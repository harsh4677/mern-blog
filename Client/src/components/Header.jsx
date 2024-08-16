import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className='bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-500
     p-5
    flex items-center justify-between shadow-xl transition-colors duration-300 ease-in-out'>

      <Link
        to='/'
        className='text-sm sm:text-xl font-semibold dark:text-white flex items-center space-x-2'
      >
        <span className='px-4 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl text-white'>
          B
        </span>
        <span className='text-gray-700 dark:text-gray-200'>Spot</span>
      </Link>

      <form onSubmit={handleSubmit} className='flex items-center space-x-2 relative'>
        <div className="relative flex items-center w-full">
          <input
            type='text'
            placeholder='Search...'
            className='pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-150 ease-in-out'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className='absolute left-3 text-gray-600 dark:text-gray-300' />
        </div>
      </form>

        <nav className="bg-gray-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between gap-3">
              <div className="text-white">
                <Link to="/" className={`px-3 py-2  font-semibold text-lg rounded ${path === '/' ? 'bg-gray-600' : ''}`}>Home</Link>
                <Link to="/about" className={`px-3 py-2 font-semibold text-lg  rounded ${path === '/about' ? 'bg-gray-700' : ''}`}>About</Link>
                <Link to="/projects" className={`px-3 py-2 font-semibold text-lg  rounded ${path === '/projects' ? 'bg-gray-700' : ''}`}>Projects</Link>
              </div>
            </div>
          </div>
        </nav>


      <div className='flex items-center space-x-2'>
        <button
          className='px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-full
          hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? (
            <FaSun className='text-yellow-500' />
          ) : (
            <FaMoon className='text-gray-400' />
          )}
        </button>



        {currentUser ? (
          <div className='relative'>
            <button className='flex items-center p-1'>
              <img
                src={currentUser.profilePicture}
                alt='user'
                className='w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600'
              />
            </button>

            <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border
            border-gray-200 dark:border-gray-600 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
              <div className='p-3'>
                <span className='block text-sm font-semibold text-gray-900 dark:text-gray-100'>
                  @{currentUser.username}
                </span>
                <span className='block text-sm text-gray-600 dark:text-gray-300'>
                  {currentUser.email}
                </span>
              </div>
              <Link to='/dashboard?tab=profile'>
                <div className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                cursor-pointer transition-colors duration-150 ease-in-out'>
                  Profile
                </div>
              </Link>
              <div
                className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer 
                transition-colors duration-150 ease-in-out'
                onClick={handleSignout}
              >
                Sign out
              </div>
            </div>
          </div>
        ) : (
          <Link to='/sign-in'>
            <button
            type="button" 
            className=" px-6 py-3 rounded-lg font-semibold text-lg bg-gradient-to-r
             from-teal-600 to-slate-600 hover:from-pink-500 hover:to-orange-500 ...">
              Sign In
          </button>
          </Link>
        )}
      </div>
    </header>
  );
}
