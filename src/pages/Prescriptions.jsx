import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Prescription from "../components/PresCard"
import moment from 'moment'
import Calendar from "../components/Calender"
const Prescriptions = () => {
  const [prescriptions,setPrescriptions]=useState([])
  const [selectedDate,setSelectedDate]=useState(moment.utc().toDate()) 
  const userToken=localStorage.getItem("Htoken")
  const userType=localStorage.getItem("usertype")
  const getAllPrescriptions=async()=>{
    try {
      const res=await axios.post("https://cure-meet-backend.vercel.app/prescriptions/patient/all",{patientId:2,date:moment.utc(selectedDate).format("DD-MM-YYYY")},{headers:{"Authorization":userToken,"userType":userType}})
      setPrescriptions(res.data)
    } catch (error) {
      console.log("Errror: ",error?.message)
    }
   
  }
  useEffect(()=>{
    getAllPrescriptions()
  },[selectedDate])

  return (
    <div className='w-full h-full flex flex-col gap-2'> 
    <div className='my-2 flex items-center'>
       <div className='mx-5 w-full items-center justify-center'>
       <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
       </div>
      </div>
       <div className='flex flex-col gap-1'> 
        {prescriptions.length===0?<span className='mx-4'>No Prescription</span>:prescriptions?.map((prescription)=>{
          const aggregateData=prescription?.prescriptionDetails?.split(",")
          return <Prescription id={prescription.id}  prescriptions={aggregateData} date={prescription.date} doctor={prescription.doctor} />
        })}
     </div>
    </div>
  )
}
export default Prescriptions

