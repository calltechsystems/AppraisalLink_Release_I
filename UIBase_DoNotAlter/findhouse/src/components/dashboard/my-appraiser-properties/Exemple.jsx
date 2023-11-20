import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";


const headCells = [
  {
    id: "description",
    numeric: false,
    label: "Description",
    width: 200,
  },
  {
    id: "amount",
    numeric: false,
    label: "Bid Amount",
    width: 200,
  },
  {
    id: "prop_amount",
    numeric: false,
    label: "Proposed Amount",
    width: 200,
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
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

export default function Exemple({userData , open ,close , properties, setProperties,deletePropertyHandler,onWishlistHandler,participateHandler}) {
  

  const [updatedData , setUpdatedData] = useState([]);
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
          date: formatDate(property.addedDatetime ),
          description : property.description,
          amount : property.bidLowerRange,
          prop_amount : property.bidAmount,
          status : property.status === 0 ? "pending" : property.status === 1 ? "accepted" : "declined"

           }
        tempData.push(updatedRow);
      });
      setUpdatedData(tempData);
    };
    getData();
  },[properties]);

  useEffect(()=>{
    
   

    const data = (JSON.parse(localStorage.getItem("user")));

    const payload = {
      token : userData.token
    };


    toast.loading("Getting properties...");
    const user = JSON.parse(localStorage.getItem("user"));

    toast.loading("Getting all the bids");
    axios.get("/api/getAllBids",{
      headers : {
        Authorization : `Bearer ${user.token}`
      }
    })
    .then((res)=>{
   
        toast.dismiss();
        
        console.log(res);
        setProperties(res.data.data.result.$values);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
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
