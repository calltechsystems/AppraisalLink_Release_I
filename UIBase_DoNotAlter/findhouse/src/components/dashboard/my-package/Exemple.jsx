import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";


const headCells = [
  {
    id: "id",
    numeric: false,
    label: "Unique Id",
    width: 200,
  },
  {
    id: "planType",
    numeric: false,
    label: "Selected Plan",
    width: 200,
  },
  {
    id: "transactionId",
    numeric: false,
    label: "Transaction Id",
    width: 200,
  }
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

export default function Exemple({userData , data , open ,close ,deletePropertyHandler,onWishlistHandler,participateHandler,setErrorMessage,setModalIsOpenError}) {
  
  
  console.log(data);
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
      data.map((property,index)=>{
        const updatedRow = {
          id : property.paymentid ,
          planType : property.transactionDetail,
          transactionId : property.transactionId
        }
        tempData.push(updatedRow);
      });
      setUpdatedData(tempData);
    };
    getData();
  },[data]);

  useEffect(()=>{
    let tempProperties = [];
    const data = (JSON.parse(localStorage.getItem("user")));

    const payload = {
      token : userData.token
    };

  
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
