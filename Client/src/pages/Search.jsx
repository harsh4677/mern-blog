import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className='p-8 border-b md:border-r md:min-h-screen border-gray-300 bg-gray-50'>
        <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
          <div className='flex items-center gap-4'>
            <label htmlFor='searchTerm' className='text-lg font-medium'>
              Search Term:
            </label>
            <input
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className='border rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          <div className='flex items-center gap-4'>
            <label htmlFor='sort' className='text-lg font-medium'>Sort:</label>
            <select
              onChange={handleChange}
              value={sidebarData.sort}
              id='sort'
              className='border rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            >
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-4'>
            <label htmlFor='category' className='text-lg font-medium'>Category:</label>
            <select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              className='border rounded-lg px-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </select>
          </div>
          <button
            type='submit'
            className='px-6 py-3 border rounded-lg border-purple-600 text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors'
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className='w-full bg-white'>
        <h1 className='text-4xl font-semibold border-b border-gray-300 p-4'>
          Posts Results:
        </h1>
        <div className='p-8 flex flex-wrap gap-6'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-600'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-600'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-600 text-lg hover:underline p-4 w-full mt-4'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
