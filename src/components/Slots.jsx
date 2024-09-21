import React, { useState } from 'react';

const TimeSlotPicker = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);

    
    const timeSlots = [
        {time:"10:00 AM - 11:00 AM",sqlTime:"10:00:00"},
        {time:"11:00 AM - 12:00 PM",sqlTime:"11:00:00"},
        {time:"12:00 PM - 01:00 PM",sqlTime:"12:00:00"},
        {time:"01:00 PM - 02:00 PM",sqlTime:"13:00:00"},
        {time:"02:00 PM - 03:00 PM",sqlTime:"14:00:00"},
        {time:"03:00 PM - 04:00 PM",sqlTime:"15:00:00"},
        {time:"04:00 PM - 05:00 PM",sqlTime:"16:00:00"}
    ];

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    return (
        <div className="flex flex-col items-center py-2">
            <h2 className="text-[14px] font-bold ">15 August 2024</h2>
            <div className="grid grid-cols-5 justify-center">
                {timeSlots.map((slot, index) => (
                    <button
                        key={index}
                        onClick={() => handleSlotClick(slot.time)}
                        className={`m-2 px-2 py-1 text-[14px] border rounded-lg cursor-pointer ${
                            selectedSlot === slot.time ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>
            {selectedSlot && (
                <div className="mt-4">
                    <h3 className="text-[14px]">Selected Slot: <span className="font-semibold">{selectedSlot}</span></h3>
                </div>
            )}
        </div>
    );
};

export default TimeSlotPicker;
