import React, { createContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const MonthContext = createContext();

export const MonthProvider = ({ children }) => {
    // Initializing the month index state, persisting it in localStorage
    const [monthIndex, setMonthIndex] = useState(() => {
        const savedMonthIndex = localStorage.getItem('monthIndex');
        return savedMonthIndex !== null ? parseInt(savedMonthIndex, 10) : dayjs().month();
    });

    const [eventModalShow, setEventModalShow] = useState(false);

    // Initializing the selectedDay state, persisting it in localStorage
    const [selectedDay, setSelectedDay] = useState(() => {
        const savedSelectedDay = localStorage.getItem('selectedDay');
        return savedSelectedDay === 'null' ? null : (savedSelectedDay ? dayjs(savedSelectedDay) : dayjs());
    });

    useEffect(() => {
        // Updating localStorage whenever monthIndex changes
        localStorage.setItem('monthIndex', monthIndex);
    }, [monthIndex]);

    useEffect(() => {
        // Updating localStorage whenever selectedDay changes
        localStorage.setItem('selectedDay', selectedDay ? selectedDay.format() : 'null');
    }, [selectedDay]);

    // Context value containing monthIndex and setMonthIndex
    const value = {
        monthIndex,
        setMonthIndex,
        eventModalShow,
        setEventModalShow,
        selectedDay,
        setSelectedDay
    };

    return (
        <MonthContext.Provider value={value}>
            {children}
        </MonthContext.Provider>
    );
};
