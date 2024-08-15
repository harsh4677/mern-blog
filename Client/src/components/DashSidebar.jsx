import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
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

  return (
    <div className='w-full md:w-64 bg-gray-900 text-white h-screen flex flex-col shadow-lg'>
      <div className='flex flex-col p-4'>
        <div className='flex items-center mb-8'>
          <h2 className='text-3xl font-semibold text-gray-200'>Dashboard</h2>
        </div>
        <nav className='flex flex-col'>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <div
                className={`flex items-center p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
                  tab === 'dash' || !tab ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-600'
                }`}
              >
                <HiChartPie className='w-7 h-7 mr-3 text-gray-400' />
                <span className='text-lg font-medium'>Dashboard</span>
              </div>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <div
              className={`flex items-center p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
                tab === 'profile' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-600'
              }`}
            >
              <HiUser className='w-7 h-7 mr-3 text-gray-400' />
              <span className='text-lg font-medium'>
                {currentUser.isAdmin ? 'Admin' : 'User'} Profile
              </span>
            </div>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <div
                className={`flex items-center p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
                  tab === 'posts' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-600'
                }`}
              >
                <HiDocumentText className='w-7 h-7 mr-3 text-gray-400' />
                <span className='text-lg font-medium'>Posts</span>
              </div>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <div
                  className={`flex items-center p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
                    tab === 'users' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-600'
                  }`}
                >
                  <HiOutlineUserGroup className='w-7 h-7 mr-3 text-gray-400' />
                  <span className='text-lg font-medium'>Users</span>
                </div>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <div
                  className={`flex items-center p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
                    tab === 'comments' ? 'bg-gray-700 text-gray-100' : 'hover:bg-gray-600'
                  }`}
                >
                  <HiAnnotation className='w-7 h-7 mr-3 text-gray-400' />
                  <span className='text-lg font-medium'>Comments</span>
                </div>
              </Link>
            </>
          )}
          <div
            className='flex items-center p-4 mt-auto rounded-lg cursor-pointer hover:bg-gray-700 transition-colors'
            onClick={handleSignout}
          >
            <HiArrowSmRight className='w-7 h-7 mr-3 text-gray-400' />
            <span className='text-lg font-medium'>Sign Out</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
