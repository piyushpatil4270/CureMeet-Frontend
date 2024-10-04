import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientAptCard = ({ trigger, setTrigger, doctorId, id, date, firstname, lastname, email, time, status }) => {
  const navigate = useNavigate();
const userToken=localStorage.getItem("Htoken")
const userType=localStorage.getItem("usertype")
  const cancelAppointment = async () => {
    try {
      console.log("DoctorId is ", doctorId);
      const res = await axios.post("http://localhost:5500/appointments/cancelAppointment", { doctorId, date, aptId: id, time },{headers:{"Authorization":userToken,"userType":userType}});
      setTrigger(!trigger);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className='m-2 flex gap-2 flex-col items-start justify-center rounded-sm h-fit p-1 shadow-md'>
      <div className='flex mx-1 items-center justify-center'>
        <span className='text-sm font-semibold'>Doctor: </span>
        <span className='text-sm font-normal'>{firstname} {lastname}</span>
      </div>
      <div className='flex gap-1 mx-1 items-center justify-center'>
        <span className='text-sm font-semibold'>Date: </span>
        <span className='text-sm font-normal'>{date.split("T")[0]}</span>
      </div>
      <div className='flex gap-1 mx-1 items-center justify-center'>
        <span className='text-sm font-semibold'>Time: </span>
        <span className='text-sm font-normal'>{time}</span>
      </div>
      <div className='flex gap-1 mx-1 items-center justify-center'>
        <span className='text-sm font-semibold'>Status: </span>
        <span className={`text-sm font-medium ${status === 'Pending' ? 'text-orange-500' : status === "Accepted" || status === "Successful" ? 'text-green-500' : 'text-red-600'}`}>{status}</span>
      </div>

      {status === "Successful" && (
        <div className='flex gap-1 mx-1'>
          <button className='text-white text-xs font-semibold hover:bg-green-300 bg-green-500 px-[4px] rounded-sm' onClick={() => navigate(`/appointment/${id}`)}>Visit</button>
        </div>
      )}
      {status === "Pending" && (
        <div className='flex gap-1 mx-1'>
          <button className='text-white text-xs font-semibold hover:bg-red-400 bg-red-500 px-[4px] rounded-sm' onClick={cancelAppointment}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PatientAptCard;
