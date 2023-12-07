import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../appraised-properties/Loader";
// import "./SmartTable.css";


const headCells = [
  {
    id: "orderId",
    numeric: false,
    label: "Order Id",
    width: 200,
  },
  {
    id: "amount",
    numeric: false,
    label: "Appraisal Qoute Amount ($)",
    width: 200,
  },
  {
    id: "prop_amount",
    numeric: false,
    label: "Proposed Amount",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Submitted Date",
    width: 200,
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
    width: 200,
  },
  {
    id: "action",
    numeric: false,
    label: "Actions",
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

export default function Exemple({setModalIsOpenError,allProps,setUpdatedCode,setViewPropertyHandler,setErrorMessage}) {
  
  const userData = (JSON.parse(localStorage.getItem("user")));
  const [properties , setProperties] = useState([]);
  const [props,setProps]=useState(false);

  const [updatedData , setUpdatedData] = useState([]);
  let allProperties = [];
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

  const  filterBidsWithin24Hours = (property) => {
    
    let prop={};
    allProperties.filter((bid) => {
      if (
        bid.propertyId === property.propertyId
      ) {
        prop=bid;
      } else {
      }
    });
    console.log(prop);
    return prop;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    const getData = () => {
      properties.map((property) => {
        const currentProperty = filterBidsWithin24Hours(property);
        console.log(currentProperty);
        const updatedRow = {
          orderId: currentProperty.orderId,
          date: formatDate(property.requestTime),
          amount: property.bidLowerRange,
          prop_amount: property.bidAmount,
          status : property.status === 0 ? "In Progress" : property.status ? "Completed" : "Declined",
          action:
            property.status === 0
              ? "Waiting"
              : property.status === 1
              ? (
                  <div className="print-hidden-column">
                    <ul className="">
                      <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="View"
                      >
                        <button onClick={() => setViewPropertyHandler(currentProperty)}>
                          <span className="flaticon-view"></span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              : "Not Applicable",
        };
        tempData.push(updatedRow);
      });
      setUpdatedData(tempData);
    };
  
    getData();
  }, [properties]);
  

  useEffect(()=>{

    setProps(false);
    const user = JSON.parse(localStorage.getItem("user"));
   
      
    let tempProps = [];
    
  },[props]);

  useEffect(()=>{
    setUpdatedCode(true);
  },[updatedData]);

  useEffect(()=>{
    
   
    const user = JSON.parse(localStorage.getItem("user"));
    const getData = ()=>{
    
    
    let tempBids = [];
    axios.get("/api/getAllBids",{
      headers : {
        Authorization : `Bearer ${user.token}`
      }
    })
    .then((res)=>{
   
      setProps(true);
      tempBids =res.data.data.result.$values;
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
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
    let userWishlistProp = [];
    const tempData = res.data.data.properties.$values;
    
    const selectedData =tempBids.filter((prop,index)=>{
        return tempData.filter((prop2,index)=>{
          if(prop.propertyId === prop2.propertyId){
            userWishlistProp.push(prop2);
          return true;}
          else
          return false;
        })
    })

    console.log(userWishlistProp);
    allProperties = userWishlistProp;
    setProperties(tempBids);
    
  })
  .catch((err) => {
    toast.dismiss();
    toast.error(err?.response);
  });
      
  }
      
      getData();
  },[]);
  return (
    <>
    { properties.length > 0 ? (<SmartTable
      title=""
      data={updatedData}
      headCells={headCells}
    />): <Loader/>}
    </>
  );
}
