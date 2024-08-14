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

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>Profile</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-40 h-40 mx-auto cursor-pointer border-4 border-gray-300 rounded-full shadow-md overflow-hidden'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress !== null && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={6}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                  },
                }}
              />
            </div>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`w-full h-full object-cover rounded-full ${
              imageFileUploadProgress && imageFileUploadProgress < 100 ? 'opacity-60' : ''
            }`}
          />
        </div>
        {imageFileUploadError && (
          <div className='bg-red-100 text-red-800 p-3 rounded'>
            {imageFileUploadError}
          </div>
        )}
        <div className='space-y-4'>
          <input
            type='text'
            id='username'
            placeholder='Username'
            defaultValue={currentUser.username}
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='email'
            id='email'
            placeholder='Email'
            defaultValue={currentUser.email}
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            onChange={handleChange}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md shadow-lg hover:bg-gradient-to-l transition duration-300'
        >
          Update Profile
        </button>
      </form>
      <div className='mt-6 flex justify-between text-gray-700'>
        <button onClick={() => setShowModal(true)} className='hover:text-red-500 transition duration-300'>
          Delete Account
        </button>
        <button onClick={handleSignout} className='hover:text-blue-500 transition duration-300'>
          Sign Out
        </button>
      </div>
      {updateUserSuccess && (
        <div className='bg-green-100 text-green-800 p-4 rounded mt-4'>
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className='bg-red-100 text-red-800 p-4 rounded mt-4'>
          {updateUserError}
        </div>
      )}
      {error && (
        <div className='bg-red-100 text-red-800 p-4 rounded mt-4'>
          {error}
        </div>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <HiOutlineExclamationCircle className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg text-gray-700 mb-4 text-center'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <button
                onClick={handleDeleteUser}
                className='py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300'
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className='py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
