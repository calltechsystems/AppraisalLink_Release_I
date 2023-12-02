import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";


const headCells = [
  {
    id: "orderId",
    numeric: false,
    label: "Order Id",
    width: 200,
  },
  {
    id: "address",
    numeric: false,
    label: "Address",
    width: 200,
  },
  ,
  {
    id: "community",
    numeric: false,
    label: "Community",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Submission Date",
    width: 200,
  },
  {
    id: "bidAmount",
    numeric: false,
    label: "Quote Proposal ($)",
    width: 200,
  },
  {
    id: "urgency",
    numeric: false,
    label: "Urgency",
    width: 200,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
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

export default function Exemple({userData , open ,close ,setUpdatedCode,setViewProperty,openViewModal,participateHandler,onWishlistHandler, properties, setProperties,setModalIsOpenError,setErrorMessage}) {
  

  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [bids, setBids] = useState([]);
  const [hideAction, setHideAction] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [isStatus,setStatus]=useState(false);
  const [show, setShow] = useState(false);
  let tempData = [];
  let status = 0;

  const filterBidsWithin24Hours = (property) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0,bidValues = {};
    bids.filter((bid) => {
      if (
        bid.appraiserUserId === userData.userId &&
        bid.propertyId === property.propertyId
      ) {
        bidValues = bid;
        tempBid = tempBid + 1;
      } else {
      }
    });
    console.log(bidValues.status);
    setStatus(bidValues.status );
    status = bidValues.status;
    return tempBid > 0 ? true : false;
    
    // const currentTime = new Date();
    // const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // Subtracting milliseconds for 24 hours
    //    const requestTime = new Date(tempBid.requestTime);
    //   return requestTime >= twentyFourHoursAgo && requestTime <= currentTime;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);

    return formattedDate;
  };

  const checkWishlistedHandler = (data) => {
    let temp = false;
    wishlist.map((prop, index) => {
      if (prop.propertyId === data.propertyId) temp = true;
    });
    return temp ? true : false;
  };

  const setViewPropertyHandler = (property)=>{
    setViewProperty(property);
    openViewModal(true);
  }

  
  useEffect(()=>{
    const getData = ()=>{

     
      properties.map((property,index)=>{
        const isWishlist = checkWishlistedHandler(property);
        const isBidded = filterBidsWithin24Hours(property);
      
        if(isWishlist || isBidded){
        const updatedRow = {
          orderId: property.orderId,
          address: `${property.city}-${property.state},${property.zipCode}`,
          community: `${property.community}`,
          date: formatDate(property.addedDatetime),
          bidAmount: property.bidLowerRange,
          urgency:
            property.urgency === 0
              ? "Low"
              : property.urgency === 1
              ? "Medium"
              : "High",
          action: (
            <div className="print-hidden-column">
              <ul className="">
            
                {!isWishlist  && (
                  <li
                    className="list-inline-item"
                    style={{
                      width: "30px",
                      // border: "1px solid black",
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <Link href="/agent-v1">{item.posterName}</Link> */}
                    {
                      <button
                        onClick={() => onWishlistHandler(property.propertyId)}
                      >
                        <span className="flaticon-heart text-color "></span>
                      </button>
                    }
                  </li>
                )}

                {/* <div className="fp_pdate float-end">{item.postedYear}</div> */}

                {!isBidded && (
                  <li
                    className="list-inline-item"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                  >
                    <div
                      className="mt-1 fw-bold"
                      onClick={() =>
                        participateHandler(
                          property.bidLowerRange,
                          property.propertyId
                        )
                      }
                    >
                      <a
                        href="#"
                        className="text-color"
                        style={{ marginLeft: "10px" }}
                      >
                        Provide Qoute
                      </a>
                    </div>
                  </li>
                )}
                {status ===1 && <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="View"
                >
                  <button onClick={()=>setViewPropertyHandler(property)}>
                    <span className="flaticon-view"></span>
                  </button>
                </li>}
               
              </ul>
            </div>
          ),
        };

        tempData.push(updatedRow);
      }
      });
      setUpdatedData(tempData);
    };
    getData();
  },[properties]);

  useEffect(()=>{
    setUpdatedCode(true);
  },[updatedData]);

  useEffect(()=>{
    
   

    const data = JSON.parse(localStorage.getItem("user"));

    
    axios
      .get("/api/appraiserWishlistedProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        const tempData = res.data.data.$values;

        // setAllWishlistedProperties(res.data.data.$values);
        const responseData = tempData.filter((prop, index) => {
          if (prop.userId === data.userId) {
            return true;
          } else {
            return false;
          }
        });
        const tempId = responseData;
        console.log("wishlist", responseData);
        setWishlist(responseData);
      })
      .catch((err) => {
        toast.error(err?.response);
        setErrorMessage(err?.response);
        setModalIsOpenError(true);
      });
    axios
      .get("/api/getAllBids", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        toast.dismiss();
        const tempData = res.data.data.result.$values;
        const responseData = tempData.filter((prop, index) => {
          if (prop.userId === data.userId) {
            return true;
          } else {
            return false;
          }
        });
        const updated24HoursBid = responseData.filter((prop, index) => {
          if (filterBidsWithin24Hours(prop)) {
            return true;
          } else {
            return false;
          }
        });
        console.log("bids",responseData);
        setBids(responseData);
      })
      .catch((err) => {
        toast.dismiss();
        // setErrorMessage(err?.response?.data?.error);
        // setModalIsOpenError(true);
      });
         axios.get("/api/getAllListedProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type":"application/json",
        }
      })
      .then((res) => {
        console.log(res);
        console.log("Properties",res.data.data.properties.$values);
        setProperties(res.data.data.properties.$values);
      })
      .catch((err) => {
        toast.dismiss();
        // setErrorMessage(err?.response?.data?.error);
        // setModalIsOpenError(true);
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
