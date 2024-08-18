import React, { useContext, useEffect, useState } from 'react';
import { generateCalendarMonth } from '../Utils.jsx';
import CalendarHeader from '../Components/CalendarHeader.jsx';
import Month from '../Components/Month.jsx';
import SideBar from '../Components/SideBar.jsx';
import { MonthContext } from '../Context/MonthContext.jsx';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const MonthPage = () => {
  // Extracting the year and monthName from the URL parameters
  const { year, monthName } = useParams();

  // Get monthIndex and setMonthIndex from MonthContext
  // If MonthContext is undefined, this will throw an error, so make sure MonthPage is inside MonthProvider
  const { monthIndex, setMonthIndex } = useContext(MonthContext);

  // Local state to hold the generated days for the current month
  const [currentMonth, setCurrentMonth] = useState([]);

  // Effect to set the monthIndex based on the URL's monthName
  useEffect(() => {
    if (monthName) {
      // Create an array of month names ('jan', 'feb', etc.)
      const months = [];
      for (let i = 0; i < 12; i++) {
        months.push(dayjs().month(i).format('MMM').toLowerCase());
      }

      // Find the index of the monthName from the URL in the months array
      const monthIndexFromName = months.indexOf(monthName);

      // If the month name is valid, update the monthIndex in the context
      if (monthIndexFromName !== -1) {
        setMonthIndex(monthIndexFromName);
      }
    }
  }, [monthName, setMonthIndex]);

  // Effect to update the currentMonth state whenever monthIndex or year changes
  useEffect(() => {
    // Ensure monthIndex is defined before generating the calendar month
    if (monthIndex !== undefined) {
      setCurrentMonth(generateCalendarMonth(monthIndex, year));
    }
  }, [monthIndex, year]);

  return (
    <div className='flex flex-col h-screen w-full'>
      <CalendarHeader />
      
      <div className='flex h-full w-full'>
        <div
          className='w-[50%] mr-2'
        >
          <SideBar />
        </div>
        <div
          className='w-full'
        >
          <Month month={currentMonth} />
        </div>
      </div>
    </div>
  );
};

export default MonthPage;
