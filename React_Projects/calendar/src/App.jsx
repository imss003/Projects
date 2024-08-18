import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import MonthPage from './Pages/MonthPage'
import AllMonths from './Pages/AllMonthsPage'
import EventModal from './Components/EventModal'
import { MonthContext } from './Context/MonthContext'

const App = () => {
  const {eventModalShow} = useContext(MonthContext);
  return (
    <div>
      {eventModalShow && <EventModal/>}
      <Routes>
        <Route path="/:year/:monthName" element={<MonthPage />} />
        <Route path="/:year" element={<AllMonths/>} />
      </Routes>
    </div>
  )
}

export default App