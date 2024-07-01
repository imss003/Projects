import React from 'react'

const DisplayFlag = ({code}) => {
    console.log(`code is ${code}`);
    const URL = `https://flagsapi.com/${code}/flat/32.png`
    return (
        <img 
            src={URL} 
            alt={`Flag for ${code}`} 
        />
    )
}

export default DisplayFlag