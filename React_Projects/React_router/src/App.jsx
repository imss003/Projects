import { useState } from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
function App() {
  return (
    <div
      className='flex flex-col items-center'
    >
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
