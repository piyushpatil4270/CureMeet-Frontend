import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from "moment"
import Chart2 from "../components/Barchart" 
import LineChart from '../components/LineChart';
import MyLoader from '../components/Loader';

const ProfilePage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [docs, setDocs] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [isCreated,setCreated]=useState(false)
  const [trigger, setTrigger] = useState(true);
  const [monthlyData,setMonthlyData]=useState([])
  const [dailydata,setDailyData]=useState([])
  const [permission,setPermission]=useState(false)
  const userId = 1;

 


const userToken=localStorage.getItem("Htoken")
const userType=localStorage.getItem("usertype")
  const fetchUser = async () => {
    try {
      const res = await axios.post('https://cure-meet-backend.vercel.app/auth/doctor/profile', { userId:userId,date:moment.utc().toDate() },{headers:{"Authorization":userToken,"userType":userType}});
      setUser(res.data.doctor);
      setPermission(res.data.permission)
    } catch (error) {
      console.log(error);
    }
  };


  const fetchData=async()=>{
    const res=await axios.post("https://cure-meet-backend.vercel.app/appointments/doctor/monthlyData",{},{headers:{"Authorization":userToken,"userType":userType}})
    setMonthlyData(res.data.final)
    const daily=res.data.trend.reverse()
    setDailyData(daily)
    console.log(res.data.trend)
  }


  const createSlots=async()=>{
    try {
      const res=await axios.get("https://cure-meet-backend.vercel.app/slots/createSlots")
      alert("Slots Created Successfully")
      fetchUser()
    } catch (error) {
      console.log(error)
    }
  }

 
  
  

 useEffect(()=>{
  fetchUser()
fetchData()
 },[trigger])


  

  if (!user) return <div className='w-full h-full flex items-center  justify-center'>
  <MyLoader/>
</div>

  return (
    <div className="w-full bg-gray-100 p-8 min-h-screen">
    <h1 className="text-2xl font-bold mb-6">Profile</h1>
    <div className="flex gap-8 items-center mb-8">
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src="https://cdn.britannica.com/56/199056-050-CCC44482/Jeff-Bezos-2017.jpg"
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-2 border-gray-300"
        />
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="firstname">
            Name
          </label>
          <p className="text-gray-900 text-sm">{user.firstname} {user.lastname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
            Email
          </label>
          <p className="text-gray-900 text-sm">{user.email}</p>
        </div>
        
      </div>
    </div>
    <div className="flex items-center gap-4 mb-4">
       
      </div>
      <div>
     
  <h2 className="text-xl font-bold mb-4">Data</h2>
  <div className="w-full mx-auto flex flex-col md:flex-row gap-[2px] md:gap-4 items-center">
   
    <div className="w-[80%] md:w-[50%] h-[300px]">
      {dailydata && <LineChart dailyData={dailydata} />}
    </div>
    <div className="w-[80%] md:w-[50%] h-[300px]">
      {monthlyData && <Chart2 data={monthlyData} />}
    </div>
  </div>
</div>

  </div>
  );
};

export default ProfilePage;
