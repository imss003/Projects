import React, { useState } from 'react';
import { Input, useTheme } from '@chakra-ui/react';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const theme = useTheme();
    const [isloggedin, setIsloggedin] = useState(false);
  return (
    <div
        style={{background: theme.colors.backGround[800]}}
        className='h-14 w-full text-white border-b-2 border-white'
    >
        <div
            className='flex justify-center h-full w-full'
        >
            <div
                className='flex justify-between w-[90%]  h-full items-center'
            >
                <Link
                    to="/"
                    className=' cursor-pointer'
                >
                    Logo
                </Link>
                <div
                    className='flex w-[50vw] justify-center'
                >
                    <input
                        type="text"
                        placeholder="Type here"
                        className="text-black input input-bordered input-primary rounded-md p-1 flex-grow" 
                    />
                </div>
                <div>
                    <button
                        style={{backgroundColor: theme.colors.backGround}}
                        
                    >
                        {
                            isloggedin ? <div>Account</div> : 
                            <div
                                className='w-20 flex justify-around border-2 rounded-2xl h-10 items-center hover:bg-sky-800'
                            >
                                <CgProfile 
                                    className='text-xl'
                                />
                                Sign In
                            </div>
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar