import React, { useState } from "react";
import moment from "moment";
import  DatePicker from "../components/Datepicker";
const SlidingDatePicker = ({selectedDate,setSelectedDate}) => {


    const handlePreviousDay = () => {
        setSelectedDate(prevDate => moment.utc(prevDate).subtract(1, 'days').toDate());
    };

    const handleNextDay = () => {
        setSelectedDate(prevDate => moment(prevDate).add(1, 'days').toDate());
    };
    const isBeforeToday = moment.utc(selectedDate).isBefore(moment(), 'day');

    return (
        <div className="p-[4px] w-full  flex bg-[#243459] items-center justify-center gap-4  border border-gray-300 my-2 rounded-md shadow-md">
            <span className="text-white text-[14px]">{moment.utc(selectedDate).format('DD-MMMM-YYYY')}</span>
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        </div>
    );
};

export default SlidingDatePicker;