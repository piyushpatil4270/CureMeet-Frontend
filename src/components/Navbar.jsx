import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import Person from "@mui/icons-material/Person"
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';

import {Link, useNavigate} from "react-router-dom"
const Navbar = ({userType,setAuth}) => {
  const navigate=useNavigate()
  const Logout=()=>{
    setAuth(false)
    localStorage.removeItem("Htoken")
    localStorage.removeItem("usertype")

    navigate("/")
  }
  return (
    <div className='w-full h-full flex sm:flex-col xs:flex-row xs:gap-4   xs:justify-center sm:justify-evenly items-center'>
        <div className='xs:hidden sm:flex items-center justify-center]'>
        <span className='text-white font-semibold sm:text-[20px] xs:text-[15px]'>H-care</span>
        </div>
        <div className={`w-[90%] xs:mx-2 rounded-sm  flex items-center md:cursor-pointer hover:bg-[#b7cbff] sm:py-1    xs:justify-center sm:justify-start sm:gap-1 sm:px-2 `} onClick={()=>navigate("/")}>
        <div className='hidden sm:flex items-center justify-center'>
        <HomeIcon  className='text-white cursor-pointer ' />
        </div>
        <span className='text-white text-[10px]'>Home</span>
     
        </div>
        <div className='w-[90%] xs:mx-2 rounded-sm  flex items-center md:cursor-pointer hover:bg-[#b7cbff] sm:py-1    xs:justify-center sm:justify-start sm:gap-1 sm:px-2' onClick={()=>navigate("/appointments")}>
        <div className='hidden sm:flex items-center justify-center'>
        <BookOnlineIcon  className='text-white cursor-pointer ' />
        </div>
        <span className='text-white text-[10px]'>Appointments</span>
        </div>
        
       {userType==="Patient" && <div className='w-[90%] xs:mx-2 rounded-sm  flex items-center md:cursor-pointer hover:bg-[#b7cbff] sm:py-1  xs:justify-center sm:justify-start sm:gap-1 sm:px-2' onClick={()=>navigate("/prescriptions")}>
        <div className='hidden sm:flex items-center justify-center'>
        <ReceiptLongIcon  className='text-white cursor-pointer ' />
        </div>
       <span className='text-white text-[10px]'>Prescriptions</span>
        </div>}
        <div className='w-[90%] xs:mx-2 rounded-sm  flex items-center md:cursor-pointer hover:bg-[#b7cbff] sm:py-1   xs:justify-center sm:justify-start sm:gap-1 sm:px-2' onClick={()=>navigate("/profile")}>
        <div className='hidden sm:flex items-center justify-center'>
        <Person  className='text-white cursor-pointer ' />
        </div>
        <span className='text-white text-[10px]' >Profile</span>
        </div>
        <div className='w-[90%] xs:mx-2 rounded-sm  flex items-center md:cursor-pointer hover:bg-[#b7cbff] sm:py-1   xs:justify-center sm:justify-start sm:gap-1 sm:px-2' onClick={Logout}>
        <div className='hidden sm:flex items-center justify-center'>
        <LogoutIcon  className='text-white cursor-pointer ' />
        </div>
        <span className='text-white text-[10px]' >Logout</span>
        </div>
        
        
        
      
    </div>
  )
}

export default Navbar