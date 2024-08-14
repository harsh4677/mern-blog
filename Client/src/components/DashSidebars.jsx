import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        navigate('/sign-in'); // Redirect after sign out
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full md:w-64 bg-gray-900 text-white h-full shadow-lg rounded-lg">
      <div className="flex flex-col p-4 space-y-2">
        <Link to="/dashboard?tab=profile">
          <div
            className={`flex items-center p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              tab === 'profile' ? 'bg-cyan-900' : 'bg-gray-600'
            }`}
          >
            <HiUser className="mr-3 text-3xl" />
            <span className="text-xl font-semibold">Profile</span>
          </div>
        </Link>
        <div
          className="flex items-center p-4 bg-red-900 rounded-lg cursor-pointer hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
          onClick={handleSignout}
        >
          <HiArrowSmRight className="mr-3 text-3xl" />
          <span className="text-xl font-semibold">Sign Out</span>
        </div>
      </div>
    </div>
  );
}
