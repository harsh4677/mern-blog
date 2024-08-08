import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <footer className='border  border-t-8 border-teal-500 bg-gray-100 dark:bg-gray-900 rounded-lg'>
      <div className='w-full max-w-7xl mx-auto p-4'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-gray-900 dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                B
              </span>
              Spot
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <h5 className='text-lg font-medium text-gray-900 dark:text-white'>About</h5>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a
                    href='https://www.100jsprojects.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-600 dark:text-gray-300 hover:underline'
                  >
                    100 JS Projects
                  </a>
                </li>
                <li>
                  <Link
                    to='/about'
                    className='text-gray-600 dark:text-gray-300 hover:underline'
                  >
                    B Spot
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className='text-lg font-medium text-gray-900 dark:text-white'>Follow us</h5>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a
                    href='https://www.github.com/sahandghavidel'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-600 dark:text-gray-300 hover:underline'
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-600 dark:text-gray-300 hover:underline'
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className='text-lg font-medium text-gray-900 dark:text-white'>Legal</h5>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-gray-600 dark:text-gray-300 hover:underline'
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-600 dark:text-gray-300 hover:underline'
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-300 dark:border-gray-700 pt-4'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <span className='text-gray-600 dark:text-gray-300 text-sm'>
              &copy; {new Date().getFullYear()} Sahand's Blog. All rights reserved.
            </span>
            <div className='flex mt-4 sm:mt-0 space-x-6'>
              <a href='#' className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'>
                <BsFacebook size={24} />
              </a>
              <a href='#' className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'>
                <BsInstagram size={24} />
              </a>
              <a href='#' className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'>
                <BsTwitter size={24} />
              </a>
              <a
                href='https://github.com/sahandghavidel'
                className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              >
                <BsGithub size={24} />
              </a>
              <a href='#' className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'>
                <BsDribbble size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
