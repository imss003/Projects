import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
const SideBar = () => {
    const [visible, setVisible] = useState(false);
    console.log("here");
    const handleClick = () => {
        console.log("went in");
        setVisible(!visible);
        console.log("visible is: ", visible);
    }
    const theme = useTheme();
  return (
    <div
        
        className={`pl-2 flex flex-col text-white min-h-screen w-fit fixed top-0 left-0 z-40 ${visible ? '': 'bg-opacity-0'}`}
        style={{backgroundColor: theme.colors.backGround[800]}}
    >
        <div
            className='h-14 flex items-center'
        >
            <GiHamburgerMenu 
                className='text-white cursor-pointer text-xl hover:text-gray-400'
                onClick={handleClick}
            />
        </div>
        <div
            style={visible === false ? {backgroundColor: theme.colors.backGround[800]} : {}}
            className={`min-h-screen ${visible ? 'mr-4' : ""}`}
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
                        className={`${visible ? '': 'hidden'} hover:underline`}
                    >
                        Home
                    </div>
                </Link>
            </div>
            <div
                className='h-14 flex items-center'
            >
                <div
                    className='mr-2 text-xl'
                >
                    <MdSubscriptions />
                </div>
                
                <div
                    className={`${visible ? '': 'hidden'}`}
                >
                    Subcriptions
                </div>
            </div>
            <div
                className='flex items-center h-14 '
            >
                <div
                    className='mr-2 text-xl'
                >
                    <MdAccountBox />
                </div>
                <div
                    className={`${visible ? '': 'hidden'}`}
                >
                    Your channel
                </div>
            </div>
        </div>

    </div>
  )
}

export default SideBar