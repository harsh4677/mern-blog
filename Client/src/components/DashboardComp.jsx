import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className='p-5 md:mx-auto'>
      <div className='flex flex-wrap gap-6 justify-center'>
        {/* Total Users Card */}
        <div className='flex flex-col p-5 bg-gray-900 dark:bg-gray-800 gap-4 md:w-80 w-full rounded-lg shadow-xl'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-gray-400 text-sm uppercase'>Total Users</h3>
              <p className='text-3xl font-semibold'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-6xl p-4 shadow-xl' />
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <span className='text-green-400 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div>Last month</div>
          </div>
        </div>

        {/* Total Comments Card */}
        <div className='flex flex-col p-5 bg-gray-900 dark:bg-gray-800 gap-4 md:w-80 w-full rounded-lg shadow-xl'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-gray-400 text-sm uppercase'>Total Comments</h3>
              <p className='text-3xl font-semibold'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600 text-white rounded-full text-6xl p-4 shadow-xl' />
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <span className='text-green-400 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div>Last month</div>
          </div>
        </div>

        {/* Total Posts Card */}
        <div className='flex flex-col p-5 bg-gray-900 dark:bg-gray-800 gap-4 md:w-80 w-full rounded-lg shadow-xl'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-gray-400 text-sm uppercase'>Total Posts</h3>
              <p className='text-3xl font-semibold'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600 text-white rounded-full text-6xl p-4 shadow-xl' />
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <span className='text-green-400 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div>Last month</div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-6 py-6 justify-center'>
        {/* Recent Users */}
        <div className='flex flex-col w-full md:w-96 shadow-lg p-4 rounded-lg bg-gray-900'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-lg font-semibold text-gray-200'>Recent Users</h1>
            <Link
              to='/dashboard?tab=users'
              className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'
            >
              See all
            </Link>
          </div>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead>
              <tr className='bg-gray-800 text-gray-400'>
                <th className='p-3 text-left'>User Image</th>
                <th className='p-3 text-left'>Username</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {users.map((user) => (
                <tr key={user._id} className='bg-gray-900 text-gray-200'>
                  <td className='p-3'>
                    <img
                      src={user.profilePicture}
                      alt='user'
                      className='w-12 h-12 rounded-full object-cover bg-gray-600'
                    />
                  </td>
                  <td className='p-3'>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Comments */}
        <div className='flex flex-col w-full md:w-96 shadow-lg p-4 rounded-lg bg-gray-900'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-lg font-semibold text-gray-200'>Recent Comments</h1>
            <Link
              to='/dashboard?tab=comments'
              className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'
            >
              See all
            </Link>
          </div>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead>
              <tr className='bg-gray-800 text-gray-400'>
                <th className='p-3 text-left'>Comment Content</th>
                <th className='p-3 text-left'>Likes</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {comments.map((comment) => (
                <tr key={comment._id} className='bg-gray-900 text-gray-200'>
                  <td className='p-3 truncate'>{comment.content}</td>
                  <td className='p-3'>{comment.numberOfLikes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Posts */}
        <div className='flex flex-col w-full md:w-96 shadow-lg p-4 rounded-lg bg-gray-900'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-lg font-semibold text-gray-200'>Recent Posts</h1>
            <Link
              to='/dashboard?tab=posts'
              className='bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition'
            >
              See all
            </Link>
          </div>
          <table className='min-w-full divide-y divide-gray-700'>
            <thead>
              <tr className='bg-gray-800 text-gray-400'>
                <th className='p-3 text-left'>Post Image</th>
                <th className='p-3 text-left'>Post Title</th>
                <th className='p-3 text-left'>Category</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {posts.map((post) => (
                <tr key={post._id} className='bg-gray-900 text-gray-200'>
                  <td className='p-3'>
                    <img
                      src={post.image}
                      alt='post'
                      className='w-16 h-12 rounded-md object-cover bg-gray-600'
                    />
                  </td>
                  <td className='p-3 truncate'>{post.title}</td>
                  <td className='p-3'>{post.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
