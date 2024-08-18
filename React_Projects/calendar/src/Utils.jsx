import React from 'react';
import dayjs from 'dayjs';

/**
 * Generates a 2D array (matrix) representing a calendar month.
 * @param {number} [month=CurrentMonth] - The month to generate (0-11), defaults to the current month.
 * @returns {array[]} A 2D array with 5 rows and 7 columns, where each cell contains a dayjs object.
 */
export const generateCalendarMonth = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDayOfMonthIndex = dayjs(new Date(year, month, 1)).day(); // Get the day of the week (0-6) of the first day of the month
  let dayCounter = -firstDayOfMonthIndex; // Initialize the day counter to position the first day correctly

  const calendarMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      dayCounter++; // Increment the day counter
      return dayjs(new Date(year, month, dayCounter)); // Create a dayjs object for the current day
    });
  });

  return calendarMatrix;
};