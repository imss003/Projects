import React from 'react'

const CreateItem = ({i, handleCheck, handleDelete,editing}) => {
  
  return (
    <div
      className='flex flex-col'
    >
      <div 
        className='flex is-end'
      >
        <input 
          type="checkbox"
          defaultChecked= {i.checked}
          id={i.id} 
          className=' w-8 h-8'
          onChange={() => {
            handleCheck(i.id)
          }}

        />
        <label 
          htmlFor={i.id}
          className='text-lg pl-2 '
          style={(i.checked) ? { textDecoration: 'line-through' } : null}
        >
          {i.name}
        </label>
      </div>
      <div 
        className='flex justify-between mt-2'
      >
        <button
          className=' grow border-black border-2 mr-2 hover:bg-gray-500 hover:text-white'
          onClick={() => {
            editing(i.id);
          }}
        >
          <span>Edit</span>
          <span 
            className='sr-only'
          >
            Task
          </span>
        </button>
        <button
          className=' grow border-red-600 border-2 bg-red-600 text-black hover:bg-red-500 hover:border-black hover:text-white'
          onClick={() => {
            handleDelete(i.id)
          }}
        >
          <span>Delete</span>
            <span 
              className='sr-only'
            >
              Task
          </span>
        </button>
      </div>
    </div>
  )
}

export default CreateItem