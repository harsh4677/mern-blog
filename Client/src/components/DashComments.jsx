import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-800'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-300 rounded-md shadow-lg'>
              <thead className='bg-gray-200 dark:bg-gray-700'>
                <tr>
                  <th className='px-6 py-3 text-left text-gray-600 dark:text-gray-200'>Date Updated</th>
                  <th className='px-6 py-3 text-left text-gray-600 dark:text-gray-200'>Comment Content</th>
                  <th className='px-6 py-3 text-left text-gray-600 dark:text-gray-200'>Number of Likes</th>
                  <th className='px-6 py-3 text-left text-gray-600 dark:text-gray-200'>PostId</th>
                  <th className='px-6 py-3 text-left text-gray-600 dark:text-gray-200'>UserId</th>
                  <th className='px-6 py-3 text-left text-gray-600 dark:text-gray-200'>Delete</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-300 dark:divide-gray-600'>
                {comments.map((comment) => (
                  <tr key={comment._id} className='bg-white dark:bg-gray-900'>
                    <td className='px-6 py-4 text-gray-800 dark:text-gray-300'>{new Date(comment.updatedAt).toLocaleDateString()}</td>
                    <td className='px-6 py-4 text-gray-800 dark:text-gray-300'>{comment.content}</td>
                    <td className='px-6 py-4 text-gray-800 dark:text-gray-300'>{comment.numberOfLikes}</td>
                    <td className='px-6 py-4 text-gray-800 dark:text-gray-300'>{comment.postId}</td>
                    <td className='px-6 py-4 text-gray-800 dark:text-gray-300'>{comment.userId}</td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setCommentIdToDelete(comment._id);
                        }}
                        className='text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full bg-teal-500 text-white rounded-md py-3 mt-6 hover:bg-teal-600 transition-colors'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>You have no comments yet!</p>
      )}

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-20 w-20 text-gray-500 dark:text-gray-300 mb-4 mx-auto' />
              <h3 className='mb-6 text-lg text-gray-700 dark:text-gray-200'>
                Are you sure you want to delete this comment?
              </h3>
              <div className='flex justify-center gap-6'>
                <button
                  onClick={handleDeleteComment}
                  className='py-2 px-5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center'
                >
                  <FaCheck className='mr-2' /> Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='py-2 px-5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center'
                >
                  <FaTimes className='mr-2' /> No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
