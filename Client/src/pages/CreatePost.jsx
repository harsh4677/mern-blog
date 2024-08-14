import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className='p-6 max-w-4xl mx-auto min-h-screen bg-gray-100 rounded-lg shadow-lg'>
      <h1 className='text-center text-4xl font-bold text-gray-800 mb-6'>Create a Post</h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-6 sm:flex-row sm:gap-8'>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1 border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
          />
          <select
            className='border border-gray-300 rounded-lg p-3 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
            defaultValue='uncategorized'
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </select>
        </div>
        <div className='flex gap-4 items-center border-2 border-teal-500 border-dotted p-4 rounded-lg bg-white shadow-sm'>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='border border-gray-300 rounded-lg p-2 text-gray-700'
          />
          <button
            type='button'
            className='bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 transition duration-300'
          >
            Upload Image
          </button>
        </div>
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-80 mb-12 border border-gray-300 rounded-lg shadow-sm'
          required
        />
        <button
          type='submit'
          className='bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition duration-300'
        >
          Publish
        </button>
      </form>
    </div>
  );
}
