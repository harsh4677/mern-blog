import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
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

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-8 max-w-4xl mx-auto min-h-screen bg-gray-100'>
      <h1 className='text-center text-4xl my-8 font-bold text-gray-800'>Create a Post</h1>
      <form className='bg-white shadow-lg rounded-lg p-6 space-y-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-center'>
          <input
            type='text'
            placeholder='Title'
            required
            className='flex-1 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            className='p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </select>
        </div>
        <div className='flex flex-col gap-4 sm:flex-row items-center'>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
            className='p-4 border border-gray-300 rounded-md shadow-sm'
          />
          <button
            type='button'
            className='bg-teal-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-teal-600 transition duration-300 disabled:opacity-50 flex items-center justify-center'
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>
        {imageUploadError && (
          <div className='text-red-500 bg-red-100 p-4 rounded-md border border-red-300'>
            {imageUploadError}
          </div>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt='Uploaded'
            className='w-full h-72 object-cover rounded-md shadow-md'
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-6 border border-gray-300 rounded-md shadow-sm'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <button
          type='submit'
          className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-md shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300'
        >
          Publish
        </button>
        {publishError && (
          <div className='text-red-500 bg-red-100 p-4 rounded-md border border-red-300 mt-5'>
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
}
