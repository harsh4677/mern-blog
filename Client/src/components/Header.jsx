// import React, { useState } from 'react'

// export default function Header() {

//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   return (
//     <div>
//       <header className='flex justify-between items-center
//        text-black py-8 px-10  md:px-32  bg-white drop-shadow-md'>
//         <a href='/' className='px-2 py-1 bg-gradient-to-r'>
//           <span className='px-5 py-4 bg-gradient-to-r
//            from-indigo-500 via-purple-500 to-pink-500 
//            rounded-3xl text-white font-bold ' > 
//             B
//           </span>
//           Spot
//         </a>

//         <ul className='hidden xl:flex items-center gap-12 font-semibold  text-base ' >
//           <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md translate-all cursor-pointer'>Home</li>
//           <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md translate-all cursor-pointer'>About</li>
//           <li className='p-3 hover:bg-sky-400 hover:text-white rounded-md translate-all cursor-pointer'>Projects</li>
//         </ul>

//         <div className='relative hidden md:flex items-center justify-center gap-3'>
//            <i className='bx bx-search absolute left-3 text-2xl text-gray-500 '/>
//            <input type='text' placeholder='Search...' className='py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500 '/>
//         </div>

//         <i className='bx bx-menu xl:hidden block text-5xl cursor-pointer
//         ' onClick={()=> setIsMenuOpen(!isMenuOpen)}></i>


//         <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
//         style={{transition: 'transform 0.3s ease, opacity 0.3 ease'}}>
//           <li className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer '>Home</li>
//           <li className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer '>About</li>
//           <li className='list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer '>Projects</li>
//         </div>

//       </header>
      
//     </div>
//   )
// }

import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <header className="flex justify-between items-center text-black py-8 px-10 md:px-32 bg-white drop-shadow-md">
        <a href="/" className="px-2 py-1 bg-gradient-to-r">
          <span className="px-5 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl text-white font-bold">
            B
          </span>
          Spot
        </a>

        <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
          />
        </div>

        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Home</li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">About</li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Projects</li>
        </ul>

        <i
          className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></i>

        <div
          className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transition-transform ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
        >
          <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
            Home
          </li>
          <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
            About
          </li>
          <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
            Projects
          </li>
        </div>
      </header>
    </div>
  );
}
