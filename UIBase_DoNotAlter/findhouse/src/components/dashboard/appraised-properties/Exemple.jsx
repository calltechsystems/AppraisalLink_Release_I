import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
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
    id: "bidAmount",
    numeric: false,
    label: "Estimated Property Value ($)",
    width: 200,
  },
  ,
  {
    id: "propertyType",
    numeric: false,
    label: "Property Type ",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Submission Date",
    width: 200,
  },
  {
    id: "broker",
    numeric: false,
    label: "Broker",
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
    title: "6144e83a966145976c75cdfe",
    date: "minagerges123@gmail.com",
    urgency: "Pending",
    bid: "+96170345114",
    action: "ahlannn",
  },
  {
    title: "6144e83a966145976c75cdfe",
    date: "minagerges123@gmail.com",
    urgency: "Pending",
    bid: "+96170345114",
    action: "ahlannn",
  },
  {
    title: "6144e83a966145976c75cdfe",
    date: "minagerges123@gmail.com",
    urgency: "Pending",
    bid: "+96170345114",
    action: "ahlannn",
  },
];

export default function Exemple({
  userData,
  open,
  close,
  setUpdatedCode,
  properties,
  setProperties,
  deletePropertyHandler,
  onWishlistHandler,
  participateHandler,
  openModalBroker,
  setErrorMessage,
  setModalIsOpenError,
  setReload,
  reload
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [bids, setBids] = useState([]);
  const [hideAction, setHideAction] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [show, setShow] = useState(false);
  let tempData = [];

  const filterBidsWithin24Hours = (property) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0;
    bids.filter((bid) => {
      if (
        bid.appraiserUserId === userData.userId &&
        bid.propertyId === property.propertyId
      ) {
        tempBid = tempBid + 1;
      } else {
      }
    });
    return tempBid > 0 ? true : false;
    // const currentTime = new Date();
    // const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // Subtracting milliseconds for 24 hours
    //    const requestTime = new Date(tempBid.requestTime);
    //   return requestTime >= twentyFourHoursAgo && requestTime <= currentTime;
  };

  const router = useRouter();

  const removeWishlistHandler = (id)=>{
    const userData = JSON.parse(localStorage.getItem("user"));

    const formData = {
      userId: userData.userId,
      propertyId: id,
      token: userData.token,
    };

    const payload = encryptionData(formData);
    toast.loading("removing this property into your wishlist");
    axios
      .delete("/api/removeWishlistProperty", {
        headers : {
          Authorization : `Bearer ${userData.token}`
        },
        params : {
          userId : id
        }
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully removed !!! ");
        router.push("/my-appraiser-properties")
        
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
   }

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

  const checkCanBidAgainHandler = (data) => {
    let temp = true;
    return temp;
  };

  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const isWishlist = checkWishlistedHandler(property);
        const isBidded = filterBidsWithin24Hours(property);
        console.log("isBidded", isBidded, index);

        const updatedRow = {
          orderId: property.orderId,
          address: `${property.city}-${property.state},${property.zipCode}`,
          community: `${property.community}`,
          bidAmount:property.bidLowerRange,
          broker:<a href="#"><button style={{border:"0px",color:"blue",backgroundColor:"white"}} onClick={()=>openModalBroker(property)}>{property.applicantFirstName}</button></a>,
         
          propertyType : property.typeOfBuilding > 0 ? "Apartment" : property.typeOfBuilding,
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
                {isWishlist ? (
                  <button onClick={()=>removeWishlistHandler(property.propertyId)}><img
                    width={30}
                    height={30}
                    src="https://th.bing.com/th/id/OIP.h0_o3aftEQhOt3HLVaKSvQHaHT?w=219&h=216&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                  /></button>
                ) : (
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
              </ul>
            </div>
          ),
        };
        tempData.push(updatedRow);
      });
      setUpdatedData(tempData);
      
    };
    getData();
  }, [properties]);

  useEffect(()=>{
    setUpdatedCode(true);
  },[updatedData])

  useEffect(() => {
    setReload(false);
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
    };
    axios
      .get("/api/getPropertiesById", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: data?.userId,
        },
      })
      .then((res) => {
        toast.dismiss();

        setProperties(res.data.data.property.$values);
      })
      .catch((err) => {
        toast.dismiss();
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });
    axios
      .get("/api/appraiserWishlistedProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
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
        console.log(updated24HoursBid);
        setBids(responseData);
      })
      .catch((err) => {
        toast.dismiss();
        // setErrorMessage(err?.response?.data?.error);
        // setModalIsOpenError(true);
      });
  }, [reload]);
  return (
    <>
      {updatedData && (
        <SmartTable title="" data={updatedData} headCells={headCells} />
      )}
    </>
  );
}
