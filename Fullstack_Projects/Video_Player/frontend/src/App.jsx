import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SearchBar from './components/SearchBar';
import { useTheme } from '@chakra-ui/react';
import SideBar from './components/SideBar';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import { useState } from 'react';

function App() {
  const theme = useTheme();
  const isloggedin = true;
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSidebarToggle = () => {
    setIsExpanded(!isExpanded);
  }
  return (
    <div
    style={{backgroundColor: theme.colors.backGround[900]}}
      className='h-screen sm:text-l w-screen'
    >
      <div
          className = {`w-full flex h-full `}
        >
          <div
            className={`flex h-full ${isExpanded ? 'z-10 absolute' : 'relative'}`}
          >
            {isloggedin && (
              <div
                className={`w-10 transition-width duration-300`}
              >
                <SideBar
                  isExpanded = {isExpanded}
                  handleSidebarToggle = {handleSidebarToggle}
                />
              </div>)}
          </div>
          <div
            className={` h-full flex flex-col flex-grow ${isExpanded ? 'ml-10':''}`}
          >
            {isloggedin && <SearchBar/>}
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/signup' element={<SignUpPage/>} />
            </Routes>
          </div>
        </div>
    </div>
    
  )
}

export default App
