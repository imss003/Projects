import React from 'react';
import {useTheme} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    const theme = useTheme();
    return (
        <div
            style={{backgroundColor: theme.colors.backGround[900]}}
            className='text-white min-h-screen w-full'
        >
            
            
        </div>
    )
}

export default HomePage