import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
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
  signoutSuccess 
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
    <div className='max-w-lg mx-auto p-6 w-full bg-white rounded-lg shadow-lg'>
      <h1 className='my-7 text-center font-bold text-3xl text-gray-800'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-40 h-40 self-center cursor-pointer shadow-lg overflow-hidden rounded-full border-4 border-gray-300 bg-gray-100'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={6}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
                text: {
                  fill: '#ffffff',
                  fontSize: '20px',
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover ${
              imageFileUploadProgress && imageFileUploadProgress < 100
                ? 'opacity-60'
                : ''
            }`}
          />
        </div>
        {imageFileUploadError && (
          <div className='bg-red-200 text-red-800 border border-red-400 rounded-md p-3'>
            {imageFileUploadError}
          </div>
        )}
        <input
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username}
          onChange={handleChange}
          className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          onChange={handleChange}
          className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          onChange={handleChange}
          className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <button
          type='submit'
          className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:from-purple-700 hover:to-blue-700 transition duration-300'
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <button
              type='button'
              className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-md shadow-md hover:from-purple-700 hover:to-pink-700 transition duration-300 w-full'
            >
              Create a Post
            </button>
          </Link>
        )}
      </form>
      <div className='text-red-600 flex justify-between mt-5'>
        <span
          onClick={() => setShowModal(true)}
          className='cursor-pointer hover:underline'
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className='cursor-pointer hover:underline'
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <div className='bg-green-100 text-green-700 border border-green-300 rounded-md p-3 mt-5'>
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className='bg-red-100 text-red-700 border border-red-300 rounded-md p-3 mt-5'>
          {updateUserError}
        </div>
      )}
      {error && (
        <div className='bg-red-100 text-red-700 border border-red-300 rounded-md p-3 mt-5'>
          {error}
        </div>
      )}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-16 w-16 text-gray-500 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-700'>
                Are you sure you want to delete your account?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  className='bg-red-600 text-white px-5 py-3 rounded-md shadow-md hover:bg-red-700 transition duration-300'
                  onClick={handleDeleteUser}
                >
                  Yes, I'm sure
                </button>
                <button
                  className='bg-gray-300 text-gray-800 px-5 py-3 rounded-md shadow-md hover:bg-gray-400 transition duration-300'
                  onClick={() => setShowModal(false)}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
