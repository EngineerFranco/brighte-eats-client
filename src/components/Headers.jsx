import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineFastfood } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev); 
    console.log(isMenuOpen)
  };

  return (
    <header className='bg-gray-100 shadow-black/20 shadow-md w-full flex md:flex-row justify-between items-center h-16 p-4 text-green-900 font-medium'>
    <div className='flex justify-center items-center gap-2'>
      <MdOutlineFastfood className='text-green-500 text-2xl md:text-3xl' />
      <h1 className='uppercase font-medium text-sm text-green-900 cursor-pointer sm:text-xl md:text-2xl sm:tracking-widest tracking-tight'>
        Brighte Eats
      </h1>
    </div>

    <div className={`md:hidden ${isMenuOpen && 'fixed right-4'} `}>
      <RxHamburgerMenu className='text-3xl cursor-pointer' onClick={toggleMenu} />
    </div>
  
    <nav className={`mt-2 md:mt-0 ${isMenuOpen ? 'block fixed top-10 w-fit right-4 bg-green-100 border-green-200 shadow-lg shadow-green-950 border p-4 z-10' : 'hidden'} md:block`}>
      <ul className={`flex flex-col md:flex-row justify-center items-center gap-5 font-normal md:static md:bg-transparent md:shadow-none md:border-none md:py-0 md:px-0`}>
        <Link to={"/"}>
          <li className='cursor-pointer hover:text-green-600 transition-all duration-300 ease-in-out hover:scale-105'>Home</li>
        </Link>
        <Link to={"/about"}>
          <li className='cursor-pointer hover:text-green-600 transition-all duration-300 ease-in-out hover:scale-105'>About</li>
        </Link>
        <Link to={"/dashboard/lead"}>
          <li className='cursor-pointer hover:text-green-600 transition-all duration-300 ease-in-out hover:scale-105'>Dashboard</li>
        </Link>
      </ul>
    </nav>

  </header>
  
  )
}

export default Headers;
