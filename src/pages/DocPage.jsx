import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import MyLoader from '../components/Loader';

const DocPage = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [trigger,setTrigger]=useState(true)
    const [timeSlot, setselecttime] = useState(null);
    const [reviews,setReviews]=useState([])
    const [avgRating,setAvgrating]=useState(0)
    const [loading,setLoading]=useState(false)
    const {id}=useParams()
    const [doc,setDoc]=useState(null)
    const [timeSlots,setTimeSlots]=useState([
        { time: '10:00 AM', sqlTime: '10:00:00',available:true },
        { time: '11:00 AM', sqlTime: '11:00:00',available:false },
        { time: '12:00 PM', sqlTime: '12:00:00' ,available:true},
        { time: '01:00 PM', sqlTime: '13:00:00',available:true },
        { time: '02:00 PM', sqlTime: '14:00:00',available:true },
        { time: '03:00 PM', sqlTime: '15:00:00',available:true },
        { time: '04:00 PM', sqlTime: '16:00:00',available:false },
      ])
    const dateSlots = [
        moment.utc().format('DD-MMMM-YYYY'),
        moment.utc().add(1, "day").format('DD-MMMM-YYYY'),
        moment.utc().add(2, "day").format('DD-MMMM-YYYY')
    ];

    const handleSlotClick = (slot) => {
        console.log("Date is ", slot);
        setSelectedSlot(slot);
    };

    const handleTimeSlot = (slot) => {
        console.log("Time is ", slot);
        setselecttime(slot);
    };
   const userToken=localStorage.getItem("Htoken")
   const userType=localStorage.getItem("usertype")
    const getDoc=async()=>{
        try {
           const res=await axios.get(`https://cure-meet-backend.vercel.app/doctors/doctor/${id}`,{headers:{"Authorization":userToken,"userType":userType}}) 
           setDoc(res.data.doctor)
           setReviews(res.data.reviews)

           setAvgrating(res.data?.rating[0]?.totalRating>0?parseInt(res.data?.rating[0]?.totalRating)/parseInt(res.data?.rating[0]?.totalCount):0)
           console.log(res.data.rating)
        } catch (error) {
            console.log("Error: ",error)
        }
    }


    const getDocSlots=async()=>{
        try {
            setLoading(true)
            const res=await axios.post("https://cure-meet-backend.vercel.app/slots/getSlots",{date:selectedSlot,doctorId:id},{headers:{"Authorization":userToken,"userType":userType}})
            setTimeSlots(res.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
   
    const bookAppointment=async()=>{
        try {
            const res=await axios.post("https://cure-meet-backend.vercel.app/appointments/bookAppointment",{doctorId:doc.id,date:selectedSlot,time:timeSlot},{headers:{"Authorization":userToken,"userType":userType}})
            alert("Appointment made succesfully")
            setTrigger(!trigger)
        } catch (error) {
            console.log("Error")
            alert("An error occured try again")
            
        }
    }
    useEffect(()=>{
     getDoc()
    },[])
    useEffect(()=>{
     if(selectedSlot){
         setselecttime(null)
        getDocSlots()
     }

    },[selectedSlot,trigger])
    
    
    if(!doc)return <div className='w-full h-full flex items-center  justify-center'>
    <MyLoader/>
  </div>

    return (
        <div className='w-full min-h-screen flex items-start justify-center bg-gray-100 p-4'>
            <div className='w-full bg-white rounded-lg shadow-lg p-6 flex flex-col'>
                <div className='flex items-center justify-start w-full'>
                    <div className='px-4'>
                        <img
                            className='w-[50px] h-[50px] sm:w-[120px] sm:h-[120px] rounded-full object-cover mb-4'
                            src={doc.profilePic}
                            alt='Doctor'
                        />
                    </div>

                    <div className='flex flex-col xs:gap-[2px] sm:gap-1 sm:px-2'>
                        <h2 className='text-[14px] sm:text-[18px] font-semibold'>Dr. {doc?.firstname} {doc?.lastname}</h2>
                        <p className='text-gray-600 text-[12px] sm:text-[14px]'>Cardiology Department</p>
                        <p className='text-gray-600 text-[12px] sm:text-[14px]'>Email: {doc?.email}</p>
                        <p className='text-black text-[10px] font-semibold'>Average Rating: {avgRating}</p>
                    </div>
                </div>
                <div className='flex flex-col xs:gap-[2px] px-4 py-2'>
                    <span>Book Appointment</span>
                    <div className='flex flex-col'>
                        <div className="flex flex-col py-2">
                            <div className="grid grid-cols-3 justify-center items-center">
                                {dateSlots.map((date, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSlotClick(date)}
                                        className={`m-2 outline-none px-2 py-1 text-[10px] sm:text-[14px] border rounded-lg cursor-pointer ${
                                            selectedSlot === date ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                    >
                                        {date}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {selectedSlot && (
                            <div className="mt-4">
                                <div className="flex flex-col items-center py-2">
                                    <h2 className="text-[14px] font-bold">{selectedSlot}</h2>
                                    <div className="grid grid-cols-5 justify-center">
                                        {!loading?timeSlots.map((slot, index) => (
                                            <button
                                                key={index}
                                                disabled={!slot.available}
                                                onClick={() => handleTimeSlot(slot.sqlTime)}
                                                className={`m-2 px-2 py-1 text-[10px] sm:text-[14px] border rounded-lg cursor-pointer ${
                                                    timeSlot === slot.sqlTime ? `bg-green-500 text-white` : !slot.available ? 'bg-red-400 text-white' : 'bg-gray-200 hover:bg-gray-300'
                                                }`}
                                            >
                                                {slot.time}
                                            </button>
                                        )):"Loading..."}
                                    </div>
                                    {timeSlot && (
                                        <div className="mt-4">
                                            <button 
                                                className='py-[4px] text-[14px] px-[4px] bg-green-400 outline-none rounded-sm text-white' 
                                                onClick={bookAppointment}
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-1 px-4 py-2'>
                    <span>Ratings and Reviews</span>

                    {reviews.map((review, index) => (
                        <div 
                            key={index} 
                            className='flex flex-col p-2 w-full  bg-slate-100 rounded-sm gap-2 text-[13px]'
                        >
                            <div className='flex gap-4'>
                                <span className='w-[15%] size-[15px]'>Patient: {review.patient.firstName}</span>
                                <span className='flex items-center mx-2 size-[15px]'>Rating: <span className="text-[12px] font-semibold flex ">{Array.from({ length: review.rating }).map((_, index) => (
    <StarIcon key={index} fontSize="small" />
  ))}</span></span>
                            </div>
                            <div className='flex gap-4'>
                                <span>
                                    Review: <span className='font-semibold'>{review.details}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocPage;
