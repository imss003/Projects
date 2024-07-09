import React, { useState } from 'react'
import { useTodo } from '../Contexts/TodoContext'

const AddItem = ({inputref}) => {
    const {addTodo} = useTodo();
    const [todoname, setTodoname] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = {
            id: Date.now(),
            name: todoname,
            done: false
        }
        addTodo(todo);
        setTodoname("");
    }
    return (
        <div
            className=' flex justify-center w-full'
        >
            <div 
                className='flex flex-col items-center w-full' 
            >
                <h2 
                    className='text-xl mt-2 mb-2 text-white'
                >
                    What needs to be done?
                </h2>
                <form 
                    className='flex flex-col w-4/5'
                    onSubmit={handleSubmit}
                >
                    <input 
                        autoFocus
                        type="text" 
                        id='input_box'
                        placeholder='Enter new task'
                        className=' border-black border-2 pl-1 h-10 text-xl mb-2'
                        value={todoname}
                        onChange={(e) => {
                            setTodoname(e.target.value)
                        }}
                        ref={inputref}
                    />
                    <label 
                        htmlFor="#input_box"
                        className=' sr-only'
                    >
                        Enter new tasks
                    </label>
                    <button
                        type='submit'
                        className=' bg-pink-400 text-white h-8 hover:bg-pink-700 hover:border-black hover:border-2'
                    >   
                        Add
                    </button>
                </form>
                
            </div>
        </div>
    )
}

export default AddItem