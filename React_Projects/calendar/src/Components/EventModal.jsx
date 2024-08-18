import React, { useContext, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { MonthContext } from '../Context/MonthContext';
import { EventContext } from '../Context/EventContext';
import dayjs from 'dayjs';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const EventModal = () => {
    // Context values
    const { setEventModalShow, selectedDay } = useContext(MonthContext);
    const { addEvent, updateEvent, selectedEvent, setSelectedEvent } = useContext(EventContext);
    
    // State for form inputs
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
    const [desc, setDesc] = useState(selectedEvent ? selectedEvent.description : "");
    const [tag, setTag] = useState(selectedEvent ? selectedEvent.tag : "");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEvent) {
            // Update event if selectedEvent exists
            updateEvent(selectedEvent.id, title, desc, tag);
        } else {
            // Add new event otherwise
            addEvent(title, desc, selectedDay, tag);
        }
        setEventModalShow(false);
        setSelectedEvent(null);
    };
    console.log("tag is: ", tag);
    return (
        // Modal overlay
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            {/* Modal content container */}
            <div className='relative bg-white rounded-md border-2 border-gray-300 w-[50%] h-[50%] flex flex-col items-end p-4'>
                {/* Close button */}
                <button
                    onClick={() => {
                        setEventModalShow(false);
                        setSelectedEvent(null);
                    }
                }
                    className='absolute top-2 right-2 text-gray-700 hover:text-gray-900'
                >
                    <IoIosClose className='w-8 h-8' />
                </button>

                {/* Modal form */}
                <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                    <h1 className='text-2xl mb-4 font-bold font-serif'>
                        {selectedEvent ? 'Edit Event' : 'Add Event'}
                    </h1>

                    {/* Title input */}
                    <div className='flex items-center justify-between w-full mb-2'>
                        <label htmlFor="title" className='font-semibold'>Title</label>
                        <input
                            type="text"
                            placeholder='Add Title'
                            id='title'
                            className="pt-3 border-0 text-gray-600 text-l font-semibold pb-2 w-[70%] border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Description input */}
                    <div className='mb-2 flex items-center justify-between w-full'>
                        <label htmlFor="desc" className='font-semibold'>Description</label>
                        <textarea
                            id="desc"
                            placeholder='Add Description'
                            className="pt-3 border-0 text-gray-600 text-l font-semibold pb-2 w-[70%] border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-500"
                            rows="4"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    {/* Tag selection dropdown */}
                    <div className='mb-4 w-[70%]'>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {tag || "Select Tag"}
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                                </MenuButton>
                            </div>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                                <div className="py-1">
                                    <MenuItem>
                                        <p
                                            onClick={() => setTag('Work')}
                                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                        >
                                            Work
                                        </p>
                                    </MenuItem>
                                    <MenuItem>
                                        <p
                                            onClick={() => setTag('Personal')}
                                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                        >
                                            Personal
                                        </p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

                    {/* Save or Cancel buttons */}
                    <div>
                        {selectedEvent ? (
                            <>
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600 w-16 h-8 mr-2 rounded text-white"
                                    onClick={() => {
                                        setEventModalShow(false);
                                        setSelectedEvent(null)
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 w-16 h-8 my-2 rounded text-white"
                                    
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 my-2 rounded text-white"
                            >
                                Save
                            </button>
                        )}
                    </div>

                    {/* Display selected date */}
                    <div className='mt-2'>
                        {selectedEvent ? dayjs(selectedEvent.date).format('dddd, MMMM DD') : selectedDay.format('dddd, MMMM DD')}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
