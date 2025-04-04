// import React, { useState } from "react";

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     phone_number: "",
//     region: "",
//     address: "",
//     type_disease: "",
//     face_condition: "",
//     medications_taken: "",
//     home_care_items: "",
//     photo: null,
//     total_payment_due: "",
//     appointments: [{ appointment_time: "" }],
//   });

//   // Function to handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "file" ? files[0] : value,
//     });
//   };

//   // Function to add a new appointment field
//   const handleAddAppointment = () => {
//     setFormData({
//       ...formData,
//       appointments: [...formData.appointments, { appointment_time: "" }],
//     });
//   };

//   // Function to remove an appointment field
//   const handleRemoveAppointment = (index) => {
//     const updatedAppointments = formData.appointments.filter(
//       (_, i) => i !== index
//     );
//     setFormData({ ...formData, appointments: updatedAppointments });
//   };

//   // Function to update appointment fields
//   const handleAppointmentChange = (index, value) => {
//     const updatedAppointments = formData.appointments.map((appointment, i) =>
//       i === index ? { appointment_time: value } : appointment
//     );
//     setFormData({ ...formData, appointments: updatedAppointments });
//   };

//   // Submit form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Client-side validation
//     if (
//       !formData.full_name.trim() ||
//       !formData.phone_number.trim() ||
//       !formData.region.trim() ||
//       !formData.type_disease.trim() ||
//       !formData.total_payment_due.trim()

//     ) {
//       alert("Barcha kerakli maydonlarni to'ldiring!");
//       return;
//     }

//     const isAppointmentsValid = formData.appointments.every(
//       (appointment) =>
//         appointment.appointment_time.trim() !== "" &&
//         !isNaN(Date.parse(appointment.appointment_time))
//     );

//     if (!isAppointmentsValid) {
//       alert("Appointments maydonidagi barcha sanalar to'g'ri formatda bo'lishi kerak!");
//       return;
//     }

//     const authToken = localStorage.getItem("authToken");

//     // Convert appointments to expected format
//     const formattedAppointments = formData.appointments.map((appointment) => ({
//       appointment_time: appointment.appointment_time,
//     }));

//     const dataToSend = {
//       ...formData,
//       appointments: formattedAppointments,
//     };

//     console.log("Yuborilayotgan ma'lumotlar:", dataToSend);

//     try {
//       const response = await fetch(
//         "https://dilshodakosmetolog.uz/monitoring/patients/create/",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "application/json",

//           },
//           body: JSON.stringify(dataToSend),
//         }
//       );

//       // Check the response
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Xato:", errorData);
//         alert("Serverdan xato qaytdi. Malumotlaringizni tekshiring.");
//       } else {
//         const responseData = await response.json();
//         console.log("Muvaffaqiyatli javob:", responseData);
//         alert("Foydalanuvchi muvaffaqiyatli yaratildi!");
//       }
//     } catch (err) {
//       console.console.log();

//       console.error("So'rov bajarilmadi:", err);
//       alert("Iltimos, internet ulanishingizni tekshiring.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-2xl mx-auto p-4 bg-base-100 shadow-xl rounded-lg space-y-4"
//     >
//       {/* Full Name */}
//       <div>
//         <label htmlFor="full_name" className="label px-1 text-base-content font-medium">
//           Full Name
//         </label>
//         <input
//           type="text"
//           id="full_name"
//           name="full_name"
//           value={formData.full_name}
//           onChange={handleChange}
//           className="input text-base-content input-bordered w-full"
//           placeholder="e.g., Asadbek Ismoilov"
//           required
//         />
//       </div>

//       {/* Phone Number */}
//       <div>
//         <label htmlFor="phone_number" className="label px-1 text-base-content font-medium">
//           Phone Number
//         </label>
//         <input
//           type="tel"
//           id="phone_number"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           className="input text-base-content input-bordered w-full"
//           placeholder="e.g., +998901234567"
//           required
//         />
//       </div>

//       {/* Region */}
//       <div>
//         <label htmlFor="region" className="label px-1 text-base-content font-medium">
//           Region
//         </label>
//         <input
//           type="number"
//           id="region"
//           name="region"
//           value={formData.region}
//           onChange={handleChange}
//           className="input text-base-content input-bordered w-full"
//           placeholder="Enter region ID"
//           required
//         />
//       </div>

//       {/* Address */}
//       <div>
//         <label htmlFor="address" className="label px-1 text-base-content font-medium">
//           Address
//         </label>
//         <input
//           type="text"
//           id="address"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           className="input text-base-content input-bordered w-full"
//           placeholder="e.g., Toshkent, Yunusobod tumani"
//           required
//         />
//       </div>

//       {/* Disease Type */}
//       <div>
//         <label htmlFor="type_disease" className="label px-1 text-base-content font-medium">
//           Type of Disease
//         </label>
//         <input
//           type="number"
//           id="type_disease"
//           name="type_disease"
//           value={formData.type_disease}
//           onChange={handleChange}
//           className="input text-base-content input-bordered w-full"
//           placeholder="Enter disease ID"
//           required
//         />
//       </div>

//       {/* Face Condition */}
//       <div>
//         <label htmlFor="face_condition" className="label px-1 text-base-content font-medium">
//           Face Condition
//         </label>
//         <textarea
//           id="face_condition"
//           name="face_condition"
//           value={formData.face_condition}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//           placeholder="Brief description"
//           required
//         ></textarea>
//       </div>

//       {/* Medications Taken */}
//       <div>
//         <label htmlFor="medications_taken" className="label px-1 text-base-content font-medium">
//           Medications Taken
//         </label>
//         <textarea
//           id="medications_taken"
//           name="medications_taken"
//           value={formData.medications_taken}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//           placeholder="List of medications"
//           required
//         ></textarea>
//       </div>

//       {/* Home Care Items */}
//       <div>
//         <label htmlFor="home_care_items" className="label px-1 text-base-content font-medium">
//           Home Care Items
//         </label>
//         <textarea
//           id="home_care_items"
//           name="home_care_items"
//           value={formData.home_care_items}
//           onChange={handleChange}
//           className="textarea textarea-bordered w-full"
//           placeholder="e.g., Specific creams"
//           required
//         ></textarea>
//       </div>

//       {/* Photo */}
//       <div>
//         <label htmlFor="photo" className="label px-1 text-base-content font-medium">
//           Photo
//         </label>
//         <input
//           type="file"
//           id="photo"
//           name="photo"
//           onChange={handleChange}
//           className="file-input text-base-content file-input-bordered w-full"
//         />
//       </div>
//       {/* Total Payment Due */}
//       <div>
//         <label htmlFor="total_payment_due" className="label px-1 text-base-content font-medium">
//           Total Payment Due
//         </label>
//         <input
//           type="number"
//           id="total_payment_due"
//           name="total_payment_due"
//           value={formData.total_payment_due}
//           onChange={handleChange}
//           className="input text-base-content input-bordered w-full"
//           placeholder="e.g., 150000.00"
//           required
//         />
//       </div>

//       {/* Appointments */}
//       <div>
//         <label className="label px-1 text-base-content font-medium">Appointments</label>
//         {formData.appointments.map((appointment, index) => (
//           <div key={index} className="flex items-center gap-2 mb-2">
//             <input
//               type="datetime-local"
//               value={appointment.appointment_time}
//               onChange={(e) => handleAppointmentChange(index, e.target.value)}
//               className="input text-base-content input-bordered flex-1"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => handleRemoveAppointment(index)}
//               className="btn btn-error btn-sm"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddAppointment}
//           className="btn btn-primary btn-sm"
//         >
//           Add Appointment
//         </button>
//       </div>

//       {/* Submit Button */}
//       <button type="submit" className="btn btn-success w-full">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default UserForm;




/////////////////////////////////////////////

// import { CameraIcon, Trash2 } from "lucide-react";

// import { useState } from "react";
// import { toast, Toaster } from "sonner";

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     phone_number: "",
//     region: "",
//     address: "",
//     type_disease: "",
//     face_condition: "",
//     medications_taken: "",
//     home_care_items: "",
//     total_payment_due: "",
//     photo: null,
//     appointments: [{ appointment_time: "" }],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     console.log("Tanlangan fayl:", selectedFile); // Fayl obyektini logga chiqarish
//     if (selectedFile) {
//       setFormData((prev) => ({ ...prev, photo: selectedFile }));
//     } else {
//       setFormData((prev) => ({ ...prev, photo: null }));
//     }
//   };

//   const handleAppointmentChange = (index, value) => {
//     const updatedAppointments = [...formData.appointments];
//     updatedAppointments[index].appointment_time = value;
//     setFormData((prev) => ({ ...prev, appointments: updatedAppointments }));
//   };

//   const addAppointment = () => {
//     setFormData((prev) => ({
//       ...prev,
//       appointments: [...prev.appointments, { appointment_time: "" }],
//     }));
//   };

//   const removeAppointment = (index) => {
//     const updatedAppointments = formData.appointments.filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, appointments: updatedAppointments }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       alert("Token topilmadi. Iltimos, tizimga kiring!");
//       return;
//     }
//     const data = {
//       full_name: formData.full_name,
//       phone_number: formData.phone_number,
//       region: Number(formData.region), // Ensure region is a number
//       address: formData.address,
//       type_disease: Number(formData.type_disease), // Ensure type_disease is a number
//       face_condition: formData.face_condition,
//       medications_taken: formData.medications_taken,
//       home_care_items: formData.home_care_items,
//       total_payment_due: Number(formData.total_payment_due), // Ensure total_payment_due is a number
//       photo: formData.photo ? formData.photo.name : null,  // Set photo to null or handle it based on your requirements
//       appointments: formData.appointments.map((appointment) => ({
//         appointment_time: appointment.appointment_time,
//       })), // Format appointments array
//     };

//     console.log("Photo:", formData.photo instanceof File ? "File mavjud!" : "Photo noto‘g‘ri!");
//     console.log("Ma'lumotlar:", {
//       full_name: formData.full_name,
//       phone_number: formData.phone_number,
//       region: formData.region,
//       photo: formData.photo,
//     });



//     try {
//       const response = await fetch("https://dilshodakosmetolog.uz/monitoring/patients/create/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(data), // Convert data to JSON string
//       });

//       if (!response.ok) {
//         throw new Error("Yuborishda xatolik yuz berdi");
//       }

//       const result = await response.json();
//       toast.success("Ma'lumot muvaffaqiyatli yuborildi!");
//       console.log(result);
//     } catch (error) {
//       console.error("Xatolik:", error);
//       toast.error("Yuborishda xatolik yuz berdi");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 mx-auto  space-y-4 border rounded-lg shadow">
//       <div className="lg:p-7 lg:pb-3">

//         <div className="flex gap-5 "> {/* bu glavniy kichkina */}


//           <div className=" w-full ">

//             <div className="flex gap-5">

//               <div className=" ">
//                 {/* Photo */}
//                 <div className="mt-6 w-28 h-28 border border-gray-400 rounded-md relative flex justify-center items-center">
//                   <CameraIcon className="w-8 h-8 text-gray-400" />
//                   <input
//                     type="file"
//                     id="photo"
//                     name="photo"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="file-input text-base-content file-input-bordered w-full absolute z-10 h-full opacity-0"
//                   />
//                 </div>
//                 {/* <label htmlFor="photo" className="label px-1  w-full flex justify-center text-base-content font-medium">
//                 Photo
//               </label> */}
//               </div>{/*fotka*/}

//               <div className="w-full">
//                 <div className="">
//                   <label htmlFor="full_name" className="label px-1 text-base-content font-medium">
//                     Ism Familya
//                   </label>
//                   <input
//                     type="text"
//                     id="full_name"
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     className="input text-base-content input-bordered text-base-content bg-transparent  w-full"
//                     placeholder="e.g., Asadbek Ismoilov"
//                     required
//                   />
//                 </div>
//                 {/* Phone Number */}
//                 <div className="mt-3">
//                   <label htmlFor="phone_number" className="label px-1 text-base-content font-medium">
//                     Telefon
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone_number"
//                     name="phone_number"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     className="input text-base-content input-bordered text-base-content bg-transparent  w-full"
//                     placeholder="e.g., +998901234567"
//                     required
//                   />
//                 </div>
//               </div>
//               <Toaster position="top-right" />

//             </div>







//             {/* Disease Type */}
//             <div className="mt-3">
//               <label htmlFor="type_disease" className="label px-1 text-base-content font-medium">
//                 Type of Disease
//               </label>
//               <input
//                 type="number"
//                 id="type_disease"
//                 name="type_disease"
//                 value={formData.type_disease}
//                 onChange={handleChange}
//                 className="input text-base-content input-bordered text-base-content bg-transparent  w-full"
//                 placeholder="Enter disease ID"
//                 required
//               />
//             </div>

//             {/* Face Condition */}
//             <div className="mt-3">
//               <label htmlFor="face_condition" className="label px-1 text-base-content font-medium">
//                 Yuz Holati
//               </label>
//               <textarea
//                 id="face_condition"
//                 name="face_condition"
//                 value={formData.face_condition}
//                 onChange={handleChange}
//                 className="textarea textarea-bordered text-base-content bg-transparent  w-full"
//                 placeholder="Brief description"
//                 required
//               ></textarea>
//             </div>

//             {/* Medications Taken */}
//             <div className="mt-3">
//               <label htmlFor="medications_taken" className="label px-1 text-base-content font-medium">
//                 Medications Taken
//               </label>
//               <textarea
//                 id="medications_taken"
//                 name="medications_taken"
//                 value={formData.medications_taken}
//                 onChange={handleChange}
//                 className="textarea textarea-bordered text-base-content bg-transparent  w-full"
//                 placeholder="List of medications"
//                 required
//               ></textarea>
//             </div>






//           </div>




//           <div className="w-full">
//             {/* Region */}
//             <div >
//               <label htmlFor="region" className="label px-1 text-base-content font-medium">
//                 Viloyat
//               </label>
//               <input
//                 type="number"
//                 id="region"
//                 name="region"
//                 value={formData.region}
//                 onChange={handleChange}
//                 className="input text-base-content input-bordered text-base-content bg-transparent  w-full"
//                 placeholder="Enter region ID"
//                 required
//               />
//             </div>

//             {/* Address */}
//             <div className="mt-3">
//               <label htmlFor="address" className="label px-1 text-base-content font-medium">
//                 Manzil
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="input text-base-content input-bordered text-base-content bg-transparent  w-full"
//                 placeholder="e.g., Toshkent, Yunusobod tumani"
//                 required
//               />
//             </div>
//             {/* Total Payment Due */}
//             <div className="mt-3">
//               <label htmlFor="total_payment_due" className="label px-1 text-base-content font-medium">
//                 To'lov Summasi
//               </label>
//               <input
//                 type="number"
//                 id="total_payment_due"
//                 name="total_payment_due"
//                 value={formData.total_payment_due}
//                 onChange={handleChange}
//                 className="input text-base-content input-bordered text-base-content bg-transparent w-full"
//                 placeholder="e.g., 150000.00"
//                 required
//               />
//             </div>
//             {/* Home Care Items */}
//             <div className="mt-3">
//               <label htmlFor="home_care_items" className="label px-1 text-base-content font-medium">
//                 Home Care Items
//               </label>
//               <textarea
//                 id="home_care_items"
//                 name="home_care_items"
//                 value={formData.home_care_items}
//                 onChange={handleChange}
//                 className="textarea textarea-bordered text-base-content bg-transparent  w-full"
//                 placeholder="e.g., Specific creams"
//                 required
//               ></textarea>
//             </div>
//             <label className="label px-1 text-base-content font-medium mt-3">Ko'rik Vaqti</label>
//             {formData.appointments.map((appointment, index) => (
//               <div key={index} className="flex items-center gap-2 mb-2 ">
//                 <input
//                   type="datetime-local"
//                   value={appointment.appointment_time}
//                   onChange={(e) => handleAppointmentChange(index, e.target.value)}
//                   className="input text-base-content input-bordered text-base-content bg-transparent flex-1"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeAppointment(index)}
//                   className="btn bg-[crimson]"
//                 >
//                   <Trash2 size={20} className="text-white" />
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addAppointment}
//               className="btn bg-green-500 text-white btn-sm"
//             >
//               Add Appointment
//             </button>
//           </div>

//         </div>



//         {/* ////////////////////////////////////////////////////////////////////////// */}





//         {/* Submit Button */}
//         <button type="submit" className="btn my-7 py-5 bg-[orange] text-white w-full">
//           Submit
//         </button>
//       </div>
//     </form >
//   );
// };

// export default UserForm;


import { CameraIcon, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { DataService } from "../../config/DataService";
import { endpoints } from "../../config/endpoinds";
import { useNavigate } from "react-router-dom";

const UserFrom = () => {
  const navigate = useNavigate()
  const [boolens, setBoolen] = useState({ region: false, type: false, region_name: "Viloyat", type_name: "Turi" });
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    region: "",
    address: "",
    type_disease: "",
    face_condition: "",
    medications_taken: "",
    home_care_items: "",
    total_payment_due: "",
    photo: null,
    appointments: [{ appointment_time: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      setFormData((prev) => ({ ...prev, photo: file }));
      console.log("Selected File:", file);



    } else {
      console.error("Fayl tanlanmagan!");
    }
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();

  //     // Faylni o'qish jarayonida nimani qilish kerakligini aniqlash
  //     reader.onload = () => {
  //       const base64String = reader.result.split(",")[1]; // Base64 stringni olish
  //       console.log("Base64 format:", base64String);

  //       // Base64ni formData ga qo'shish
  //       setFormData((prev) => ({ ...prev, photo: base64String }));
  //     };

  //     // Faylni o'qish jarayonini boshlash
  //     reader.readAsDataURL(file);
  //   } else {
  //     console.error("Fayl tanlanmagan!");
  //   }
  // };

  const handleAppointmentChange = (index, value) => {
    const updatedAppointments = [...formData.appointments];
    updatedAppointments[index].appointment_time = value;
    setFormData((prev) => ({ ...prev, appointments: updatedAppointments }));
  };

  const addAppointment = () => {
    setFormData((prev) => ({
      ...prev,
      appointments: [...prev.appointments, { appointment_time: "" }],
    }));
  };

  const removeAppointment = (index) => {
    const updatedAppointments = formData.appointments.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, appointments: updatedAppointments }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Token topilmadi. Iltimos, tizimga kiring!");
      return;
    }

    // FormData yaratish




    try {
      const response = await fetch(
        "https://dilshodakosmetolog.uz/monitoring/patients/create/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Tokenni qo‘shish
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // FormData formatida yuboriladi
        }
      );

      if (!response.ok) {
        console.log("Photo:", formData.photo);
        throw new Error("Yuborishda xatolik yuz berdi");
      }

      const result = await response.json();
      toast.success("Ma'lumot muvaffaqiyatli yuborildi!");
      // navigate(`/`)

      // setFormData({
      //   full_name: "",
      //   phone_number: "",
      //   region: "",
      //   address: "",
      //   type_disease: "",
      //   face_condition: "",
      //   medications_taken: "",
      //   home_care_items: "",
      //   total_payment_due: "",
      //   photo: null,
      //   appointments: [{ appointment_time: "" }],
      // });
      // console.log(result);
    } catch (error) {
      // console.error("Xatolik:", error);
      toast.error("Yuborishda xatolik yuz berdi");
    }
  };

  const [apiDataIn, setApiDataIn] = useState([]);
  const fetchDataIn = async () => {
    const response = await DataService.get(endpoints.region);
    setApiDataIn(response);

  };
  useEffect(() => {
    fetchDataIn();


  }, []);



  const [apiDataDs, setApiDataDs] = useState([]);
  const fetchDataDs = async () => {
    const response = await DataService.get(endpoints.diseases);
    setApiDataDs(response);

  };
  useEffect(() => {
    fetchDataDs();


  }, []);




  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto  space-y-4 border rounded-lg shadow">
      <div className="lg:p-7 lg:pb-3">

        <div className="flex gap-5"> {/* bu glavniy kichkina */}


          <div className=" w-full">

            <div className="flex justify-between ">

              <div className="mr-5 ">
                {/* Photo */}

                <div className="mt-6 w-28 h-28 border border-gray-400 rounded-md !bg-cover !bg-no-repeat relative bg-center flex justify-center items-center" style={{
                  backgroundImage: formData?.photo ? `url(${URL.createObjectURL(formData.photo)})` : "https://img.favpng.com/10/24/2/computer-icons-user-icon-design-male-png-favpng-grqs7j1MENUsCah7VD6XBWVst.jpg"
                }}
                >
                  <CameraIcon className="w-8 h-8 text-base-content" />

                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleFileChange}
                    className="file-input text-base-content bg-transparent file-input-bordered w-full absolute z-10 h-full opacity-0"
                  />




                </div>

              </div>{/*fotka*/}

              <div className="w-full">
                <div className="">
                  <label htmlFor="full_name" className="label px-1 text-base-content font-medium">
                    Ism Familya
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="input text-base-content input-bordered w-full"
                    placeholder="Ism Familya"
                    required
                  />
                </div>
                {/* Phone Number */}
                <div className="mt-3">
                  <label htmlFor="phone_number" className="label px-1 text-base-content font-medium">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="input text-base-content input-bordered w-full"
                    placeholder="+998901234567"
                    required
                  />
                </div>
              </div>
              <Toaster position="top-right" />

            </div>





            <div className="flex gap-4 justify-end mt-3">
              <div className="relative inline-block text-left w-full">
                <label className="text-base-content">
                  Viloyat
                </label>
                <button type="button" className="inline-flex cursor-pointer bg-base-100  justify-start px-4 w-full rounded-md border border-gray-600 shadow-sm  py-[10px] text-sm font-medium text-base-content hover:bg-base-300 focus:outline-none"

                  onClick={() => setBoolen({ ...boolens, region: !boolens.region })}
                >
                  {boolens.region_name}
                </button>

                {boolens.region && <div className="absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-base-100  border border-gray-600">
                  <div className="py-1 min-h-30">
                    {apiDataIn?.map((item, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2  text-sm text-base-content hover:bg-base-300"
                        onClick={() => { setBoolen({ ...boolens, region: false, region_name: item?.name }); setFormData({ ...formData, region: item?.id }) }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>}
              </div>
              <div className="relative inline-block !text-left w-full">
                <label className="text-base-content">
                  Kasallik
                </label>
                <button type="button" className="inline-flex cursor-pointer  bg-base-100 justify-start px-2 h-[41px] w-full rounded-md border border-gray-600 shadow-sm  py-[10px] text-sm font-medium text-base-content hover:bg-base-300 focus:outline-none"
                  onClick={() => setBoolen({ ...boolens, type: !boolens.type })}
                >
                  {boolens.type_name}
                </button>

                {boolens.type ? (<div className="absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-base-100  border border-gray-600">
                  <div className="py-1 min-h-30">
                    {apiDataDs?.map((item, index) => (
                      <a
                        key={item?.id}
                        href="#"
                        className="block px-4 py-2 text-sm text-base-content hover:bg-base-300"
                        onClick={() => { setBoolen({ ...boolens, type: false, type_name: item?.name }); setFormData({ ...formData, type_disease: item?.id }) }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>) : ""}
              </div>
            </div>

            {/* Disease Type */}

            {/* <div className="mt-3">
              <label htmlFor="type_disease" className="label px-1 text-base-content font-medium">
                Type of Disease
              </label>
              <input
                type="number"
                id="type_disease"
                name="type_disease"
                value={formData.type_disease}
                onChange={handleChange}
                className="input text-base-content input-bordered w-full"
                placeholder="Enter disease ID"
                required
              />
            </div> */}

            {/* Face Condition */}
            <div className="mt-3">
              <label htmlFor="face_condition" className="label px-1 text-base-content font-medium">
                Yuz Holati
              </label>
              <textarea
                id="face_condition"
                name="face_condition"
                value={formData.face_condition}
                onChange={handleChange}
                className="textarea text-base-content textarea-bordered w-full"
                placeholder="Tarif"
                required
              ></textarea>
            </div>

            {/* Medications Taken */}
            <div className="mt-3">
              <label htmlFor="medications_taken" className="label px-1 text-base-content font-medium">
                Qo'lanilgan dorilar
              </label>
              <textarea
                id="medications_taken"
                name="medications_taken"
                value={formData.medications_taken}
                onChange={handleChange}
                className="textarea text-base-content textarea-bordered w-full"
                placeholder="Dori darmonlar ro'yhati"
                required
              ></textarea>
            </div>

          </div>

          <div className="w-full">
            {/* Region */}
            {/* <div >
              <label htmlFor="region" className="label px-1 text-base-content font-medium">
                Viloyat
              </label>
              <input
                type="number"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="input text-base-content input-bordered w-full"
                placeholder="Enter region ID"
                required
              />
            </div> */}

            {/* Address */}
            <div className="">
              <label htmlFor="address" className="label px-1 text-base-content font-medium">
                Manzil
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input text-base-content input-bordered w-full"
                placeholder="Yashash manzili"
                required
              />
            </div>
            {/* Total Payment Due */}
            <div className="mt-3">
              <label htmlFor="total_payment_due" className="label px-1 text-base-content font-medium">
                To'lov Summasi
              </label>
              <input
                type="number"
                id="total_payment_due"
                name="total_payment_due"
                value={formData.total_payment_due}
                onChange={handleChange}
                className="input text-base-content input-bordered w-full"
                placeholder="e.g., 150000.00"
                required
              />
            </div>
            {/* Home Care Items */}
            <div className="mt-3">
              <label htmlFor="home_care_items" className="label px-1 text-base-content font-medium">
                Uy uchun mualaja
              </label>
              <textarea
                id="home_care_items"
                name="home_care_items"
                value={formData.home_care_items}
                onChange={handleChange}
                className="textarea text-base-content textarea-bordered w-full"
                placeholder=""
                required
              ></textarea>
            </div>
            <label className="label px-1 text-base-content font-medium mt-3">Ko'rik Vaqti</label>
            {formData.appointments.map((appointment, index) => (
              <div key={index} className="flex items-center gap-2 mb-2 ">
                <input
                  type="datetime-local"
                  value={appointment.appointment_time}
                  onChange={(e) => handleAppointmentChange(index, e.target.value)}
                  className="input text-base-content input-bordered flex-1"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeAppointment(index)}
                  className="btn bg-[crimson]"
                >
                  <Trash2 size={20} className="text-white" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAppointment}
              className="btn bg-green-500 text-white btn-sm"
            >
              Sana qo'shish
            </button>
          </div>

        </div>



        {/* ////////////////////////////////////////////////////////////////////////// */}





        {/* Submit Button */}
        <button type="submit" className="btn my-7 py-5 bg-[orange] text-white w-full"

        >
          Saqlash
        </button>
      </div>
    </form >
  );
};

export default UserFrom;
