
export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
              Want to learn HTML, CSS and JavaScript by building fun and engaging projects?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 JavaScript Projects
            </p>
            <button className='px-6 py-4  text-xl font-medium rounded-se-xl bg-gradient-to-r from-teal-400 to-teal-700 hover:from-green-500 hover:to-green-600 ... '>
                <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                    100 JavaScript Projects
                </a>
            </button>
        </div>
        <div className="px-4 py-10 flex ">
            <img src="https://i.pinimg.com/564x/d1/35/56/d13556ec053cffc2410a682ee33436d6.jpg" />
        </div>
    </div>
  )
}