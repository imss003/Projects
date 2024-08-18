import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { MonthContext } from '../Context/MonthContext';
import { useNavigate } from 'react-router-dom';

const CalendarHeader = () => {
  const { setSelectedDay, monthIndex, setMonthIndex } = useContext(MonthContext);
  const navigate = useNavigate();
  const [year, setYear] = useState(dayjs().year());
  const [monthName, setMonthName] = useState(dayjs().month());

  const monthAbbreviations = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  const monthNames = {
    jan: 'January',
    feb: 'February',
    mar: 'March',
    apr: 'April',
    may: 'May',
    jun: 'June',
    jul: 'July',
    aug: 'August',
    sep: 'September',
    oct: 'October',
    nov: 'November',
    dec: 'December',
  };

  const handleMonthChange = (newMonthIndex) => {
    setMonthIndex(newMonthIndex);
    const newMonth = dayjs().month(newMonthIndex).format('MMM').toLowerCase();
    const newYear = dayjs().month(newMonthIndex).year();
    navigate(`/${newYear}/${newMonth}`);
    setSelectedDay(null);
  };

  return (
    <header>
      <div className='flex items-center'>
        <img
          src="../public/HeaderLogo.png"
          alt="Logo"
          style={{
            height: '50px',
            width: 'auto',
          }}
        />
        <h1 className='text-3xl text-gray-600'>
          TaskTracker
        </h1>
      </div>
      <div className='mt-2 mb-2 flex items-center'>
        <button
          className="mr-2 bg-gray-200 rounded-md p-1 cursor-pointer hover:bg-gray-300"
          onClick={() => handleMonthChange(dayjs().month())}
        >
          Today
        </button>
        <button
          className="mr-2 bg-gray-200 rounded-md p-1 cursor-pointer hover:bg-gray-300"
          onClick={() => handleMonthChange(monthIndex - 1)}
        >
          Previous
        </button>
        <button
          className="mr-2 bg-gray-200 rounded-md p-1 cursor-pointer hover:bg-gray-300"
          onClick={() => handleMonthChange(monthIndex + 1)}
        >
          Next
        </button>
        <h2 className='text-xl text-gray-600 ml-4'>
          {dayjs().month(monthIndex).format('MMMM YYYY')}
        </h2>
        
      </div>
    </header>
  );
};

export default CalendarHeader;