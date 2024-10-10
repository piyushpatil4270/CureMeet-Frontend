import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Download from "@mui/icons-material/Download";
import MyLoader from './Loader';

const DApp = () => {
  const [appointment, setAppointment] = useState(null);
  const [apresc, setApresc] = useState([]);
  const [docs, setDocs] = useState([]);
  const [pres, setPres] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [review, setReview] = useState(null);
  const [trigger, setTrigger] = useState(true);
  const { id } = useParams();
  const userType = localStorage.getItem("usertype");
  const userToken = localStorage.getItem("Htoken");
  const appointmentId = parseInt(id);

  const fetchAppointment = async () => {
    try {
      const res = await axios.post("https://www.cure-meet2.kesug.com/appointments/doctor/appointment", { appointmentId: appointmentId }, { headers: { "Authorization": userToken, "userType": userType } });
      setAppointment(res.data?.appointments);
      setApresc(res.data?.prescriptions);
      setReview(res.data.reviews);
      console.log("Data is ", res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const downloadImage = (imgUrl) => {
    console.log("url is " + imgUrl);
    saveAs(imgUrl);
  };

  const appointmentCompleted = async () => {
    try {
      const res = await axios.post("https://www.cure-meet2.kesug.com/appointments/successful", { appointmentId: appointmentId, presc: prescriptions, patientId: appointment.patient.id, doctorId: appointment.doctorId }, { headers: { "Authorization": userToken, "userType": userType } });
      if (res.status === 202) {
        alert("Appointment Successful");
        setTrigger(!trigger);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const userDocs = async () => {
    if (appointment) {
      try {
        const res = await axios.post("https://www.cure-meet2.kesug.com/documents/getPatientDocuments ", { userId: appointment.patient.id }, { headers: { "Authorization": userToken, "userType": userType } });
        console.log("the docs are ", res.data);
        setDocs(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [trigger]);

  useEffect(() => {
    userDocs();
  }, [appointment]);

  if (!appointment) return <div className='w-full h-full flex items-center  justify-center'>
  <MyLoader/>
</div>

  return (
    <div className="w-full h-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-black">Patient: {appointment.patient.firstname} {appointment.patient.lastname}</h2>
        <span className="text-[12px] text-black font-bold">Email: <span className="text-[12px] font-normal text-black">{appointment.patient.email}</span></span>
        <span className="text-[12px] text-black font-bold">Date: <span className="text-[12px] font-normal text-black">{moment.utc(appointment.Date).format("DD-MMMM-YYYY")}</span></span>
        <span className="text-[12px] text-black font-bold">Time: <span className="text-[12px] font-normal text-black">{moment(appointment.time, "HH:mm:ss").format("h:mm A")}</span></span>
        {appointment.status !== "Successful" ? (
          <button className="inline-block bg-green-500 text-white w-fit font-semibold text-[12px] px-2 py-1 rounded-sm mt-3" onClick={appointmentCompleted}>
            Complete Appointment
          </button>
        ) : (
          <button className="inline-block bg-yellow-500 text-white w-fit font-semibold text-[12px] px-2 py-1 rounded-sm mt-3">
            Appointment {appointment.status}
          </button>
        )}

        <div className="mt-4">
          <h3 className="text-[15px] font-semibold text-black mb-2">Prescriptions:</h3>
          <div className="flex flex-col gap-2">
            {appointment.status !== "Successful" && (
              <div className="w-full flex flex-col gap-2 py-2 items-start">
                <div className="w-full flex gap-2 items-center">
                  <input
                    className="bg-gray-200 w-[50%] outline-none text-gray-800 text-xs font-medium px-2 py-1 rounded"
                    value={pres}
                    onChange={(e) => setPres(e.target.value)}
                  />
                  <button
                    className="bg-green-600 rounded-sm h-fit text-[12px] px-[4px] text-white"
                    onClick={() => {
                      setPrescriptions((prescription) => [...prescription, pres]);
                      setPres("");
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="w-full flex flex-col gap-2">
                  {prescriptions.map((presc, index) => (
                    <div key={index} className="bg-gray-200 w-[50%] text-gray-800 text-xs font-medium px-2 py-1 rounded">
                      {presc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {appointment.status === "Successful" && apresc.map((presc) => (
              <div key={presc.id} className='w-full flex gap-2 items-center'>
                <div className="bg-gray-200 w-[50%] text-gray-800 text-xs font-medium px-2 py-1 rounded">
                  {presc.details}
                </div>
              </div>
            ))}

            <span className='text-[15px] font-semibold'>Patient Medical Reports</span>
            {docs && docs.map((doc) => (
              <div key={doc.document} className='w-full flex gap-2 items-center'>
                <div className="bg-gray-200 w-[50%] text-gray-800 text-xs font-medium px-2 py-1 rounded">
                  {doc.document.split("_")[1]}
                </div>
                <Download
                  style={{ fontSize: '18px' }}
                  onClick={() => downloadImage(doc.document)}
                />
              </div>
            ))}

            {review && (
              <div className="w-full py-4 flex flex-col gap-2">
                <div className="w-full flex gap-2 items-center">
                  <span className="text-[15px] font-semibold">Patient Review:</span>
                  <span className="text-[12px]">{review.details}</span>
                </div>
                <div className="w-full flex gap-2 items-center">
                  <span className="text-[15px] font-semibold">Patient Rating:</span>
                 
                  <span className="text-[12px] font-semibold">{Array.from({ length: review.rating }).map((_, index) => (
    <StarIcon key={index} fontSize="small" />
  ))}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DApp;
