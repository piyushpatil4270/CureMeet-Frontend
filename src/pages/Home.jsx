import React, { useEffect, useState } from 'react'
import Doctor_Card from '../components/Doctor_Card'
import axios from 'axios'
const Home = () => {
  const [doctors,setDoctors]=useState([])
  const [category,setCategory]=useState("All")
  const userToken=localStorage.getItem("Htoken")
  const userType=localStorage.getItem("usertype")
  const getDocs=async()=>{
    try {
      const res=await axios.get(`http://localhost:5500/doctors/doctors/${category}`,{headers:{"Authorization":userToken,"userType":userType}})
      setDoctors(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
   getDocs()
  },[category])
  return (
    <div className='w-full h-dvh'>
      <div className='flex items-end justify-center py-4'>
      <div className='flex gap-2 items-center justify-between w-[80%]'>
          {/*<span className='text-[14px] w-[30%] sm:w-[20%]'>Department</span>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className='bg-white text-[12px]  border-[1px] w-full sm:w-[70%] border-blue-500 text-gray-700 py-[2px] rounded focus:outline-none focus:bg-white focus:border-gray-500'
          >
            <option value='Cardiology'>Cardiology</option>
            <option value='General'>General</option>
            <option value='Orthopedics'>Orthopedics</option>
            <option value='Gastrology'>Orthopedics</option>
            <option value='Dermatology'>Dermatology</option>
            <option value='Neurology'>Neurology</option>
            <option value='All'>All</option>
          </select>
        </div>*/}
        <div className='bg-blue-800 cursor-pointer text-white w-[15%]  flex text-[10px] md:text-[13px] items-center justify-center px-1 rounded-sm' onClick={()=>setCategory("General")}>
          <span>General</span>
        </div>
        <div className='bg-blue-800 cursor-pointer text-white  w-[15%]  flex text-[10px] md:text-[13px] items-center justify-center px-1 rounded-sm'  onClick={()=>setCategory("Cardiology")}>
          <span>Cardiology</span>
        </div>
        <div className='bg-blue-800 cursor-pointer text-white w-[15%]  flex text-[10px] md:text-[13px] items-center justify-center px-1 rounded-sm'  onClick={()=>setCategory("Orthopedics")}>
          <span>Orthopedics</span>
        </div>
        <div className='bg-blue-800 cursor-pointer text-white  w-[15%]  flex text-[10px] md:text-[13px] items-center justify-center px-1 rounded-sm'  onClick={()=>setCategory("Dermatology")}>
          <span>Dermatology</span>
        </div>
        <div className='bg-blue-800 cursor-pointer text-white  w-[15%]  flex text-[10px] md:text-[13px] items-center justify-center px-1 rounded-sm'  onClick={()=>setCategory("Neurology")}>
          <span>Neurology</span>
        </div>
        <div className='bg-blue-800 cursor-pointer text-white w-[15%]  flex text-[10px] md:text-[13px] items-center justify-center px-1 rounded-sm'  onClick={()=>setCategory("All")}>
          <span>All</span>
        </div>
      </div>
      </div>
   
<div className='w-full grid xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 p-2 gap-2 lg:gap-3'>
{doctors.map((doctor)=>{
  console.log(doctor)
  return <Doctor_Card id={doctor.id} department={doctor.department} firstname={doctor.firstname} lastname={doctor.lastname} email={doctor.email} profile={doctor.profilePic} />
})}
</div>
    </div>
  )
}

export default Home
