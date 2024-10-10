import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [isPatient, setIsPatient] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [file,setFile]=useState(null)
  const [department,setDepartment]=useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignin = async () => {
    try {
      if (
        firstname.trim() === "" ||
        lastname.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
      ) {
        alert("All fields are mandatory");
        return;
      }
      const formData=new FormData()
      formData.append("firstname",firstname)
      formData.append("lastname",lastname)
      formData.append("email",email)
      formData.append("password",password)
      formData.append("file",file)
      formData.append("department",department)
      const res = await axios.post(
        `https://www.cure-meet2.kesug.com/auth/${isPatient?'patient':'doctor'}/signup`,
        formData
      );
      if (res.status === 200) {
        alert(res.data);
      } else if (res.status === 202) {
        alert("Registered successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("error");
      alert(error?.message)
    }
  };
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center bg-[#243459] rounded-md w-full max-w-md p-6 shadow-lg">
        <div className="flex p-2 items-center justify-evenly w-full mb-4">
          <span
            onClick={() => setIsPatient(true)}
            className={`text-white   text-sm md:text-base cursor-pointer font-semibold p-1 hover:text-gray-300 ${
              isPatient ? "border-b border-b-white" : ""
            }`}
          >
            Patient
          </span>
          <span
            onClick={() => setIsPatient(false)}
            className={`text-white text-sm  md:text-base cursor-pointer font-semibold p-1 hover:text-gray-300 ${
              !isPatient ? "border-b border-b-white" : ""
            }`}
          >
            Doctor
          </span>
        </div>
        <div className="flex p-2 items-center justify-between w-full mb-4">
          <label className="w-[30%] text-sm md:text-base text-white">
            First-Name
          </label>
          <input
            className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
            type="text"
            onChange={(e)=>setFirstname(e.target.value)}
          />
        </div>
        <div className="flex p-2 items-center justify-between w-full mb-4">
          <label className="w-[30%] text-sm md:text-base text-white">
            Last-Name
          </label>
          <input
            className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
            type="text"
            onChange={(e)=>setLastname(e.target.value)}
          />
        </div>
        <div className="flex p-2 items-center justify-between w-full mb-4">
          <label className="w-[30%] text-sm md:text-base text-white">
            Email
          </label>
          <input
            className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="flex p-2 items-center justify-between w-full mb-4">
          <label className="w-[30%] text-sm md:text-base text-white">
            Password
          </label>
          <input
            className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        {!isPatient && <div className="flex p-2 items-center justify-between w-full mb-4">
          <label className="w-[30%] text-sm md:text-base text-white">
            Department
          </label>
          <input
            className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
            type="text"
            onChange={(e)=>setDepartment(e.target.value)}
          />
        </div>}
        {!isPatient && <div className="flex p-2 items-center justify-between w-full mb-4">
          <label className="w-[30%] text-sm md:text-base text-white">
            Profile Picture
          </label>
          <input
            className="w-[70%] outline-none border-0 text-white border-b border-b-gray-400 bg-transparent focus:border-b-blue-500 transition-colors duration-300"
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
          />
        </div>}
        <div className="flex p-2 items-center justify-center w-full mb-4 xs:gap-2 sm:gap-5">
          <button className="bg-cyan-500 xs:text-[12px] sm:text-[14px] xs:px-1 sm:px-2 rounded-sm text-white" onClick={handleSignin}>
            Sign-In
          </button>
          <Link
            to={"/"}
            className="text-[11px] border-0 border-b border-b-blue-800 text-white"
          >
            Already have an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
