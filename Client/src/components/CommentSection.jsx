import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-3xl mx-auto w-full p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-md'>
      {currentUser ? (
        <div className='flex items-center gap-3 mb-6 text-gray-700'>
          <p className='font-semibold'>Signed in as:</p>
          <img
            className='h-8 w-8 rounded-full border-2 border-gray-300'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-sm text-cyan-600 hover:underline font-medium'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-600 mb-6 flex gap-2 items-center'>
          <p>You must be signed in to comment.</p>
          <Link className='text-blue-600 hover:underline font-medium' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-4 bg-white shadow-sm'
        >
          <textarea
            placeholder='Add a comment...'
            rows='4'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className='w-full border border-gray-300 rounded-md p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500'
          />
          <div className='flex justify-between items-center'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <button
              type='submit'
              className='py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-semibold'
            >
              Submit
            </button>
          </div>
          {commentError && (
            <div className='mt-4 bg-red-100 border border-red-400 text-red-700 p-3 rounded-md'>
              {commentError}
            </div>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5 text-gray-500'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-2'>
            <p className='font-semibold'>Comments</p>
            <div className='border border-gray-400 py-1 px-3 rounded-md bg-gray-100'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60'>
          <div className='bg-white rounded-lg p-6 shadow-lg max-w-sm w-full'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-16 w-16 text-gray-400 mb-4 mx-auto' />
              <h3 className='mb-4 text-lg font-semibold text-gray-800'>
                Are you sure you want to delete this comment?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={() => handleDelete(commentToDelete)}
                  className='py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold'
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors font-semibold'
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
