import React from 'react'

const AddItem = ({items, item, setItem, handleSubmit}) => {
    return (
        <div
            className=' flex justify-center w-full'
        >
            <div 
                className='flex flex-col items-center bg-slate-300 w-4/5' 
            >
                <h2 
                    className='text-xl mt-2 mb-2'
                >
                    What needs to be done?
                </h2>
                <form 
                    className='flex flex-col w-4/5'
                    
                >
                    <input 
                        autoFocus
                        type="text" 
                        id='input_box'
                        placeholder='Enter new task'
                        className=' border-black border-2 pl-1 h-10 text-xl mb-2'
                        value={item}
                        onChange={(e) => {
                            setItem(e.target.value)
                        }}
                    />
                    <label 
                        htmlFor="#input_box"
                        className=' sr-only'
                    >
                        Enter new tasks
                    </label>
                    <button
                        type='submit'
                        className=' bg-gray-700 text-white h-8 hover:bg-slate-500 hover:border-black hover:border-2'
                        onClick={handleSubmit}
                    >   
                        Add
                    </button>
                </form>
                
            </div>
        </div>
    )
}

export default AddItem