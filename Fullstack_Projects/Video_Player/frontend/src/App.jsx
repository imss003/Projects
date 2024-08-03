import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SearchBar from './components/SearchBar';
import { useTheme } from '@chakra-ui/react';
import SideBar from './components/SideBar';
import LoginPage from './Pages/LoginPage';

function App() {
  const theme = useTheme();

  return (
  
    // <div
    // style={{backgroundColor: theme.colors.backGround[900]}}
    //   className='flex flex-col items-center min-h-screen sm:text-l'
    // >
    //     <div
    //       className='w-full'
    //     >
    //       <div
    //         className='flex'
    //       >
    //         <SideBar/>
    //         <SearchBar/>
    //       </div>
    //       {/* <Routes>
    //         <Route path='/' element={<HomePage/>} />
    //       </Routes> */}
          
    //     </div>
    // </div>
    <div>
      <LoginPage/>
    </div>
    
  )
}

export default App
