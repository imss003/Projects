import React from 'react'
import {FaPlus} from 'react-icons/fa'
import { useRef } from 'react'
const AddItem = ({newItem, setNewItem, handleSubmit}) => {
    const inputRef = useRef()
  return (
    <form className='flex pb-4 justify-center' onSubmit={handleSubmit}>
        <label 
            htmlFor="addItem"
            className=' text-xl mr-4 sr-only'
        >
            Add Item
        </label>
        <input 
            autoFocus
            ref={inputRef}
            type="text"
            id="addItem"
            placeholder='Add Item'
            className=' border-2 border-black h-8 w-3/5 bg-slate-300 text-black p-2 placeholder-gray-600 mt-4'
            value = {newItem}
            onChange={(e) => {
                setNewItem(e.target.value);
            }}
        />
        <button
           type='submit'
           aria-label='Add Item' 
           className=' bg-purple-500 w-8 border-black border-2 flex justify-center items-center border-l-0 hover:bg-blue-600 focus:bg-blue-600 mt-4' 
           onClick={() => {
            inputRef.current.focus(); //used to switch the focus to input box once the submit button is clicked.
           }}
        >
            <FaPlus/>
        </button >
    </form>
  )
}

export default AddItem