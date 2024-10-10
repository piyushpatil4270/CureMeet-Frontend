import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import BarChart from '../components/PieChart'; 
import Chart2 from "../components/Barchart"
import moment from "moment"
import MyLoader from '../components/Loader';
const ProfilePage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [monthlyData,setMonthlyData]=useState([
    {
        "month": "January",
        "totalAppointments": 0
    },
    {
        "month": "February",
        "totalAppointments": 0
    },
    {
        "month": "March",
        "totalAppointments": 0
    },
    {
        "month": "April",
        "totalAppointments": 0
    },
    {
        "month": "May",
        "totalAppointments": 0
    },
    {
        "month": "June",
        "totalAppointments": 0
    },
    {
        "month": "July",
        "totalAppointments": 1
    },
    {
        "month": "August",
        "totalAppointments": 5
    },
    {
        "month": "September",
        "totalAppointments": 0
    },
    {
        "month": "October",
        "totalAppointments": 0
    },
    {
        "month": "November",
        "totalAppointments": 0
    },
    {
        "month": "December",
        "totalAppointments": 0
    }
])
 const userToken=localStorage.getItem("Htoken")
 const userType=localStorage.getItem("usertype")
  const [docs, setDocs] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [trigger, setTrigger] = useState(true);
  const userId = 1;

  const data = [
    { totalAppointments: 2, department: 'General' },
    { totalAppointments: 2, department: 'Neurology' },
    { totalAppointments: 1, department: 'Cardiology' }
  ];

  const handleChangePassword = () => {
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    setCurrentPassword('');
    setNewPassword('');
  };


  const fetchMonthlyData=async()=>{
    try {
      const startDate = moment().startOf('year').format('YYYY-MM-DD');
      const endDate = moment().endOf('year').format('YYYY-MM-DD');
      
      const res = await axios.post("https://www.cure-meet2.kesug.com/appointments/patient/monthlyData", {
        startDate,
        endDate,
        userId: 1
      },{headers:{"Authorization":userToken,"userType":userType}});
      
      setMonthlyData(res.data);
    } catch (error) {
      console.log("Error: ",error)
    }
  }
  const fetchUser = async () => {
    try {
      const res = await axios.post('https://www.cure-meet2.kesug.com/auth/profile', { userId },{headers:{"Authorization":userToken,"userType":userType}});
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadImage = (imgUrl) => {
    console.log('url is ' + imgUrl);
    saveAs(imgUrl);
  };

  const fetchDocuments = async () => {
    try {
      const res = await axios.post('https://www.cure-meet2.kesug.com/documents/getAll', { },{headers:{"Authorization":userToken,"userType":userType}});
      setDocs(res.data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const uploadDocument = async () => {
    try {
      if (!file) {
        alert('Please add a file');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);
      const res = await axios.post('https://www.cure-meet2.kesug.com/documents/create', formData,{headers:{"Authorization":userToken,"userType":userType}});
       if(res.status>=200 && res.status<=210){
        alert("Document uploaded successfully");
        setTrigger(!trigger);
       }
        
    
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const delDoc=async(id)=>{
    try {
      const res=await axios.post("https://www.cure-meet2.kesug.com/documents/delete",{docId:id},{headers:{"Authorization":userToken,"userType":userType}})
      setTrigger(!trigger)
    } catch (error) {
      console.log("Error: ",error)
    }
  }

  useEffect(() => {
    fetchUser();
   
    fetchDocuments();
  
  }, [trigger]);

  useEffect(()=>{
    fetchMonthlyData()
  },[])

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
          {/* Uncomment if you want to include the change password feature */}
          {/* 
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="bg-blue-500 text-white text-sm p-2 rounded hover:bg-blue-600"
          >
            {showChangePassword ? 'Cancel' : 'Change Password'}
          </button>
          {showChangePassword && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="bg-green-500 text-white p-2 w-full text-sm rounded hover:bg-green-600"
              >
                Change Password
              </button>
            </div>
          )}
          */}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Reports</h2>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="file"
            className="border border-black p-2 rounded"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={uploadDocument}
          >
            Upload
          </button>
        </div>
        <div className="space-y-2">
          {docs.map((doc) => (
            <div key={doc.document} className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2">
              <span className="text-sm">{doc.document.split('_')[1]}</span>
              <div className="flex gap-2">
                <button className="text-xs font-semibold text-white bg-red-500 rounded px-2 py-1 hover:bg-red-600" onClick={()=>delDoc(doc.id)}>
                  Delete
                </button>
                <button
                  className="text-xs font-semibold text-white bg-green-500 rounded px-2 py-1 hover:bg-green-600"
                  onClick={() => downloadImage(doc.document)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
     
  <h2 className="text-xl font-bold mb-4">Data</h2>
  <div className="w-full mx-auto flex flex-col md:flex-row gap-[2px] md:gap-4 items-center">
   
    <div className="w-[80%] md:w-[50%] h-[300px]">
      {data &&  <BarChart data={data} />}
    </div>
    <div className="w-[80%] md:w-[50%] h-[300px]">
      {monthlyData && <Chart2 data={monthlyData} />}
    </div>
  </div>
</div>
    
  );
};

export default ProfilePage;
