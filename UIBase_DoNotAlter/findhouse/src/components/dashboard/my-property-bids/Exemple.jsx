import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "Id",
    width: 200,
  },
  {
    id: "AppraiserId",
    numeric: false,
    label: "Appraiser Id",
    width: 200,
  },
  {
    id: "quote",
    numeric: false,
    label: "Provided Quote",
    width: 200,
  },
  {
    id: "amount",
    numeric: false,
    label: "Bid Amount",
    width: 200,
  },
  {
    id: "description",
    numeric: false,
    label: "Description",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Date",
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

export default function Exemple({userData , open ,close , propertyId , properties, setProperties,deletePropertyHandler}) {
  
  console.log(propertyId);

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
          id :  property.$id,
          AppraiserId : property.appraiserUserId,
          quote : property.bidLowerRange,
          amount : property.bidAmount,
          description: formatDate(property.description ),
        date : formatDate(property.requestTime)
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
    axios
      .get("/api/getAllBids",
       {
        headers: {
          Authorization:`Bearer ${data?.token}`,
          "Content-Type":"application/json"
        },
        params : {
          userId : data?.userId
        }
      })
      .then((res) => {
   
        toast.dismiss();
        const tempBids = res.data.data.result.$values;
        console.log(tempBids,propertyId);
        let updatedBids = [];
         tempBids.filter((bid,index)=>{
          if(String(bid.propertyId) === String(propertyId)){
            updatedBids.push(bid);
          }
        })
        
        setProperties(updatedBids);
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
