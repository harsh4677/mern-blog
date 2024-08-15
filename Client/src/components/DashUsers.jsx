import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className='min-w-full divide-y divide-gray-300 dark:divide-gray-600'>
            <thead className='bg-gray-200 dark:bg-gray-800'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider'>Date Created</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider'>User Image</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider'>Username</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider'>Email</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider'>Admin</th>
                <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider'>Delete</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-300 dark:bg-gray-900 dark:divide-gray-600'>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-400'>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-400'>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-12 h-12 object-cover bg-gray-300 rounded-full shadow-md'
                    />
                  </td>
                  <td className='px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100'>{user.username}</td>
                  <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-400'>{user.email}</td>
                  <td className='px-4 py-4 text-sm text-gray-700 dark:text-gray-400'>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </td>
                  <td className='px-4 py-4 text-sm font-medium'>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='text-red-600 hover:text-red-800 transition-colors duration-300'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='mt-6 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 transition-colors duration-300'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className='text-gray-500 dark:text-gray-400'>You have no users yet!</p>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-16 w-16 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-6 text-lg font-medium text-gray-700 dark:text-gray-300'>
                Are you sure you want to delete this user?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleDeleteUser}
                  className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300'
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors duration-300'
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
