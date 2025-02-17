import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek=['SUN', 'MON', 'TUE', 'WED' ,'THUS' ,'FRI', 'SAT']   

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM end time

      // Set appointment start time
      if (i === 0) {
        // Today’s appointments start from the next available time
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // Future days start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(...timeSlots); // Flatten the slots array
    }

    setDocSlots(allSlots); // Update state in one go
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* Doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-blue-600 w-full sm:max-w-72 rounded-lg" src={docInfo.image} />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:[mt-0]">
            {/* Doctor Info */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="border rounded-full px-2 py-0.5 text-xs">{docInfo.experience}</button>
            </div>
            {/* Doctor About Section */}
            <div>
              <p className="flex items-center mt-3 gap-1 text-sm font-medium text-gray-900">
                About <img src={assets.info_icon} />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1 ">{docInfo.about}</p>
              <p className="text-gray-500 font-medium mt-4">
                Appointment Fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
              </p>
            </div>
          </div>
        </div>
        {/* ------- Booking slots ----------- */}
     <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
      <p>Booking slots</p>
      docSlots.length && docSlots.map((item,index)=>(
        <div key={index}>
          <p>{item[0] && daysOfWeek[days[0].dateTime.getDay()]}</p>
          <p>{item[0] && item[0].dateTime.getDate()}</p>
        </div>
      ))
     </div>
      </div>
    )
  );
};

export default Appointments;
