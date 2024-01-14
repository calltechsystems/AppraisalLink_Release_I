import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { AppraiserStatusOptions } from "../create-listing/data";
// import "./SmartTable.css";

const headCells = [
  {
    id: "orderId",
    numeric: false,
    label: "Order ID",
    width: 100,
  },
  
  {
    id: "address",
    numeric: false,
    label: "Property Address",
    width: 200,
  },
  
  {
    id: "status",
    numeric: false,
    label: "Quote Status",
    width: 160,
  },
  {
    id: "appraisal_status",
    numeric: false,
    label: "Appraisal Status",
    width: 160,
  },
  {
    id: "remark",
    numeric: false,
    label: "Remark",
    width: 160,
  },
  {
    id: "urgency",
    numeric: false,
    label: "Urgency",
    width: 200,
  },
  
  {
    id: "date",
    numeric: false,
    label: "Order Submission Date",
    width: 200,
  },
  {
    id: "quote_required_by",
    numeric: false,
    label: "Appraisal Report Required By",
    width: 200,
  },

  {
    id: "typeOfBuilding",
    numeric: false,
    label: "Type of Property",
    width: 200,
  },
  
  {
    id: "estimatedValue",
    numeric: false,
    label: "Estimated Property Value ($)",
    width: 200,
  },
  {
    id: "type_of_appraisal",
    numeric: false,
    label: "Type Of Appraisal",
    width: 200,
  },


  {
    id: "purpose",
    numeric: false,
    label: "Purpose",
    width: 200,
  },

  {
    id: "lender_information",
    numeric: false,
    label: "Lender Information",
    width: 200,
  },
 
  {
    id: "broker",
    numeric: false,
    label: "Broker",
    width: 200,
  },
  {
    id: "property",
    numeric: false,
    label: "Property",
    width: 200,
  },

  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 180,
  },
];

let count = 0;

export default function Exemple({
  userData,
  open,
  close,
  start,
  end,
  setAllBrokers,
  setCurrentBid,
  setUpdatedCode,
  properties,
  setProperties,
  wishlistedProperties,
  deletePropertyHandler,
  onWishlistHandler,
  setFilterQuery,
  setSearchInput,
  participateHandler,
  openModalBroker,
  setErrorMessage,
  setModalIsOpenError,
  setRefresh,
  setWishlishtedProperties,
  setIsStatusModal,
  setStartLoading,
  refresh,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [bids, setBids] = useState([]);
  const [hideAction, setHideAction] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [show, setShow] = useState(false);
  let tempData = [];


  const getOrderValue = (val)=>{
    let title = "Applicant Contacted by Appraiser";
    AppraiserStatusOptions.map((status)=>{
      if(String(status.id) === String(val)){
        title = status.type;
      }
    })
    console.log(title,val)
    return title;
  }

  
  const filterBidsWithin24Hours = (property) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0,
      bidValue = {};

    // console.log(bids);
    bids.filter((bid) => {
      if (bid.propertyId === property.propertyId && String(bid.appraiserUserId) === String(userData.userId))   {
        // console.log("matched", bid);
        tempBid = tempBid + 1;
        bidValue = bid;
      } else {
      }
    });
    return tempBid > 0 ? bidValue : {};
    // const currentTime = new Date();
    // const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // Subtracting milliseconds for 24 hours
    //    const requestTime = new Date(tempBid.requestTime);
    //   return requestTime >= twentyFourHoursAgo && requestTime <= currentTime;
  };

  const router = useRouter();

  const statusHandler = (bidId) => {
    setCurrentBid(bidId);
    setIsStatusModal(true);
  };

  const removeWishlistHandler = (id) => {
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
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        params: {
          userId: id,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully removed !!! ");
        window.location.reload();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

  const onDeletePropertyHandler = () => {};

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const check = updatedData ? false : true;

  const checkWishlistedHandler = (data) => {
    let temp = {};
    // console.log(wishlist, data);
    wishlist.map((prop, index) => {
      if (String(prop.propertyId) === String(data.propertyId)) {
        temp = prop;
      }
    });
    return temp ? temp : {};
  };

  const checkCanBidAgainHandler = (data) => {
    let temp = true;
    return temp;
  };

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.orderId - a.orderId);
  };

  const checkData = (properties && !updatedData) ? true : false;
  useEffect(()=>{
    setProperties([]);
  },[checkData])

  useEffect(()=>{
    setRefresh(true);
  },[!updatedData]);

  useEffect(() => {
    let page = [];
    const getData = () => {
      properties.map((property, index) => {
        const isWishlist = checkWishlistedHandler(property);
        const isBidded = filterBidsWithin24Hours(property);
        // console.log("isBidded", isBidded);

        if (isWishlist.id) {
          console.log("wishlisted",property,isBidded,isWishlist)
          page.push(property);
          const updatedRow = {
            orderId: property.orderId,
            address: `${property.city}-${property.province},${property.zipCode}`,
            estimatedValue: property.estimatedValue
              ? property.estimatedValue
              : 0,
            purpose: property.purpose ? property.purpose : "NA",
            status: isBidded.bidId ? (
              isBidded.status === 0 ? (
                <span className="btn btn-primary" >
                  Quote Provided
                </span>
              ) : isBidded.status === 1 ? (
                <span className="btn btn-success">Accepted</span>
              ) : (
                <span className="btn btn-danger">Declined</span>
              )
            ) : (
              <span className="btn btn-warning">New</span>
            ),
            appraisal_status: isBidded.status === 1 ? (
              <span className="btn btn-warning  w-100">{getOrderValue(isBidded.orderStatus)}</span>
            ):<span className="btn btn-warning  w-100">New</span>,
            remark : <p>{isBidded.remark ? isBidded.remark : "NA"}</p>,
            broker: (
              <div>
                {isBidded.status === 1 ? (
                  <a href="#">
                    <button
                      className=""
                      style={{
                        border: "0px",
                        color: "#2e008b",
                        textDecoration: "underline",
                        // fontWeight: "bold",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => openModalBroker(property,2)}
                    >
                     Broker Info
                    </button>
                  </a>
                ) : isBidded.status === 2 ? (
                  <h6 style={{ color: "red" }}> Declined</h6>
                ) : (
                  <h6>
                    Broker Information will be available post the quote
                    acceptance
                  </h6>
                )}
              </div>
            ),
            property: (
              <div>
                {isBidded.status === 1 ? (
                  <a href="#">
                    <button
                      className=""
                      style={{
                        border: "0px",
                        color: "#2e008b",
                        textDecoration: "underline",
                        // fontWeight: "bold",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => openModalBroker(property,1)}
                    >
                     Property Info
                    </button>
                  </a>
                ) : isBidded.status === 2 ? (
                  <h6 style={{ color: "red" }}> Declined</h6>
                ) : (
                  <h6>
                    Broker Information will be available post the quote
                    acceptance
                  </h6>
                )}
              </div>
            ),
            type_of_appraisal: property.typeOfAppraisal
              ? property.typeOfAppraisal
              : "NA",
            typeOfBuilding:
              property.typeOfBuilding > 0
                ? "Apartment"
                : property.typeOfBuilding,
            quote_required_by: formatDate(property.addedDatetime),
            date: formatDate(property.addedDatetime),
            bidAmount: property.bidLowerRange,
            lender_information: property.lenderInformation
              ? property.lenderInformation
              : "NA",
            urgency:
              property.urgency === 0
                ? "Rush"
                : property.urgency === 1
                ? "Regular"
                : "High",

            action: (
              <div className="print-hidden-column">
                {isBidded && isBidded.status !== 1 ? (
                  <ul className="">
                    {!isBidded.$id && (
                      <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Provide Quote"
                      >
                        <div
                          className=" fw-bold"
                          onClick={() =>
                            participateHandler(
                              property.bidLowerRange,
                              property.propertyId
                            )
                          }
                        >
                          <a
                            href="#"
                            className="btn btn-color w-15"
                            style={{ marginLeft: "10px" }}
                          >
                          <Link href="#">
                          <span className="flaticon-building text-light"></span>
                        </Link>
                          </a>
                        </div>
                      </li>
                    )}
                    <li
                    className="list-inline-item"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Archive Property"
                  >
                    <div
                      className=" fw-bold"
                      onClick={() =>
                        onDeletePropertyHandler(property.propertyId)
                      }
                    >
                      <a
                        href="#"
                        className="btn btn-color w-15"
                        style={{ marginLeft: "10px" }}
                      >
                      <Link href="#">
                      <span className="flaticon-home text-light"></span>
                    </Link>
                      </a>
                    </div>
                  </li>
                   
                  </ul>
                ) : (
                  <div
                  className=" fw-bold"
                  onClick={() =>
                    statusHandler(()=>setCurrentBid(isBidded.bidId))
                  }
                >
                  <a
                    href="#"
                    className="btn btn-color w-15"
                    style={{ marginLeft: "10px" }}
                  >
                  <Link href="#">
                  <span className="flaticon-edit text-light"></span>
                </Link>
                  </a>
                </div>
                )}
              </div>
            ),
          };

          tempData.push(updatedRow);
        }
      });
      setUpdatedData(tempData);
    };
    getData();
    setWishlishtedProperties(page);
  }, [properties]);

  useEffect(() => {
    setUpdatedCode(true);
  }, [updatedData]);

  const refreshHandler = () => {
    setRefresh(true);
    setStartLoading(true);
  };
  useEffect(() => {
    console.log("inside");
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
    };
    let tempProperties = [],
      tempWishlist = [];
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
        tempProperties = res.data.data.property.$values;
      })
      .catch((err) => {
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
        setWishlist(responseData);
      })
      .catch((err) => {
        toast.error(err?.response);
        setErrorMessage(err?.response);
        setModalIsOpenError(true);
      });
    let tempBids = [];
    axios
      .get("/api/getAllBids", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        tempBids = res.data.data.result.$values;
        setBids(tempBids);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

      axios
      .get("/api/getAllBrokers", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        setAllBrokers(res.data.data.$values);
       
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    console.log("end", bids, properties, wishlist);
    console.log(wishlist,bids);
    setRefresh(false);

  }, [refresh]);
  console.log(updatedData);
  return (
    <>
      {refresh ? (
        <Loader />
      ) : (
        <SmartTable
          title=""
          data={updatedData.length > 0 ? sortObjectsByOrderIdDescending(updatedData) : wishlistedProperties}
          headCells={headCells}
          setRefresh={setRefresh}
          setProperties={setProperties}
          refresh={refresh}
          setFilterQuery={setFilterQuery}
          setSearchInput={setSearchInput}
          refreshHandler={refreshHandler}
          setStartLoading={setStartLoading}
          start={start}
          end={end}
        />
      )}
    </>
  );
}
