import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen'>

      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto  text-white rounded-lg shadow-lg'>
        <span className='text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Welcome To B-Spot
        </span>
        <h1 className='text-gray-120 text-lg'>
          Here you'll find a variety of articles and tutorials on vaious topics.
        </h1>
        <Link
          to='/search'
          className='text-lg sm:text-base text-teal-400 font-semibold hover:underline '
        >
          View all posts
        </Link>
      </div>

      <div className='p-3 bg-amber-200 dark:bg-slate-800'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-3xl font-semibold text-center text-gray-800 dark:text-gray-100'>
              Recent Posts
            </h2>
            <div className='flex flex-wrap gap-6'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-xl text-teal-600 hover:underline text-center font-medium'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
