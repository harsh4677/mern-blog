import { useSelector } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return (
      <div className='max-w-lg mx-auto p-6 w-full text-center'>
        <p className='text-lg font-semibold text-gray-600'>User data not available.</p>
      </div>
    );
  }

  return (
    <div className='max-w-lg mx-auto p-6 w-full bg-white shadow-lg rounded-lg'>
      <h1 className='my-6 text-center font-bold text-4xl text-gray-800'>Profile</h1>
      <form className='flex flex-col gap-6'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-lg overflow-hidden rounded-full'>
          <img
            src={currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-4 border-gray-300'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            id='username'
            placeholder='Username'
            defaultValue={currentUser.username}
            className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300'
          />
          <input
            type='email'
            id='email'
            placeholder='Email'
            defaultValue={currentUser.email}
            className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300'
          />
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300'
          />
        </div>
        <button
          type='submit'
          className='px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition duration-300'
        >
          Update
        </button>
      </form>
      <div className='text-red-500 flex justify-between mt-8 text-lg'>
        <span className='cursor-pointer hover:underline'>Delete Account</span>
        <span className='cursor-pointer hover:underline'>Sign Out</span>
      </div>
    </div>
  );
}
