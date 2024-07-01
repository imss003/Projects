import React from 'react'
import {Link, NavLink} from 'react-router-dom'
const Header = () => {
  return (
    <header
        className='flex justify-between w-3/4 mt-2 mb-2'
    >
            <Link
                to="/"
                className='hover:border-2 hover:border-gray-400'
            >
                <img 
                    src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" 
                    alt="" 
                    className=' h-12 w-auto '
                />
            </Link>
            <ul
                className='flex'
            >
                <li>
                    <NavLink
                        to=""
                        className='mr-4 text-gray-600 hover:text-black hover:underline'
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className='mr-4 text-gray-600 hover:text-black hover:underline'
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/contact'
                        className='mr-4 text-gray-600 hover:text-black hover:underline'
                    >
                        Contact us
                    </NavLink>
                </li>
            </ul>
            <div>
                <button
                    className='bg-gray-300 mr-2 rounded-md p-2 hover:bg-red-600 hover:text-white'
                >
                    Login
                </button>
                <button
                    className='bg-gray-300 hover:bg-red-600 hover:text-white rounded-md p-2'
                >
                    Get Started
                </button>
            </div>
    </header>
  )
}

export default Header