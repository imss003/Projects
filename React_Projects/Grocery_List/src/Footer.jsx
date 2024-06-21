import React from 'react'

const Footer = ({items}) => {
  return (
    <footer className=' bg-zinc-700 text-white text-2xl p-4 text-center'>
        <h1>{items.length} {items.length === 1 ? 'Item': 'Items'}</h1>
    </footer>
  )
}

export default Footer