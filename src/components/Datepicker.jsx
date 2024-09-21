import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';


const CustomInput = ({ value, onClick }) => (
  <button className="custom-date-input text-white" onClick={onClick}>
    <FaCalendarAlt  />
  </button>
);

export default function DatePickerComponent({selectedDate,setSelectedDate,}) {
  

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        customInput={<CustomInput />}
      />
    </div>
  );
}