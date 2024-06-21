import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'
const MakeItem = ({item, handleCheck, handleDelete}) => {
  return (
    <li key={item.id} className=' text-xl bg-gray-200 flex border-black border-b-2 justify-between pt-4'>
        <div>
            <input 
                type="checkbox"
                checked={item.checked} 
                className='w-6 h-7 ml-4'
                onChange={() => {
                    handleCheck(item.id);
                }}
            />
            <label className='p-4 focus:underline' style={(item.checked) ? {textDecoration: 'line-through'} : null}>{item.name}</label>

        </div>
        <FaTrashAlt
            role='button'
            className=' hover:text-red-500 w-6 h-6 text-gray-600'
            onClick={() => handleDelete(item.id)}
        />
    </li>
  )
}

export default MakeItem