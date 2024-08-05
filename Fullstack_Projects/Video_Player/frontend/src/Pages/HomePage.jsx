import React from 'react';
import {useTheme} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import VideoComponent from '../components/VideoComponent';

const HomePage = () => {
    const theme = useTheme();
    return (
        <div
            style={{backgroundColor: theme.colors.backGround[800]}}
            className='text-white h-full w-full flex'
        >
            <div
                className=''
            >
                <VideoComponent/>
            </div>
            
        </div>
    )
}

export default HomePage