import { useState } from 'react'


function App() {
  const [name, setName] = useState('')
  return (
    <div className='flex justify-center items-center min-h-screen flex-col'>
      <div 
        className=' border-black border-2 w-32 h-32'
        style = {{backgroundColor: name}}
      >

      </div>
      <form >
        <label 
        htmlFor="#Color"
        className=' sr-only'>
            Enter Color
        </label>
        <input 
          autoFocus
          type="text" 
          id='Color'
          className=' border-black border-2 mt-2 pl-2 pt-1 pb-1'
          placeholder='Enter Color'
          onChange={(e)=> setName(e.target.value)}
        />
        
      </form>
    </div>
  )
}

export default App
