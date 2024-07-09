import React from 'react'

const Filtering = ({setFilter}) => {
  return (
    <div
        className='flex justify-center flex-col items-center w-full mb-2'
    >
        <div 
        className=' w-full flex justify-evenly mt-2'
    >
        <button
            className=' bg-blue-200 w-1/4 flex justify-center h-8 items-center border-gray-400 border-2 hover:border-black hover:cursor-pointer hover:bg-sky-300 hover:font-medium'
            onClick={() => {
                setFilter('All');
            }}
        >
            <span
                className='sr-only'
            >
                Show
            </span>
            <span
                className='text-sm'
            >
                All
            </span>
            <span
                className='sr-only'
            >
                Tasks
            </span>
        </button>
        <button
            className=' bg-blue-200 w-1/4 flex justify-center h-8 items-center border-gray-400 border-2 hover:border-black hover:cursor-pointer hover:bg-sky-300 hover:font-medium'
            onClick={() => {
                setFilter('active');
            }}
        >
        <span
                className='sr-only'
            >
                Show
            </span>
            <span
                className='text-sm'
            >
                Active
            </span>
            <span
                className='sr-only'
            >
                Tasks
            </span>
        </button>
        <button
            className=' bg-blue-200 w-1/4 flex justify-center h-8 items-center border-gray-400 border-2 hover:border-black hover:cursor-pointer hover:bg-sky-300 hover:font-medium'
            onClick={() => {
                setFilter('completed');
            }}
        >
        <span
                className='sr-only'
            >
                Show
            </span>
            <span
                className='text-sm'
            >
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