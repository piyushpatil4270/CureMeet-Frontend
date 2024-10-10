import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star"
import StarBorder from "@mui/icons-material/StarBorder"
import { useParams } from "react-router-dom";
import MyLoader from "./Loader";

const DApp = () => {
  const [appointment, setappointment] = useState(null);
  const [apresc, setApresc] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const [review,setReview]=useState(null)
  const [details,setDetails]=useState("")
  const [rating,setRating]=useState(1)
  const { id } = useParams();
  const appointmentId = parseInt(id);
  const userToken=localStorage.getItem("Htoken")
  const userType=localStorage.getItem("usertype")
  const [loading,setLoading]=useState(false)
  const fetchAppointment = async () => {

    try {
      setLoading(true)
      const res = await axios.post(
        "https://www.cure-meet2.kesug.com/appointments/patient/appointment",
        { appointmentId: appointmentId },
        {headers:{"Authorization":userToken,"userType":userType}}
      );
      setappointment(res.data?.appointments);
      setApresc(res.data?.prescriptions);
      setReview(res.data.review)
      setLoading(false)
      console.log("Data is ", res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const addReview=async()=>{
    if(rating===0 || details===""){
      alert("Please enter appropriate rating and experience")
      return
    }
    try {
      const res=await axios.post("https://www.cure-meet2.kesug.com/appointments/reviews/add",{appointmentId:appointmentId,rating:rating,details:details,doctorId:appointment.doctor.id},{headers:{"Authorization":userToken,"userType":userType}})
      setTrigger(!trigger)
      alert(res.data)
    } catch (error) {
      console.log("Error: ",error)
    }
  
  }

  useEffect(() => {
    fetchAppointment();
  }, [trigger]);
  if (!appointment) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <MyLoader />
      </div>
    );
  }
  
  return (
    <div className="w-full h-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="flex gap-3 items-center justify-start p-2">
           <div>
            <img className="w-[120px] h-[120px] rounded-full" src={appointment?.doctor?.profilePic} />
           </div>
           <div className="flex flex-col gap-1">
           <h2 className="text-lg font-semibold text-black ">
          Doctor: {appointment?.doctor?.firstname} {appointment?.doctor?.lastname}
        </h2>
        <span className="text-[12px] text-black font-bold ">
          Email:
          <span className="text-[12px] font-normal text-black">
            {appointment?.doctor?.email}
          </span>
        </span>
        <span className="text-[12px] text-black font-bold">
          Date:{" "}
          <span className="text-[12px] font-normal text-black">
            {moment.utc(appointment?.Date).format("DD-MMMM-YYYY")}
          </span>
        </span>
        <span className="text-[12px] text-black font-bold">
          Time:{" "}
          <span className="text-[12px] font-normal text-black">
            {moment(appointment?.time, "HH:mm:ss").format("h:mm A")}
          </span>
        </span>
           </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
       
        <button className="inline-block bg-green-500 text-white w-fit font-semibold text-[12px] px-2 py-1 rounded-sm mt-3">
          Appointment {appointment?.status}
        </button>

        <div className="mt-4">
          <h3 className="text-[14px] font-semibold text-gray-800 mb-2">
            Prescriptions:
          </h3>
          <div className="flex  flex-col gap-2">
            {appointment?.status === "Successful" &&
              apresc.map((presc) => {
                return (
                  <div className="w-full flex gap-2 items-center">
                    <div className="bg-gray-200 w-[50%] text-gray-800 text-xs font-medium px-2 py-1 rounded">
                      {presc.details}
                    </div>
                  </div>
                );
              })}
          </div>
          {!review ?<div className="w-full py-2 flex flex-col gap-2">
             <span className="text-[13px] font-semibold">Add Review</span>
             <div className="w-full flex gap-2 ">
             <span className='text-[12px] w-[10%] '>Rate</span>
          <select
            onChange={(e)=>setRating(parseInt(e.target.value))}
            className='bg-white text-[12px]  border-[1px] w-[20%] border-black text-gray-700 py-[2px] rounded focus:outline-none focus:bg-white focus:border-gray-500'
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            </select>
              </div>
               <div className="w-full flex gap-2 ">
             <span className='text-[12px] w-[10%] '>Share Experience</span>
             <input className="w-[25%] bg-slate-100 rounded-sm text-[14px] outline-none broder-none px-1" onChange={(e)=>setDetails(e.target.value)} />
          
              </div>
              <div className="w-full flex gap-2 ">
             <button className="text-[12px] px-1 bg-green-500 text-white rounded-sm" onClick={addReview}>Add Review</button>
              </div>
            </div>:<div className="py-5 flex flex-col gap-3">
              <div className="w-full flex gap-2  items-center " >
              <span className="text-[12px] font-semibold ">Your Review:</span>
              
              <span className="text-[12px] ">{review.details}</span>
               

              </div>
              <div className="w-full flex gap-2  items-center " >
              <span className="text-[12px] font-semibold ">Your Rating:</span>
              
              <span className="text-[12px] ">{Array.from({ length: review.rating }).map((_, index) => (
    <StarIcon key={index} fontSize="small" />
  ))}</span>
               
              </div>
              
            </div>}
        </div>
      </div>
    </div>
  );
};

export default DApp;
