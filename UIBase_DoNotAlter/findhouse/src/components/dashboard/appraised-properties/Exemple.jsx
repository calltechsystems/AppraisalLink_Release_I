import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";


const headCells = [
  {
    id: "title",
    numeric: false,
    label: "Property Title",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Date",
    width: 200,
  },
  {
    id: "urgency",
    numeric: false,
    label: "Urgency",
    width: 200,
  },
  {
    id: "bid",
    numeric: false,
    label: "Bid",
    width: 200,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
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
          title : property.typeOfBuilding,
          date: formatDate(property.addedDatetime ),
          urgency : property.urgency === 0 ? "low" : property.urgency === 1 ? "medium" : "high",
          bid : 0,

        action : <ul><li
        className="list-inline-item"
        style={{
          width: "30px",
          border: "1px solid black",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        {/* <Link href="/agent-v1">{item.posterName}</Link> */}
        <button onClick={()=>onWishlistHandler(property.propertyId)}>
          <span className="flaticon-heart text-color "></span>
        </button>
      </li>
   
    {/* <div className="fp_pdate float-end">{item.postedYear}</div> */}
    
  <li
    className="list-inline-item"
    data-toggle="tooltip"
    data-placement="top"
    title="Delete"
  >
    <div
      className="fp_pdate float-end mt-1 fw-bold"
      onClick={()=>participateHandler(property.bidLowerRange , property.propertyId)}
    >
      <a href="#" className="text-color">
        Provide Qoute
      </a>
    </div>
  </li>
  </ul>
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
      .get("/api/getPropertiesById",
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
        
        setProperties(res.data.data.property.$values);
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
