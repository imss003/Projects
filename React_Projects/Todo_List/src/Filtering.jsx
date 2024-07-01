import React from 'react'

const Filtering = ({setFilter, items}) => {
  return (
    <div
        className='flex justify-center flex-col items-center'
    >
        <div 
        className=' w-3/5 flex justify-between mt-2'
    >
        <button
            className=' bg-blue-200 w-28 flex justify-center h-8 items-center border-gray-400 border-2 hover:border-black hover:cursor-pointer hover:bg-sky-300 hover:font-medium'
            onClick={() => {
                setFilter('All');
            }}
        >
            <span
                className='sr-only'
            >
                Show
            </span>
            <span>
                All
            </span>
            <span
                className='sr-only'
            >
                Tasks
            </span>
        </button>
        <button
            className=' bg-blue-200 w-28 flex justify-center h-8 items-center border-gray-400 border-2 hover:border-black hover:cursor-pointer hover:bg-sky-300 hover:font-medium'
            onClick={() => {
                setFilter('active');
            }}
        >
        <span
                className='sr-only'
            >
                Show
            </span>
            <span>
                Active
            </span>
            <span
                className='sr-only'
            >
                Tasks
            </span>
        </button>
        <button
            className=' bg-blue-200 w-28 flex justify-center h-8 items-center border-gray-400 border-2 hover:border-black hover:cursor-pointer hover:bg-sky-300 hover:font-medium'
            onClick={() => {
                setFilter('completed');
            }}
        >
        <span
                className='sr-only'
            >
                Show
            </span>
            <span>
                Completed
            </span>
            <span
                className='sr-only'
            >
                Tasks
            </span>
        </button>
        
    </div>
    
    </div>
  )
}

export default Filtering