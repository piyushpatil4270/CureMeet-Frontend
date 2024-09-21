import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const Doctor_Card = ({id,firstname,lastname,email,department,profile}) => {
  const navigate=useNavigate()
  
  return (
    <div className="w-full   shadow-lg overflow-hidden mx-auto">
      <div className="w-full h-[150px] overflow-hidden">
        <img
          src={profile}
          alt="Doctor"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="xs:p-1 sm:p-2">
        <h2 className="xs:text-[12px] sm:text-[13px] font-semibold text-gray-800">{firstname.toUpperCase()}  {lastname.toUpperCase()}</h2>
      <span className="text-black font-semibold xs:text-[11px] sm:text-[12px]"><span className="text-black xs:text-[11px] sm:text-[12px]">{department}</span></span>
        <p className="text-black xs:text-[11px] sm:text-[12px]">{email}</p>
      </div>
      <div className="xs:p-1 sm:p-2 border-t border-gray-200 flex justify-center">
        <button className="xs:text-[10px] sm:text-[12px] bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-sm" onClick={()=>navigate(`/doctor/${id}`)} >
          Make Appointment
        </button>
      </div>
    </div>
  );
}

export default Doctor_Card;
