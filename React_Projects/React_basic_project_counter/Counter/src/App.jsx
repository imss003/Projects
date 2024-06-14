import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(10)
  function addcount(){
    setCount(count + 1);
    if(count >= 20){
      setCount(20);
    }
  }
  function removecount(){
    setCount(count - 1);
    if(count <= 0){
      setCount(0);
    }
  }
  return (
    <>
      <h2>Counter: {count}</h2>
      <button onClick={addcount}>Add Count</button>
      
      <button onClick={removecount}>Remove Count</button>
    </>
  )
}

export default App
