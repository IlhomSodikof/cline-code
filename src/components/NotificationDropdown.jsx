import { useCallback, useEffect, useState } from "react";
import { Bell } from 'lucide-react';
import { DataService } from "../config/DataService";
import { endpoints } from "../config/endpoinds";



const NotificationDropdown = () => {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    const response = await DataService.get(endpoints.userCount);
    console.log(response, "Notifif");
    setApiData(response?.tomorrow_patient_count);
    // console.log(response?.results);

  };
  useEffect(() => {
    fetchData();


  }, []);



  const [apiDataIn, setApiDataIn] = useState([]);
  const fetchDataIn = async () => {
    const response = await DataService.get(endpoints.userCountNs);
    console.log(response, "Notifif list");
    setApiDataIn(response);
    // console.log(response?.results);

  };
  useEffect(() => {
    fetchDataIn();


  }, []);

  // helpers/dateFormatter.js
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    // Sana qismlarini ajratib olish
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Oy har doim 2 xonali bo'ladi
    const day = String(dateObject.getDate()).padStart(2, "0");
    const hour = String(dateObject.getHours()).padStart(2, "0");
    const minute = String(dateObject.getMinutes()).padStart(2, "0");
    const second = String(dateObject.getSeconds()).padStart(2, "0");

    // Formatlangan vaqt
    return `${day}.${month}.${year} ${hour}:${minute}:${second}`;
  };



  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        className="hover:text-dark-900 relative bottom-0 flex  items-center justify-center rounded-full   text-gray-500 transition-colors"
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
          setNotifying(false);
        }}
      >
        {apiData < 1 ? (
          ""
        ) : (
          <span
            className={`absolute top-[1px] right-[1px] z-1 h-[0.5rem] w-[0.5rem] rounded-full bg-yellow-500 ${notifying ? "flex" : "hidden"
              }`}
          >
            <span className="absolute -z-1  inline-flex  h-[0.5rem]  w-[0.5rem] animate-ping rounded-full bg-yellow-500 "></span>
          </span>
        )}
        <Bell size={20} className="text-orange-500" />

        {/* <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill=""
          />
        </svg> */}
      </button>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div className="shadow-theme-lg  absolute  -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl shadow-md bg-base-300 p-3 sm:w-[361px] lg:right-0 ">
          <div className="mb-3 flex items-center justify-between border-b border-base-100 pb-3 ">
            <h5 className="text-md font-semibold text-base-content ml-4">
              Notification
            </h5>
            <button
              onClick={() => setDropdownOpen(false)}
              className="text-gray-500 dark:text-gray-400"
            >
              <span
                className={`absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400 ${notifying ? "flex" : "hidden"
                  }`}
              >
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              </span>
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill=""
                />
              </svg>
            </button>
          </div>

          <ul className="custom-scrollbar flex h-full flex-col overflow-y-auto  !scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-base-100">
            {apiDataIn?.map((item) =>
              <li key={item?.id}>
                <a
                  className="flex gap-3  border-b border-base-100 p-3 px-4.5 py-3 "
                  href="#"
                >
                  <span className="relative z-1 block h-10 bg-base-100 shadow-md w-full max-w-10 rounded-full">
                    {item?.photo ? (<img
                      src={item?.photo}
                      alt="User"
                      className="overflow-hidden rounded-full"
                    />) : (<img
                      src="https://randomuser.me/api/portraits/men/3.jpg"
                      alt="User"
                      className="overflow-hidden rounded-full"
                    />)}
                  </span>
                  <span className="block">
                    <span className="text-theme-sm mb-1.5 block text-gray-500">
                      <span className="font-medium text-base-content">
                        {item?.full_name}
                      </span>{" "}
                      murojat sababi:{" "}
                      <span className="font-medium text-base-content">
                        {item?.type_disease?.name}
                      </span>
                    </span>
                    <span className="text-theme-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span>kelish vaqti</span>
                      <span className="h-1 w-1 animate-ping rounded-full bg-gray-400"></span>
                      <span className="">{
                        formatDate(item?.created_at)
                      }</span>
                    </span>
                  </span>
                </a>
              </li>
            )}
            {/* Add More Notifications Here */}
          </ul>

          {/* <a
            href="#"
            className="text-theme-sm  bottom-0  shadow-theme-xs mt-3 flex justify-center rounded-lg border border-gray-300 bg-base-200 p-3 font-medium text-base-content hover:bg-gray-50 hover:text-base-content "
          >
            View All Notifications
          </a> */}
        </div>
      )}
      {/* Dropdown End */}
    </div>
  );
};

export default NotificationDropdown;
