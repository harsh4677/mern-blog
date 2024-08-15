import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-5 w-full'>
      <h1 className='my-7 text-center font-semibold text-4xl text-gray-800'>
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-36 h-36 self-center cursor-pointer shadow-lg overflow-hidden rounded-full border-4 border-gray-300 transition-transform duration-300 ease-in-out transform hover:scale-105'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={8}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                  },
                  text: {
                    fill: '#ffffff',
                    fontSize: '16px',
                  },
                }}
              />
            </div>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-4 border-gray-200 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <div className='text-red-500 mt-2 text-center'>{imageFileUploadError}</div>
        )}
        <input
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username}
          onChange={handleChange}
          className='border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          onChange={handleChange}
          className='border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          onChange={handleChange}
          className='border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <button
          type='submit'
          className={`p-3 rounded-lg transition-colors duration-300 ease-in-out ${loading || imageFileUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:bg-gradient-to-l hover:from-blue-500 hover:to-purple-500'}`}
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <button className='w-full p-3 mt-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-colors duration-300'>
              Create a Post
            </button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-6'>
        <span
          onClick={() => setShowModal(true)}
          className='cursor-pointer hover:text-red-700 transition-colors duration-300'
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className='cursor-pointer hover:text-blue-700 transition-colors duration-300'
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <div className='bg-green-100 text-green-800 p-4 rounded-lg shadow-md mt-5'>
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className='bg-red-100 text-red-800 p-4 rounded-lg shadow-md mt-5'>
          {updateUserError}
        </div>
      )}
      {error && (
        <div className='bg-red-100 text-red-800 p-4 rounded-lg shadow-md mt-5'>
          {error}
        </div>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60'>
          <div className='bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 scale-100'>
            <HiOutlineExclamationCircle className='h-16 w-16 text-gray-400 mb-4 mx-auto' />
            <h3 className='mb-5 text-xl font-semibold text-gray-800'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-5'>
              <button
                className='p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300'
                onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </button>
              <button
                className='p-3 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300'
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
