export default function CallToAction() {
    return (
      <div className='flex flex-col sm:flex-row p-6 border-2 border-teal-500 bg-white shadow-lg justify-center items-center rounded-tl-3xl rounded-br-3xl text-center transform transition-all duration-300 hover:shadow-2xl'>
        <div className="flex-1 justify-center flex flex-col px-4 sm:px-8">
          <h2 className='text-3xl font-bold text-teal-600 mb-3'>
            Want to Learn More About JavaScript?
          </h2>
          <p className='text-gray-600 mb-4'>
            Explore these resources featuring 100 JavaScript Projects that will enhance your skills.
          </p>
          <a 
            href="https://www.100jsprojects.com" 
            target='_blank' 
            rel='noopener noreferrer' 
            className='inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-tl-xl rounded-bl-none transition-transform duration-300 hover:scale-110 hover:from-purple-600 hover:to-pink-600'
          >
            100 JavaScript Projects
          </a>
        </div>
        <div className="p-7 flex-1">
          <img 
            src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" 
            alt="JavaScript Projects" 
            className='w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
          />
        </div>
      </div>
    )
  }
  