import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-lg'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Date Updated</th>
                  <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Post Image</th>
                  <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Post Title</th>
                  <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Category</th>
                  <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Delete</th>
                  <th className='px-6 py-3 text-left text-gray-700 font-semibold'>Edit</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-300'>
                {userPosts.map((post) => (
                  <tr key={post._id} className='bg-white hover:bg-gray-50'>
                    <td className='px-6 py-4 text-gray-600'>{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td className='px-6 py-4'>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-24 h-14 object-cover rounded-md shadow-sm border border-gray-200'
                        />
                      </Link>
                    </td>
                    <td className='px-6 py-4'>
                      <Link
                        className='font-medium text-gray-900 hover:text-gray-700 transition-colors'
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className='px-6 py-4 text-gray-600'>{post.category}</td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className='text-red-600 hover:text-red-800 transition-colors'
                      >
                        Delete
                      </button>
                    </td>
                    <td className='px-6 py-4'>
                      <Link
                        className='text-teal-600 hover:text-teal-800 transition-colors'
                        to={`/update-post/${post._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-600 hover:text-teal-800 text-sm py-4 mt-6 border border-teal-300 rounded-md hover:bg-teal-100 transition-colors'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className='text-center text-gray-500 mt-8'>You have no posts yet!</p>
      )}

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white rounded-lg p-8 shadow-xl max-w-md w-full'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-16 w-16 text-red-500 mb-4 mx-auto' />
              <h3 className='mb-6 text-xl text-gray-800 font-semibold'>
                Are you sure you want to delete this post?
              </h3>
              <div className='flex justify-center gap-6'>
                <button
                  onClick={handleDeletePost}
                  className='py-2 px-6 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition-colors'
                >
                  <FaCheck className='inline mr-1' /> Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='py-2 px-6 border border-gray-300 text-gray-800 rounded-md shadow-md hover:bg-gray-100 transition-colors'
                >
                  <FaTimes className='inline mr-1' /> No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
