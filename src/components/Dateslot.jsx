import React,{useState} from 'react'
import moment from "moment"

const Dateslot = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    
    
    const dateSlots = [
        moment.utc().format('DD-MMMM-YYYY'),
        moment.utc().add(1,"day").format('DD-MMMM-YYYY'),
        moment.utc().add(2,"day").format('DD-MMMM-YYYY')
    ];

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };
  return (
    <div className="flex flex-col py-2">
        
            <div className="grid grid-cols-5 justify-center items-center">
                {dateSlots.map((slot, index) => (
                    <button
                        key={index}
                        onClick={() => handleSlotClick(slot)}
                        className={`m-2 px-2 py-1 text-[14px] border rounded-lg cursor-pointer ${
                            selectedSlot === slot ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {slot}
                    </button>
                ))}
            </div>
            {selectedSlot && (
                <div className="mt-4">
                   {/* <h3 className="text-[14px]">Selected Slot: <span className="font-semibold">{selectedSlot}</span></h3> */}
                </div>
            )}
        </div>
  )
}

export default Dateslot
