import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PatientAptCard from '../components/PatientApt'
import moment from 'moment'
import Calendar from "../components/Calender"
import MyLoader from '../components/Loader'
const PatientApp = () => {
  const [appointments,setAppointments]=useState(null)
  const [selectedDate,setSelectedDate]=useState(moment.utc().toDate())
  const [trigger,setTrigger]=useState(true)
  const userToken=localStorage.getItem("Htoken")
  const userType=localStorage.getItem("usertype")
  const getAllAppointments=async()=>{
    try {
      const res=await axios.post("https://cure-meet-backend.vercel.app/appointments/patients/appointments",{patientId:1,date:moment.utc(selectedDate).format("DD-MM-YYYY")},{headers:{"Authorization":userToken,"userType":userType}})
      setAppointments(res.data)
    } catch (error) {
      console.log("Error: ",error)
    }
  }
  useEffect(()=>{
  getAllAppointments()
  },[trigger,selectedDate])

  if(!appointments) return <div className='w-full h-full flex items-center  justify-center'>
  <MyLoader/>
</div>

  return (
  <div className='w-full h-full flex flex-col gap-2'>
    <div className='my-2 flex items-center'>
       <div className='mx-5 w-full items-center justify-center'>
       <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
       </div>
      </div>
  
    <div className='w-full h-fit p-2 grid grid-cols-4 justify-center  items-center gap-2'>
      
    {appointments.length===0 ?<span>No Appointments</span>:appointments.map((appointment) => (
        <PatientAptCard
           key={appointment.id}
           doctorId={appointment.doctor.id}
           id={appointment.id}
           date={appointment.Date}
            firstname={appointment.doctor.firstname}
            lastname={appointment.doctor.lastname}
            email={appointment.doctor.email}
            time={appointment.time}
            status={appointment.status}
            trigger={trigger}
            setTrigger={setTrigger}
        />
    ))}
</div>
</div>

  )
}

export default PatientApp
