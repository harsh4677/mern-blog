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
    <div className='p-6 max-w-3xl mx-auto min-h-screen bg-gray-100 shadow-2xl rounded-2xl'>
      <h1 className='text-center text-4xl my-8 font-bold text-purple-600'>
        Create a Post
      </h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6 sm:flex-row justify-between'>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1 p-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            className='p-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300'
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
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-4 rounded-xl bg-teal-50'>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
          />
          <button
            type='button'
            className={`px-6 py-3 rounded-xl text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg ${
              imageUploadProgress ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-20 h-20'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                  styles={{
                    path: { stroke: `#6b46c1` },
                    text: { fill: '#6b46c1', fontSize: '18px' },
                  }}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>
        {imageUploadError && (
          <div className='text-red-600 p-4 border border-red-600 rounded-lg bg-red-100'>
            {imageUploadError}
          </div>
        )}
        {formData.image && (
          <div className='relative'>
            <img
              src={formData.image}
              alt='Uploaded'
              className='w-full h-80 object-cover rounded-xl shadow-lg'
            />
            <span className='absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded'>
              Uploaded Image
            </span>
          </div>
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something amazing...'
          className='h-80 mb-12 border-2 border-purple-300 rounded-xl'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <button
          type='submit'
          className='px-8 py-4 rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-xl hover:shadow-2xl'
        >
          Publish
        </button>
        {publishError && (
          <div className='mt-5 text-red-600 p-4 border border-red-600 rounded-lg bg-red-100'>
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
}
