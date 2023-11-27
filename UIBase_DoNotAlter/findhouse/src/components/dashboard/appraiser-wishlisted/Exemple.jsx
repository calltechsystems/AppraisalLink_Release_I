import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";


const headCells = [
  {
    id: "property_name",
    numeric: false,
    label: "Property Name",
    width: 200,
  },
  {
    id: "broker_name",
    numeric: false,
    label: "Broker Name",
    width: 200,
  }
  ,
  {
    id: "broker_contact_info",
    numeric: false,
    label: "Broker Contact Info",
    width: 200,
  },
  {
    id: "prop_amount",
    numeric: false,
    label: "Proposed Amount ($)",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Date",
    width: 200,
  },
];

const data = [
  {
    _id: "6144e83a966145976c75cdfe",
    email: "minagerges123@gmail.com",
    name: "Pending",
    date: "2021-09-17 19:10:50",
    subject: "23456",
    phone: "+96170345114",
    message: "ahlannn",
  },
  {
    _id: "61439914086a4f4e9f9d87cd",
    email: "amineamine1996@gmail.com",
    name: "Completed",
    phone: "+96176466341",
    subject: "12345",
    message: "121212121212121",
    date: "2021-09-16 22:20:52",
  },
  {
    _id: "61439887086a4f4e9f9d87cc",
    email: "as@a.com",
    name: "Progress",
    phone: "+96176466341",
    subject: "54321",
    message: "as",
    date: "2021-09-16 22:18:31",
  },
];

export default function Exemple({userData , open ,close ,deletePropertyHandler,onWishlistHandler,participateHandler,setErrorMessage,setModalIsOpenError}) {
  
  const [updatedData , setUpdatedData] = useState([]);
  const [properties,setProperties] = useState([]);
  const [show , setShow] = useState(false);
  let tempData = [];

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
  
    return formattedDate;
  };

  
  useEffect(()=>{
    const getData = ()=>{

      properties.map((property,index)=>{
        const updatedRow = {
          property_name: `###-###, ${property.city} - ${property.zipCode}`,
          prop_amount : property.bidLowerRange,
          date : formatDate(property.addedDatetime ),
          broker_name : `${property.applicantFirstName} ${property.applicantLastName} , ${property.applicantPhoneNumber}`,
          broker_contact_info : property.applicantEmailAddress,
          urgency : property.urgency === 1 ? "Pending" : property.urgency === 2 ? "Completed" : "Declined",
           }
        tempData.push(updatedRow);
      });
      setUpdatedData(tempData);
    };
    getData();
  },[properties]);

  useEffect(()=>{
    let tempProperties = [];
    const data = (JSON.parse(localStorage.getItem("user")));

    const payload = {
      token : userData.token
    };

    toast.loading("Getting properties...");
    const user = JSON.parse(localStorage.getItem("user"));

    toast.loading("Getting all wishlishted properties");
  axios.get("/api/appraiserWishlistedProperties",
  {
   headers: {
     Authorization:`Bearer ${user?.token}`,
     "Content-Type":"application/json"
   }
 })
 .then((res) => {
  toast.dismiss();
  const tempData = res.data.data.$values;
  
  // setAllWishlistedProperties(res.data.data.$values);
  const responseData = tempData.filter((prop,index)=>{
    if(prop.userId === data.userId){
      return true;
    }
    else{
      return false;
    }
  })
  const tempId =responseData;
  toast.success("Successfully fetched");
  tempProperties = responseData;
  console.log(responseData);
 })
 .catch((err) => {
  toast.dismiss();
  toast.error(err?.response);
   setErrorMessage(err?.response);
   setModalIsOpenError(true);
 });

 axios.get("/api/getAllListedProperties",
  {
   headers: {
     Authorization:`Bearer ${user?.token}`,
     "Content-Type":"application/json"
   }
 })
 .then((res) => {
  toast.dismiss();
  let userWishlistProp = [];
  const tempData = res.data.data.properties.$values;
  const selectedData =tempProperties.filter((prop,index)=>{
      return tempData.filter((prop2,index)=>{
        if(prop.propertyId === prop2.propertyId){
          userWishlistProp.push(prop2);
         return true;}
        else
         return false;
      })
  })
  console.log(userWishlistProp)
  setProperties(userWishlistProp);
 })
 .catch((err) => {
  toast.dismiss();
  toast.error(err?.response);
 });
  },[]);
  return (
    <>
    { updatedData && (<SmartTable
      title=""
      data={updatedData}
      headCells={headCells}
    />)}
    </>
  );
}
