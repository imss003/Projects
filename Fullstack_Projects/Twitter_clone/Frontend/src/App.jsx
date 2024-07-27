import { useState } from 'react'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/auth/login/LoginPage'
import SignUpPage from './pages/auth/signup/SignUpPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SideBar from './components/common/SideBar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import {Toaster} from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'

function App() {
  const {data: authUser, isLoading, error, iserror} = useQuery({
    queryKey: ["authUser"],
    queryFn: async() => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(data.error){
          return null;
        }
        if(data.error){
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false
  })

  return (
    <div
      className='flex max-w-6xl mx-auto'
    >
      {authUser && <SideBar/>} {/* this will be a common component for all the routes because it is not inside the routes */}
      
      <Routes>
        <Route 
          path='/' 
          element={ authUser ? <HomePage /> : <Navigate to="/login"/>} 
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage/> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={ !authUser ? <SignUpPage/> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={ authUser ? <NotificationPage/> : <Navigate to = "/login" />}
        />
        <Route
          path="/profile/:username"
          element={ authUser ? <ProfilePage/> : <Navigate to="/login" />}
        />
      </Routes>
      {authUser && <RightPanel/>}
      <Toaster/>
    </div>
  )
}

export default App
