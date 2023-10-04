import Link from "next/link";
import Router, { useRouter } from "next/router";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import CircularIcon from "./CircularIcon";
import {getSession} from 'next-iron-session'
import { useEffect } from "react";

const MyAccount = ({user, profileCount , setProfile, userData}) => {
  const profileMenuItems = [
    { id: 1, name: "Profile", ruterPath: "/my-profile" },
    // { id: 2, name: " My Message", ruterPath: "/my-message" },
    // { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    { id: 4, name: "Change Password ", ruterPath: "/broker-change-password" },
    { id: 5, name: "Log out", ruterPath: "/login" },
  ];
  const route = useRouter();
  const logout = ()=>{
    // localStorage.removeItem("user");
    // route.push("/login");
  }
  return (
    <>
      <div className="user_set_header">
        <Image
          width={40}
          height={40}
          className="float-start"
          src= {userData?.broker_Details?.profileImage ? userData.broker_Details?.profileImage : ""} 
          alt="e1.png"
        />
        <p>
        {userData?.broker_Details?.firstName ? userData?.broker_Details?.firstName  : "Name"}<br />
          <span className="address">{userData?.userEmail ? userData.userEmail : "xyz@gmail.com"}</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.ruterPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, route.pathname)
                ? { color: "#ff5a5f" }
                : undefined
            }
          >
          {item.id === 5 ? <button style={{color:"#2e008b"}} onClick={logout}>Logout</button> : <div style={{display:'flex',flexDirection:"row"}}>
          {item.id === 1 && <CircularIcon percentage={profileCount}/>}  
          {item.name}
          </div>}
          </Link>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      user: session?.user || null,
    },
  };
}

export default MyAccount;
