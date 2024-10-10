import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = ({setAuth,setUserType}) => {
    const [isPatient, setIsPatient] = useState(true);
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleSignin=async()=>{
        try {
            const res=await axios.post(`https://www.cure-meet2.kesug.com/auth/${isPatient?'patient':'doctor'}/signin`,{email:email,password:password})
            if(res.status===200||res.status===201){
                alert(res.data)
                return
            }
            else if(res.status===202){
                alert("Login Successful")
                if(isPatient){
                    localStorage.setItem("usertype",'Patient')
                    setUserType("Patient")
                }
                else {
                    localStorage.setItem("usertype",'Doctor')
                    setUserType("Doctor")
                }
                setAuth(true)
                localStorage.setItem("Htoken",res.data.token)
                localStorage.setItem("hId",res.data.id)
            }
            else alert(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center bg-[#243459] rounded-md w-full max-w-md p-6 shadow-lg">
                <div className="flex p-2 items-center justify-evenly w-full mb-4">
                    <span 
                        onClick={() => setIsPatient(true)} 
                        className={`text-white  text-sm md:text-base cursor-pointer font-semibold p-1 hover:text-gray-300 ${isPatient ? 'border-b border-b-white' : ''}`}
                    >
                        Patient
                    </span>
                    <span 
                        onClick={() => setIsPatient(false)} 
                        className={`text-white  text-sm md:text-base cursor-pointer font-semibold p-1 hover:text-gray-300 ${!isPatient ? 'border-b border-b-white' : ''}`}
                    >
                        Doctor
                    </span>
                </div>
                
                
                <div className="flex p-2 items-center justify-between w-full mb-4">
                    <label className="w-[30%] text-sm md:text-base text-white">Email</label>
                    <input
                        className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="flex p-2 items-center justify-between w-full mb-4">
                    <label className="w-[30%] text-sm md:text-base text-white">Password</label>
                    <input
                        className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="flex p-2 items-center justify-center w-full mb-4 xs:gap-2 sm:gap-5">
                    <button className='bg-cyan-500 xs:text-[12px] sm:text-[14px] xs:px-1 sm:px-2 rounded-sm text-white' onClick={handleSignin}>Sign-In</button>
                    <Link to={"/signup"} className='text-[11px] border-0 border-b border-b-blue-800 text-white' >Sign-Up</Link>
                </div>
               
            </div>
        </div>
    );
};

export default Signin;
