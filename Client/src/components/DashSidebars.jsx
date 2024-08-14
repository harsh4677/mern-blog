import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
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
    <div className='w-full md:w-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg rounded-lg'>
      <div className='p-4'>
        <div className='flex flex-col gap-4'>
          <Link to='/dashboard?tab=profile'>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                tab === 'profile'
                  ? 'bg-white text-purple-700 shadow-md transform scale-105'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <HiUser className='w-5 h-5' />
              <span>Profile</span>
              {currentUser.isAdmin && (
                <span className='ml-auto px-2 py-1 text-xs font-semibold text-white bg-purple-700 rounded-full'>
                  Admin
                </span>
              )}
            </div>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  tab === 'posts'
                    ? 'bg-white text-purple-700 shadow-md transform scale-105'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <HiDocumentText className='w-5 h-5' />
                <span>Posts</span>
              </div>
            </Link>
          )}
          <div
            className='flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 transition-all duration-200'
            onClick={handleSignout}
          >
            <HiArrowSmRight className='w-5 h-5' />
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
