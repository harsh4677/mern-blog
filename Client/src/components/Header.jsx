import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

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
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
            <a href="/">Home</a>
          </li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
            <a href="/about">About</a>
          </li>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
            <a href="/projects">Projects</a>
          </li>
        </ul>

        <i
          className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></i>

        <div
          className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 -translate-y-full'
          }`}
          style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
        >
          <ul className="w-full">
            <li className="list-none w-full">
              <a
                href="/"
                className="block text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
              >
                Home
              </a>
            </li>
            <li className="list-none w-full">
              <a
                href="/about"
                className="block text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
              >
                About
              </a>
            </li>
            <li className="list-none w-full">
              <a
                href="/projects"
                className="block text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
              >
                Projects
              </a>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          {/* Toggle button here */}
          <button className="btn btn-square btn-ghost">
            <label className="swap swap-rotate w-12 h-12">
              <input
                type="checkbox"
                onChange={handleToggle}
                // show toggle image based on localstorage theme
                checked={theme === "light" ? false : true}
              />
              {/* light theme sun image */}
              <img src={sun} alt="light" className="w-8 h-8 swap-on" />
              {/* dark theme moon image */}
              <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
            </label>
          </button>
        </div>

        <div>
          <Link to='/sign-in'>
            <button className="px-6 py-4 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all">
              Sign In
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}
