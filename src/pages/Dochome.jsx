import React,{useEffect, useState} from 'react'
import TimeSlotPicker from '../components/Slots'
import moment from 'moment'
import Dateslot from '../components/Dateslot'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Calendar from "../components/Calender"

const Appointments = () => {
 const [appointments,setAppointments]=useState(null)
 const navigate=useNavigate()
 const userToken=localStorage.getItem("Htoken")
 const userType=localStorage.getItem("usertype")
 const fetchAppointments=async()=>{
  try {
    const res=await axios.get("https://cure-meet-backend.vercel.app/appointments/doctor/todaysAppointments",{headers:{"Authorization":userToken,"userType":userType}})
    setAppointments(res.data)
  } catch (error) {
    console.log(error)
  }
 }
 useEffect(()=>{
 fetchAppointments()
 },[])
if(!appointments) return <span>Loading...</span>

return (
  <div className="w-full h-full flex flex-col py-2">
        <div className='my-2 flex flex-col justify-center gap-2 items-center'>
        <div className='mx-5 flex items-center justify-center '>
          <span className='text-[17px] text-black font-semibold'>Today's Appointments</span>
        </div>
        {appointments.map((appointment)=>{
          return <div className="w-[70%] flex flex-col gap-2 p-2 border rounded-lg shadow-sm bg-white">
          <div className='w-full '>
            <div className="flex items-center text-[15px] font-semibold">
                <span className="mr-2">{appointment?.Patient?.firstname}</span>
                <span>{appointment?.Patient?.lastname}</span>
            </div>
            <div className="text-gray-600 flex gap-4 py-1">
                <span className="block text-sm">{appointment?.Date?.split('T')[0]}</span>
                <span className="block text-sm">{appointment?.time}</span>
            </div>
            <div className="text-gray-600 flex gap-4 py-1">
                <span className={`block text-sm ${appointment?.status==="Successful"?'text-green-500':'text-orange-500'}`}>{appointment?.status}</span>
            </div>
            <div className="text-gray-600 flex gap-4 py-1">
           <button className='text-white bg-orange-500 outline-none rounded-sm font-semibold px-[4px] text-[12px]'  onClick={()=>navigate(`/appointment/${appointment.id}`)}>View</button>    
            </div>
        </div>
        
         </div>
        })}
      </div>
         
                    
             
      </div>
)
}

export default Appointments
