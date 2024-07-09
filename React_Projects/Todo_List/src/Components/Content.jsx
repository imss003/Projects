import React, { useEffect, useState } from 'react'
import CreateItem from './CreateItem'
import EditItem from './EditItem';
import { useTodo } from '../Contexts/TodoContext';


const Content = ({array, editable, setEditable, updatedname, setUpdatedname, editID, setEditID, editTodo, takeref, inputref}) => {
    const {updateTodo, addTodo, deleteTodo, checkTodo} = useTodo();
    // console.log("Array is: ",array);
    return (
        <div 
            className='w-4/5 flex'
        >
            <ul
            className='w-full'
            >
                {array.map((todo) => (
                    <li
                        key={todo.id}
                        className='flex flex-col items-start w-full mb-2 '
                    >
                        <div
                        className='flex items-center mb-2'
                        >
                            <input 
                                type="checkbox" 
                                id={todo.id}
                                onChange={() => {checkTodo(todo.id);
                                }}
                                className='h-8 w-8 mt-2 cursor-pointer'
                                defaultChecked = {todo.done}
                            />
                            <input 
                            // ref={editID === todo.id && editID != 0 ? takeref :  null}
                            htmlFor={todo.id}
                            value={editable && editID === todo.id ? updatedname: todo.name}
                            onChange={(e) => {
                                setUpdatedname(e.target.value);
                            }}
                            className={`text-white text-lg pl-2 bg-inherit ${todo.done === true ? "line-through":"none"} ${editable && todo.id === editID ? "border-2 border-black" : ""}`}
                            readOnly = {!editable}
                            />
                        </div>
                        {(editable === false) ? <div
                        className='flex justify-between w-full'
                        >
                            <button
                            className='bg-sky-500 text-white w-1/2
                            mr-1 hover:bg-blue-700 '
                            onClick={() => {
                                setEditID(todo.id);
                                editTodo(todo);
                                console.log("working with id: ", todo.id)
                                
                            }}
                            >
                                Edit
                            </button>
                            <button
                                type='button'
                                onClick={() => {deleteTodo(todo.id)
                                inputref.current.focus();
                                }}
                                className=' w-1/2 bg-red-600 h-6 hover:bg-red-500 hover:text-white'
                            >
                                Delete
                            </button>
                        </div> : 
                        (todo.id === editID ?<div
                        className='flex justify-between w-full'
                        >
                        <button
                            className='bg-blue-700 text-white w-1/2
                            mr-1 hover:bg-slate-500 '
                            onClick={() => {
                            updateTodo(todo.id, updatedname);
                            setEditable(false);
                            }}
                        >
                            Save
                        </button>
                        <button
                            className=' w-1/2 bg-red-600 h-6 hover:bg-red-500 hover:text-white'
                            onClick={() => {
                            setEditable(false);
                            }}
                        >
                            Cancel
                        </button>
                        </div> :  <div
                        className='flex justify-between w-full'
                        >
                            <button
                            className='bg-blue-700 text-white w-1/2
                            mr-1 hover:bg-slate-500 '
                            onClick={() => {
                                editTodo(todo);
                                setEditID(todo.id)
                                console.log("working with id: ", todo.id)
                                takeref.current.select();
                                takeref.current.focus();
                                
                            }}
                            >
                                Edit
                            </button>
                            <button
                                type='button'
                                onClick={() => {deleteTodo(todo.id)
                                inputref.current.focus();
                                }}
                                className=' w-1/2 bg-red-600 h-6 hover:bg-red-500 hover:text-white'
                            >
                                Delete
                            </button>
                        </div>)
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content