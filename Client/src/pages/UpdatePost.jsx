import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        setFormData(data.posts[0]);
      } catch (error) {
        setPublishError('Failed to fetch post data.');
      }
    };

    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    setImageUploadError(null);
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-8 max-w-4xl mx-auto min-h-screen bg-gray-200'>
      <h1 className='text-center text-4xl font-bold text-gray-900 mb-8'>Update Post</h1>
      <form className='bg-white p-8 rounded-lg shadow-lg border border-gray-300' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6 mb-8'>
          <label htmlFor='title' className='text-xl font-semibold text-gray-800'>
            Title
          </label>
          <input
            type='text'
            placeholder='Enter post title'
            id='title'
            required
            className='p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title || ''}
          />
        </div>
        <div className='flex flex-col sm:flex-row gap-6 mb-8'>
          <div className='flex-1'>
            <label htmlFor='category' className='text-xl font-semibold text-gray-800'>
              Category
            </label>
            <select
              id='category'
              className='p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              value={formData.category || ''}
            >
              <option value=''>Select a category</option>
              <option value='javascript'>JavaScript</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
            </select>
          </div>
          <div className='flex-1'>
            <label className='text-xl font-semibold text-gray-800'>
              Image Upload
            </label>
            <div className='flex flex-col gap-4 items-center border-2 border-dashed border-teal-500 p-4 rounded-lg'>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
                className='block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600'
              />
              <button
                type='button'
                onClick={handleUploadImage}
                disabled={imageUploadProgress !== null}
                className='py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
              >
                {imageUploadProgress ? (
                  <div className='flex items-center justify-center'>
                    <CircularProgressbar
                      value={imageUploadProgress}
                      text={`${imageUploadProgress || 0}%`}
                      styles={{
                        path: { stroke: `url(#gradient)` },
                        text: { fill: '#ffffff', fontSize: '16px' },
                      }}
                    />
                  </div>
                ) : (
                  'Upload Image'
                )}
              </button>
              {imageUploadError && <p className='text-red-500'>{imageUploadError}</p>}
              {formData.image && (
                <img
                  src={formData.image}
                  alt='Uploaded'
                  className='mt-4 w-full h-72 object-cover rounded-lg shadow-md'
                />
              )}
            </div>
          </div>
        </div>
        <div className='mb-8'>
          <label htmlFor='content' className='text-xl font-semibold text-gray-800'>
            Content
          </label>
          <ReactQuill
            theme='snow'
            value={formData.content || ''}
            placeholder='Write your post content here...'
            className='h-72 mt-4 border border-gray-300 rounded-lg shadow-sm'
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
        >
          Update Post
        </button>
        {publishError && (
          <p className='mt-6 text-red-500 text-center'>{publishError}</p>
        )}
      </form>
    </div>
  );
}
