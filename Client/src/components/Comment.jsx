import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex p-5 border-b dark:border-gray-700 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md mb-4'>
      <div className='flex-shrink-0 mr-4'>
        <img
          className='w-12 h-12 rounded-full bg-gray-300'
          src={user.profilePicture || '/default-profile.png'}
          alt={user.username || 'User'}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-2'>
          <span className='font-semibold text-lg text-teal-600 truncate'>
            {user ? `@${user.username}` : 'Anonymous'}
          </span>
          <span className='text-gray-500 text-xs ml-2'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className='mb-3 p-3 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-teal-500 transition-all'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-3'>
              <button
                type='button'
                className='py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors'
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type='button'
                className='py-2 px-4 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 dark:hover:bg-gray-700 transition-colors'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-700 dark:text-gray-300 mb-3'>
              {comment.content}
            </p>
            <div className='flex items-center space-x-3 border-t border-gray-300 dark:border-gray-700 pt-2'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`flex items-center text-gray-500 hover:text-blue-500 ${
                  currentUser && comment.likes.includes(currentUser._id) ? 'text-blue-500' : ''
                }`}
              >
                <FaThumbsUp className='text-sm mr-1' />
                {comment.numberOfLikes > 0 && (
                  <span>
                    {comment.numberOfLikes} {comment.numberOfLikes === 1 ? 'like' : 'likes'}
                  </span>
                )}
              </button>
              {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                <>
                  <button
                    type='button'
                    onClick={handleEdit}
                    className='text-gray-500 hover:text-blue-500 transition-colors'
                  >
                    Edit
                  </button>
                  <button
                    type='button'
                    onClick={() => onDelete(comment._id)}
                    className='text-gray-500 hover:text-red-500 transition-colors'
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
