import React from 'react'

const SearchItem = ({searchItem, setSearchItem}) => {
  return (
    <form className=' flex justify-center'>
        <input 
            type="text"
            role='searchbox'
            placeholder='Search Items'
            className=' border-black border-2 pl-2 w-3/5 mb-4 bg-slate-300 placeholder-gray-600' 
            onChange={() => {
                setSearchItem(event.target.value)
            }}
        />

    </form>
  )
}

export default SearchItem