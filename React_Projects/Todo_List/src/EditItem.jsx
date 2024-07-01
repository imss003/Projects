import React from 'react'

const EditItem = () => {
  return (
    <div>
        <form
            className='flex flex-col'
        >
            <input 
                type="text" 
                placeholder='Enter new name'
                className=' border-black border-2 pl-2'  
            />
            <div
                className='flex mt-2'
            >
                <button
                className=' grow border-black border-2 mr-2 hover:bg-gray-500 hover:text-white'
                >
                Save
                </button>
                <button
                className=' grow border-red-600 border-2 bg-red-600 text-black hover:bg-red-500 hover:border-black hover:text-white'
                >
                Cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default EditItem