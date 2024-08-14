import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className='overflow-x-auto p-3'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <table className='min-w-full bg-white shadow-md rounded-lg'>
          <thead>
            <tr className='border-b'>
              <th className='px-6 py-3 text-left text-gray-500'>Date updated</th>
              <th className='px-6 py-3 text-left text-gray-500'>Post image</th>
              <th className='px-6 py-3 text-left text-gray-500'>Post title</th>
              <th className='px-6 py-3 text-left text-gray-500'>Category</th>
              <th className='px-6 py-3 text-left text-gray-500'>Delete</th>
              <th className='px-6 py-3 text-left text-gray-500'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id} className='border-b'>
                <td className='px-6 py-4'>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4'>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Link>
                </td>
                <td className='px-6 py-4'>
                  <Link
                    className='font-medium text-gray-900 hover:underline'
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </td>
                <td className='px-6 py-4'>{post.category}</td>
                <td className='px-6 py-4'>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <Link
                    className='text-teal-500 hover:underline'
                    to={`/update-post/${post._id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}
