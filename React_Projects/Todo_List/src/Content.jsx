import React, { useEffect, useState } from 'react'
import CreateItem from './CreateItem'
import EditItem from './EditItem';


const Content = ({items, handleDelete, handleCheck, edit, setEdit}) => {
    console.log('received item is: ', items);
    return (
        <div 
            className='flex justify-center w-full flex-col items-center'
        >
            <div
                className='w-3/5'
            >
                <div 
                    className=' self-start text-2xl mt-4 mb-2 font-semibold text-gray-600'
                >
                    {items.length} {items.length === 1 ? 'task' : 'tasks'}
                </div>
            </div>
            <ul
                className='mb-4 w-3/5'
                >
                {items.map((i) => (
                    <li 
                        key={i.id}
                        className='mt-2 bg-slate-200'
                    >
                        {edit === i.id ?
                        <EditItem/>  : 
                        <CreateItem
                            i = {i}
                            handleCheck={handleCheck}
                            handleDelete={handleDelete}
                            edit={edit}
                            setEdit={setEdit}
                        />}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content