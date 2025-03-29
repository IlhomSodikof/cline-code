import UserSection from "./UserSection";
import { useState } from "react";

const UserInfo = ({ apiData, title }) => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <UserSection title={title} >

      <div className='mt-4 text-base-content'>
        <p class="text-base md:text-lg lg:text-[15px] font-medium text-base-content leading-relaxed break-words max-w-full">
          {apiData}
        </p>

      </div>
    </UserSection>
  );
};
export default UserInfo;
