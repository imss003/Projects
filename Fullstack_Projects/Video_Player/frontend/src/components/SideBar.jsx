import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
const SideBar = ({isExpanded, handleSidebarToggle}) => {
    
    const theme = useTheme();
  return (
    <div
        
        className={`pl-2 flex flex-col text-white h-screen w-10 ${isExpanded ? 'w-36': ''} border-r-2 border-white ${isExpanded ? "z-50":""} ${isExpanded ? "absolute" : "relative"} `}
        style={{backgroundColor: theme.colors.backGround[800]}}
    >
        <div
            className='h-14 flex items-center w-fit'
        >
            <GiHamburgerMenu 
                className='text-white cursor-pointer text-xl hover:text-gray-400'
                onClick={handleSidebarToggle}
            />
        </div>
        <div
            style={isExpanded === false ? {backgroundColor: theme.colors.backGround[800]} : {}}
            className={`h-screen ${isExpanded ? 'mr-4' : ""} `}
        >
            <div>
                <Link
                    to="/"
                    className='h-14 flex items-center'
                >
                    <div
                        className='mr-2 text-xl'
                    >
                        <FaHome />
                    </div>
                    <div
                        className={`${isExpanded ? '': 'hidden'} hover:underline`}
                    >
                        Home
                    </div>
                </Link>
            </div>
            <div
                className='h-14 flex items-center'
            >
                <div
                    className='mr-2 text-xl cursor-pointer'
                >
                    <MdSubscriptions />
                </div>
                
                <div
                    className={`${isExpanded ? '': 'hidden'} hover:underline cursor-pointer`}
                >
                    Subcriptions
                </div>
            </div>
            <div
                className='flex items-center h-14 '
            >
                <div
                    className='mr-2 text-xl cursor-pointer'
                >
                    <MdAccountBox />
                </div>
                <div
                    className={`${isExpanded ? '': 'hidden'} hover:underline cursor-pointer`}
                >
                    Your channel
                </div>
            </div>
        </div>

    </div>
  )
}

export default SideBar