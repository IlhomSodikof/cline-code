import { User, Camera, CircleAlert, CircleCheckBig, OctagonX } from "lucide-react";
import UserSection from "./UserSection";
import { useEffect, useState } from "react";
// import { endpoints } from "../config/endpoints";
import { useParams } from "react-router-dom";
// import { DataService } from "../config/DataService";

const UserHeader = ({ apiData }) => {

  const route = useParams()
  console.log("ichkarida", apiData);

  // const [apiDataIn, setApiDataIn] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const response = await DataService.get(endpoints.patientByid(route?.id));
  //     setApiData(response);
  //     console.log("BU TEAM", response);

  //   } catch (error) {
  //     console.error("Error fetching category data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();


  // }, []);


  const [status, setStatus] = useState("Fa'ol"); // Boshlang'ich status

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Tanlangan qiymatni yangilash
  };
  const [formData, setFormData] = useState({
    name: "Ganiyeva Gulchexra",
    address: "Tashkent",
    email: "Guli.chex@gmail.com",
    phone: "+998 99 999 99 99",
    date: "2025-03-23",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg", // Boshlang'ich surat
    status: "Sog'aygan"
  });
  const [isEditing, setIsEditing] = useState(true); // Tahrirlash rejimi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Yangi suratni vaqtinchalik ko'rsatish
      setFormData({ ...formData, profilePic: imageUrl });
    }
  };

  const toggleEditMode = () => setIsEditing(!isEditing); // Tahrirlash rejimini almashtirish

  return (
    <>
      {isEditing ? (
        <UserSection icon={User} title={"Mijoz malumotlari"}>
          <div className='flex flex-col sm:flex-row justify-around gap-10 w-full items-center'>
            <div className="flex items-center flex-col gap-1">
              <img
                src={apiData?.photo}
                alt='Profile'
                className='rounded-md ml-5 w-40 h-40 object-cover'
              />
              <h3 className='text-lg ml-5 font-semibold text-base-content'>{apiData?.full_name}</h3>
              {apiData?.status == "Qarizdor" ? (<p className=" ml-5 text-yellow-400 flex gap-1"> <span className='font-semibold text-yellow-400'>Status:</span> {apiData?.status} <CircleAlert className="w-5 ml-1" /></p>) : apiData?.status == "Fa'ol" ? (<p className=" ml-5 text-green-400 flex gap-1"> <span className='font-semibold text-green-400'>Status:</span> {formData.status}   <CircleCheckBig className="w-5 ml-1" /></p>) : (<p className=" ml-5 text-[crimson] flex gap-1"> <span className='font-semibold text-[crimson]'>Status:</span> {formData.status} <OctagonX className="w-5 ml-1" /></p>)}

            </div>


            <div className="flex flex-col gap-3">
              <p className='text-gray-400'><span className='font-semibold text-base-content'>Yashash manzili:</span> {apiData?.region?.name}</p>
              {/* <p className='text-gray-400'><span className='font-semibold text-base-content'>Email:</span> {formData.email}</p> */}
              <p className="text-gray-400"> <span className='font-semibold text-base-content'>Telefon:</span> {apiData?.phone_number}</p>
              <p className="text-gray-400"> <span className='font-semibold text-base-content'>Murojat turi:</span> {apiData?.type_disease?.name}</p>
              <p className="text-gray-400"> <span className='font-semibold text-base-content'>Jami to'lov summasi:</span> {apiData?.total_payment_due}</p>
              <p className="text-gray-400"> <span className='font-semibold text-base-content'>To'langan summa:</span> {apiData?.total_paid}</p>
              <p className="text-gray-400"> <span className='font-semibold text-base-content'>To'lanmagan qarizdorlik:</span> {apiData?.remaining_debt}</p>

              {/* {formData.status == "Qarizdor" ? (<p className="text-yellow-400 flex gap-1"> <span className='font-semibold text-yellow-400'>Status:</span> {formData.status} <CircleAlert className="w-5 ml-1" /></p>) : formData.status == "Fa'ol" ? (<p className="text-green-400 flex gap-1"> <span className='font-semibold text-green-400'>Status:</span> {formData.status}   <CircleCheckBig className="w-5 ml-1" /></p>) : (<p className="text-[crimson] flex gap-1"> <span className='font-semibold text-[crimson]'>Status:</span> {formData.status} <OctagonX className="w-5 ml-1" /></p>)} */}
              <p className="text-gray-400"> <span className='font-semibold text-base-content'>Sana:</span> {apiData?.created_at}</p>

            </div>
            <div className="flex flex-col gap-3">
              {/*
               */}
              <label className=" custom-radio flex items-center gap-2 text-green-400">
                <input
                  type="radio"
                  name="status"
                  value="Fa'ol"
                  checked={status === "Fa'ol"}
                  onChange={handleStatusChange}
                  className="h-4 w-4 text-green-500 border-gray-300 bg-transparent focus:ring-green-400"
                />
                <span className="text-green-400"></span>Fa'ol
              </label>
              <label className=" custom-radio flex items-center gap-2 text-yellow-400">
                <input
                  type="radio"
                  name="status"
                  value="Qarizdor"
                  checked={status === "Qarizdor"}
                  onChange={handleStatusChange}
                  className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-400"
                />
                <span className="text-yellow-400"></span>Qarizdor
              </label>
              <label className=" custom-radio flex items-center gap-2 text-red-400">
                <input
                  type="radio"
                  name="status"
                  value="Sog'aygan"
                  checked={status === "Sog'aygan"}
                  onChange={handleStatusChange}
                  className="h-4 w-4 "
                />
                <span className="text-red-400"></span> Sog'aygan
              </label>
            </div>
          </div>
          <div className="flex items-center justify-end mb-2">
            <button onClick={toggleEditMode} className=' mr-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
              Tahrirlash
            </button></div>
        </UserSection>) : (


        <UserSection icon={User} title={"Mijoz malumotlarini tahrirlash"}>
          <div className='flex flex-col sm:flex-row gap-10 items-center mb-6'>
            <div className="flex items-center flex-col gap-3">
              <img
                src={formData.profilePic}

                alt='Profile'
                className='rounded-md ml-5 w-40 h-40 object-cover'
              />
              <div className="relative w-full group">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center">
                  <button onClick={toggleEditMode} className="px-4 py-2 ml-5 border border-blue-500 text-white rounded-lg group-hover:bg-blue-600">
                    <Camera className="text-blue-500 group-hover:text-white" />
                  </button>
                </div>
              </div>


            </div>


            <div className="flex flex-col gap-3">
              <div className='text-lg font-semibold text-gray-100'> <label htmlFor="">I.F.O:</label> <input name="name" type="text" value={formData.name} onChange={handleChange} className="bg-transparent border-b border-gray-400 outline-none border-none" /></div>
              <p className='text-gray-400'><label className='font-semibold text-white'>Yashash manzili:</label> <input name="address" type="text" value={formData.address} onChange={handleChange} className="bg-transparent border-b border-gray-400 outline-none border-none" /></p>
              <p className='text-gray-400'><label className='font-semibold text-white'>Email:</label> <input name="email" type="email" value={formData.email} onChange={handleChange} className="bg-transparent border-b border-gray-400 outline-none border-none" /></p>
              <p className="text-gray-400"> <label className='font-semibold text-white'>Telefon:</label> <input name="phone" type="phone" value={formData.phone} onChange={handleChange} className="bg-transparent border-b border-gray-400 outline-none border-none" /></p>
              <p className="text-gray-400"> <label className='font-semibold text-white'>Sana:</label> <input name="date" type="date" value={formData.date} onChange={handleChange} className="bg-transparent border-b border-gray-400 outline-none border-none" /></p>

            </div>

          </div>

          <div className="flex items-center gap-2 justify-end mb-2">
            <button onClick={toggleEditMode} className='bg-transparent hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-indigo-600 rounded transition duration-200 w-full sm:w-auto'>
              Saqlash
            </button>
            <button onClick={toggleEditMode} className='bg-transparent hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-indigo-600 rounded transition duration-200 w-full sm:w-auto'>
              Bekor qilish
            </button></div>
        </UserSection >)}

    </>
  );
};
export default UserHeader;
