import React, { useState } from 'react'
import Day from './Day.jsx'

const Month = ({month}) => {
    return (
        <div
            className='grid grid-rows-5 w-full h-full overflow-auto'
        >
            {month.map((week, i) => (
                <div
                    className='w-full h-full grid grid-cols-7 cursor-pointer'
                    key={i}
                >
                    {week.map((day, j) =>(
                        <Day
                            day = {day}
                            key = {j}
                            idx = {i}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Month