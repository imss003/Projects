import React from 'react'
import MakeItem from './MakeItem'
const Content = ({items, handleCheck, handleDelete}) => {
    
    return (
        <main className='grow flex flex-col'>
            { items.length ? <ul>
                {items.map((item) => (
                    <MakeItem key={item.id} item = {item} handleCheck={handleCheck} handleDelete={handleDelete}/>
                ))}
            </ul> : 
            <p className='self-center'>No items left...</p>
            }
            
        </main>
    )
}

export default Content