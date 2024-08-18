import React, { useContext, useState, useEffect } from 'react';
import { MonthContext } from '../Context/MonthContext';
import { EventContext } from '../Context/EventContext';
import dayjs from 'dayjs';
import { FaEdit, FaFilter } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useParams } from 'react-router-dom';

const SideBar = () => {
  const { year, monthName } = useParams();
  console.log("year is: ", year, "monthname is: ", monthName)
  const { selectedDay, setEventModalShow, setSelectedDay } = useContext(MonthContext);
  const { events, deleteEvent, setSelectedEvent } = useContext(EventContext);

  // State for the selected filter
  const [filter, setFilter] = useState('All');
  const [showDetails, setShowDetails] = useState(null); // Track which event's details are being shown

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
    'dec'
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
    dec: 'December'
  };
  const index = monthAbbreviations.indexOf(monthName);
  // Filter events for the selected month and tag
  const filteredEvents = selectedDay ? events
    .filter(event => dayjs(event.date).isSame(selectedDay, 'month'))
    .filter(event => filter === 'All' || event.tag === filter) : events
    .filter(event => {
      const eventDate = dayjs(event.date);
      return eventDate.year() === parseInt(year) && eventDate.month() === monthAbbreviations.indexOf(monthName);
    })
    .filter(event => filter === 'All' || event.tag === filter);

  return (
    <div className='w-full'>
      <div className='flex justify-between mb-2'>
        <h1 className='text-l font-semibold'>
          All Events of {selectedDay ? selectedDay.format('MMMM YYYY') : `${monthNames[monthAbbreviations[index]]} ${year}`}
        </h1>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <FaFilter className="mr-1" />
              {filter} <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <p
                  onClick={() => setFilter('All')}
                  className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  All
                </p>
              </MenuItem>
              <MenuItem>
                <p
                  onClick={() => setFilter('Work')}
                  className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  Work
                </p>
              </MenuItem>
              <MenuItem>
                <p
                  onClick={() => setFilter('Personal')}
                  className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                >
                  Personal
                </p>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <ul>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <li key={event.id} className='bg-gray-200 mb-2'>
              <div className='flex flex-col'>
                <div className='flex'>
                  <div className='flex items-center mr-1'>
                    <button
                      onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}
                    >
                      <CgDetailsMore />
                    </button>
                  </div>
                  <div className='flex justify-between w-[80%] p-1'>
                    <div>{event.title}</div>
                    <div>{dayjs(event.date).format("DD MMMM YYYY")}</div>
                  </div>
                  <div className='flex md:ml-2 ml-4'>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setEventModalShow(true);
                      }}
                    >
                      <FaEdit
                        className='hover:text-gray-600'
                      />
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className='hover:text-gray-600 ml-2'
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
                {showDetails === event.id && (
                  <div className='p-2 bg-gray-100 mt-2 rounded-md'>
                    <h2 className='font-semibold underline'>Description:</h2>
                    <p>{event.description}</p>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>No events for this month</li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
