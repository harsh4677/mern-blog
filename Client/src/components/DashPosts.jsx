import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  console.log(userPosts);

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

  return (
    <div className='p-6 mx-auto max-w-6xl overflow-x-auto'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className='w-full min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-lg'>
            <thead className='bg-gray-100 dark:bg-gray-900'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Date Updated
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Post Image
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Post Title
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Category
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Delete
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              {userPosts.map((post) => (
                <tr key={post._id} className='hover:bg-gray-50 dark:hover:bg-gray-800'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300'>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-24 h-12 object-cover rounded-md shadow-sm border border-gray-300'
                      />
                    </Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Link
                      className='text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-semibold'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                    {post.category}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 cursor-pointer'>
                      Delete
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <Link
                      className='text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300'
                      to={`/update-post/${post._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='mt-6 w-full px-4 py-2 text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-semibold border border-teal-600 dark:border-teal-400 rounded-lg shadow-sm'
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>
          You have no posts yet!
        </p>
      )}
    </div>
  );
}
