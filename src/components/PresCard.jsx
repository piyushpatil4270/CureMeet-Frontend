import React, { useState } from 'react';
  import Download from "@mui/icons-material/Download"
import { saveAs } from 'file-saver';
import moment from 'moment';
import jsPDF from"jspdf"

const PrescriptionCard = ({id,prescriptions,time,date,doctor}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const downloadPDF = () => {
    const doc = new jsPDF();
  

    doc.setProperties({
      title: "Prescription",
      subject: "Prescription Details",
    });
  
    
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Prescription", 20, 20);
  
   
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text(`Prescribed by : Dr.${doctor.firstname} ${doctor.lastname}`, 20,33);


    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
  
 
    doc.setFontSize(12);
    doc.setTextColor(60);
    const startY = 50;
    let currentY = startY;
    
    prescriptions.forEach((pres, i) => {
      doc.text(`${i + 1}. ${pres}`, 20, currentY);
      currentY += 10; 
    });
  

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your visit!", 20, currentY + 20);
  
   
    doc.save('prescriptions.pdf');
  };
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" bg-white shadow-lg mx-4 rounded-sm overflow-hidden my-1">
      <div className="p-4 flex flex-col gap-[2px]">
        <h2 className="text-[14px] font-semibold text-black">Dr. {doctor.firstname} {doctor.lastname}
          </h2>
        <p className="text-[12px] text-black">Email: {doctor.email} </p>
        <p className="text-[12px] text-black">Prescribed On: {moment.utc(date).format("DD-MMMM-YYYY")}</p>
        <p className="text-[12px] text-black">Time: {moment(time, "HH:mm:ss").format("h:mm A")}</p>
        <div className='flex gap-1 items-center'>
        <span className="bg-blue-800 w-fit px-1 text-white text-[12px] font-semibold  py-1 rounded-sm  gap-1 mt-3">
         Download Prescriptions  <Download
         
        style={{ fontSize: '18px',color:'#ffffff'}}
      
        onClick={downloadPDF}
      />
        </span>
        
        
        </div>
     

        
        <button
          onClick={toggleExpand}
          className="my-1 text-[12px] text-blue-600 "
        >
          {isExpanded ? 'Show Less' : 'Show All'}
        </button>

       
        {isExpanded && (
          <div className="mt-4 w-full">
            <h3 className="text-sm w-full font-semibold text-gray-800 mb-2">Prescriptions:</h3>
            <div className="flex flex-col w-full gap-2">
              
             {prescriptions?.map((prescription)=>{
              return <div className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded">
              {prescription}
            </div>
             })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default PrescriptionCard