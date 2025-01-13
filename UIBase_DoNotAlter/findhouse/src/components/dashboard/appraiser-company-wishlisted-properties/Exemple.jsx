import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { FaArchive } from "react-icons/fa";
import { AppraiserStatusOptions } from "../create-listing/data";
import millify from "millify";

const headCells = [
  {
    id: "order_id",
    numeric: false,
    label: "Property ID",
    width: 110,
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
    label: "Appraisal Remark",
    width: 160,
  },
  {
    id: "urgency",
    numeric: false,
    label: "Request Type",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Quote Submitted Date",
    width: 200,
  },
  {
    id: "quote_required_by",
    numeric: false,
    label: "Appraisal Report Required By",
    width: 200,
  },
  {
    id: "type_of_building",
    numeric: false,
    label: "Type of Property",
    width: 200,
  },
  {
    id: "estimated_value",
    numeric: false,
    label: "Estimated Value / Purchase Price($)",
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
  setUpdatedCode,
  properties,
  setCurrentBid,
  setAllAppraiser,
  setAssignPropertyId,

  setAssignModal,
  setIsStatusModal,
  setProperties,
  setAllBrokers,
  onWishlistHandler,
  participateHandler,
  setFilterQuery,
  setSearchInput,
  openModalBroker,
  setAssignAppraiser,
  setErrorMessage,
  setModalIsOpenError,
  setWishlistedProperties,
  onArchivePropertyHandler,
  searchInput,
  filterQuery,
  setRefresh,
  setStartLoading,
  refresh,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [bids, setBids] = useState([]);
  const [hideAction, setHideAction] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [show, setShow] = useState(false);

  const [dataFetched, setDataFetched] = useState(false);
  const [assignedProperties, setAssignedProperties] = useState([]);
  let tempData = [];

  const [allArchive, setAllArchive] = useState([]);

  useEffect(() => {
    if (searchInput === "") {
      setRefresh(true);
    }
  }, [searchInput]);

  const getOrderValue = (val) => {
    let title = "Applicant Contacted by appraiser";
    AppraiserStatusOptions.map((status) => {
      if (String(status.id) === String(val)) {
        title = status.type;
      }
    });
    return title;
  };

  const foundArchiveHandler = (propertyId) => {
    let isArchive = false;
    allArchive.map((prop, index) => {
      if (prop.propertyId === propertyId) {
        isArchive = true;
      }
    });
    return isArchive;
  };

  const getStatusButtonClass = (orderStatus) => {
    if (orderStatus === 4 || orderStatus === 5) {
      return "btn btn-status-na w-100"; // Orange color class
    }
    return "btn btn-status w-100"; // Default color
  };

  const calculateDate = (oldBid, newBid) => {
    if (!oldBid.requestTime) {
      return newBid;
    }

    const oldDate = new Date(oldBid.requestTime);
    const newDate = new Date(newBid.requestTime);

    if (oldDate <= newDate) {
      return newBid;
    }
    return oldBid;
  };

  const getFinalBid = (tempBids) => {
    let finalBid = {};
    tempBids.map((bid, index) => {
      if (!finalBid) {
        finalBid = bid;
      } else {
        if (bid.status === 1) {
          if (finalBid.status === 1) {
            const customBid = calculateDate(finalBid, bid);
            finalBid = customBid;
          } else {
            finalBid = bid;
          }
        } else {
          const customBid = calculateDate(finalBid, bid);
          finalBid = customBid;
        }
      }
    });

    return finalBid;
  };

  const filterBidsWithin24Hours = (property) => {
    const data = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0;
    let bidValue = {};
    let tempBids = [];
    bids.filter((bid) => {
      if (
        bid.orderId === property.orderId &&
        bid.appraiserUserId === data.userId
      ) {
        tempBids.push(bid);
        bidValue = bid;
        tempBid = tempBid + 1;
      } else {
      }
    });
    const customBid = getFinalBid(tempBids);
    return customBid;
  };

  const router = useRouter();

  const openStatusUpdateHandler = (bid) => {
    setCurrentBid(bid);
    setIsStatusModal(true);
  };

  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
        location.reload(true);
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
      // second: "numeric",
      hour12: true, // Set to false for 24-hour format
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const formatDateNew = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      hour12: true, // Set to false for 24-hour format
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

    // For EST date and time

    const formatDateTimeEST = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Toronto", // EST/Canada timezone
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date));
    };
  
    // Only for time
  
    const formatDateToEST = (date) => {
      try {
        // Convert input date string to a Date object
        const utcDate = new Date(`${date}T00:00:00Z`); // Treat input as UTC midnight
        return new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Toronto", // EST/Canada timezone
          dateStyle: "medium",        // Format only the date
        }).format(utcDate);
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
      }
    };
  

  // const formatDate = (dateString) => {
  //   const options = {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //   };

  //   const originalDate = new Date(dateString);

  //   // Adjust for Eastern Standard Time (EST) by subtracting 5 hours
  //   const estDate = new Date(originalDate.getTime() - 5 * 60 * 60 * 1000);

  //   // Format the EST date
  //   const formattedDate = estDate.toLocaleString("en-US", options);

  //   return formattedDate;
  // };

  const formatLargeNumber = (number) => {
    // Convert the number to a string
    const numberString = number.toString();

    // Determine the length of the integer part
    const integerLength = Math.floor(Math.log10(Math.abs(number))) + 1;

    // Choose the appropriate unit based on the length of the integer part
    let unit = "";

    if (integerLength >= 10) {
      unit = "B"; // Billion
    } else if (integerLength >= 7) {
      unit = "M"; // Million
    } else if (integerLength >= 4) {
      unit = "K"; // Thousand
    }

    // Divide the number by the appropriate factor
    const formattedNumber = (number / Math.pow(10, integerLength - 1)).toFixed(
      2
    );

    return `${formattedNumber}${unit}`;
  };

  const checkWishlistedHandler = (data) => {
    let temp = {};
    // console.log(wishlist, data);
    wishlist.map((prop, index) => {
      if (
        String(prop.propertyId) === String(data.propertyId) &&
        String(prop.userId) === String(userData.userId)
      ) {
        temp = prop;
      }
    });
    return temp ? temp : {};
  };

  const checkCanBidAgainHandler = (data) => {
    let temp = true;
    return temp;
  };

  const checkInAssignedProperty = (id) => {
    let isAssigned = false;
    assignedProperties.map((prop, index) => {
      if (String(prop.propertyId) === String(id)) {
        isAssigned = true;
      }
    });
    return isAssigned;
  };

  const openAssignModalHandler = (property) => {
    setAssignPropertyId(property.id);
    setAssignModal(true);
  };

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.order_id - a.order_id);
  };

  const checkData = properties && !updatedData ? true : false;
  useEffect(() => {
    setProperties([]);
  }, [checkData]);

  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const isWishlist = checkWishlistedHandler(property);
        const isBidded = filterBidsWithin24Hours(property);

        console.log(isWishlist);

        const isAssigned = checkInAssignedProperty(property.propertyId);
        const isArchive = foundArchiveHandler(property.propertyId);

        if (!isArchive && !isAssigned && isWishlist.id) {
          if (isBidded.status === 1) {
            console.log(getOrderValue(isBidded.orderstatus));
          }
          const isWait = property.isonhold || property.isOnCancel;
          const updatedRow = {
            order_id: property.orderId,
            address: `${property.city}-${property.province},${property.zipCode}`,
            estimated_value: property.estimatedValue
              ? `$ ${addCommasToNumber(property.estimatedValue)}`
              : "$ 0",
            purpose: property.purpose ? property.purpose : "N.A.",
            appraisal_status:
              isBidded.status === 1 && isBidded.orderstatus === 1 ? (
                // <span className="btn btn-warning  w-100">
                //   {getOrderValue(isBidded.orderstatus)} -
                //   {formatDate(isBidded.statusDate)}
                // </span>
                <div className="hover-text">
                  <div
                    className="tooltip-text"
                    style={{
                      marginTop: "-60px",
                      marginLeft: "-100px",
                    }}
                  >
                    <ul>
                      <li style={{ fontSize: "15px" }}>
                        {getOrderValue(isBidded.orderstatus)} -{" "}
                        {formatDateTimeEST(isBidded.statusdate)}
                      </li>
                    </ul>
                  </div>
                  <button className={getStatusButtonClass(isBidded.orderstatus)}>
                    Status
                    <span className="m-1">
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              ) : isBidded.status === 1 && isBidded.orderstatus !== null ? (
                // <span className="btn btn-warning  w-100">
                //   {getOrderValue(isBidded.orderstatus)}
                // </span>
                <div className="hover-text">
                  <div
                    className="tooltip-text"
                    style={{
                      marginTop: "-60px",
                      marginLeft: "-100px",
                    }}
                  >
                    <ul>
                      <li style={{ fontSize: "15px" }}>
                        {getOrderValue(isBidded.orderstatus)}
                      </li>
                    </ul>
                  </div>
                  <button className={getStatusButtonClass(isBidded.orderstatus)}>
                    Status
                    <span className="m-1">
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              ) : (
                <button className="btn btn-warning w-100"><span>N.A.</span></button>
              ),
            remark: isBidded && isBidded.remark ? isBidded.remark : "N.A.",
            status:
              isBidded?.bidId && isBidded.status === 2 ? (
                <span className="btn btn-danger  w-100">Declined</span>
              ) : isWait ? (
                <span className="btn btn-danger  w-100">
                  {property.isOnCancel
                    ? "Cancelled"
                    : property.isonhold
                    ? "On Hold"
                    : ""}
                </span>
              ) : isBidded.bidId ? (
                isBidded.orderstatus === 3 ? (
                  <span className="btn btn-completed w-100">Completed</span>
                ) : isBidded.status === 0 ? (
                  <span className="btn bg-info text-light  w-100">Quote Provided</span>
                ) : isBidded.status === 1 ? (
                  <span className="btn btn-success  w-100">Accepted</span>
                ) : (
                  ""
                )
              ) : (
                <span className="btn btn-warning  w-100">New</span>
              ),
            broker: (
              <div>
                {isBidded.status === 1 ? (
                  <a href="#">
                    <button
                      className="list-inline-item"
                      style={{
                        border: "0px",
                        color: "#2e008b",
                        textDecoration: "underline",
                        // fontWeight: "bold",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => openModalBroker(property, 2)}
                    >
                      Broker Info
                    </button>
                  </a>
                ) : isBidded.status === 2 ? (
                  <h6 style={{ color: "red" }}> Declined</h6>
                ) : (
                  <p>Information will be available post quote acceptance.</p>
                )}
              </div>
            ),
            property: (
              <div>
                {isBidded.status === 1 ? (
                  <a href="#">
                    <button
                      className="list-inline-item"
                      style={{
                        border: "0px",
                        color: "#2e008b",
                        textDecoration: "underline",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => openModalBroker(property, 1)}
                    >
                      Property Info
                    </button>
                  </a>
                ) : isBidded.status === 2  ? (
                  <h6 style={{ color: "red" }}> Declined</h6>
                ) : (
                  <p>Information will be available post quote acceptance.</p>
                )}
              </div>
            ),
            type_of_appraisal: property.typeOfAppraisal
              ? property.typeOfAppraisal
              : "NA",
            type_of_building:
              property.typeOfBuilding > 0
                ? "Apartment"
                : property.typeOfBuilding,
            quote_required_by: formatDateToEST(property.quoteRequiredDate),
            date: formatDateTimeEST(property.addedDatetime),
            bidAmount: millify(property.bidLowerRange),
            lender_information: property.lenderInformation
              ? property.lenderInformation
              : "NA",
            lender_information_btn: "N.A.",
            urgency:
              property.urgency === 0
                ? "Rush"
                : property.urgency === 1
                ? "Regular"
                : "",

            action: (
              <div className="print-hidden-column d-flex gap-1">
                {
                  <ul className="mb0 d-flex gap-1">
                    <li>
                      <button
                        className="btn"
                        style={{
                          border: "1px solid grey",
                        }}
                        onClick={() => removeWishlistHandler(isWishlist.id)}
                      >
                        <img
                          width={26}
                          height={26}
                          src="https://png.pngtree.com/png-clipart/20200226/original/pngtree-3d-red-heart-cute-valentine-romantic-glossy-shine-heart-shape-png-image_5315044.jpg"
                        />
                      </button>
                    </li>

                    {(!isBidded.$id || isBidded?.status < 1) && (
                      <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`${
                          isBidded.$id ? "View/Update Quote" : "Provide Quote"
                        }`}
                      >
                        <div
                          className="w-100"
                          onClick={() =>
                            participateHandler(
                              property.bidLowerRange,
                              property.orderId,
                              isBidded.status < 1,
                              isBidded.bidAmount,
                              isBidded.$id ? true : false
                            )
                          }
                        >
                          <button
                            href="#"
                            className="btn btn-color"
                            // style={{ marginLeft: "12px" }}
                          >
                            <Link href="#">
                              <span className="flaticon-invoice text-light"></span>
                            </Link>
                          </button>
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
                        className="list-inline-item"
                        onClick={() =>
                          onArchivePropertyHandler(property.orderId)
                        }
                      >
                        <button
                          href="#"
                          className="btn btn-color w-20"
                          // style={{ marginLeft: "12px" }}
                        >
                          <Link href="#">
                            <span className="text-light">
                              {" "}
                              <FaArchive />
                            </span>
                          </Link>
                        </button>
                      </div>
                    </li>
                  </ul>
                }
                {isBidded.status === 2 ? (
                  <>
                    <ul>
                      <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-placement="top"
                      >
                        <span className="btn btn-danger  w-100">Declined </span>
                      </li>
                      <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Archive Property"
                      >
                        <div
                          className="w-100"
                          onClick={() =>
                            onArchivePropertyHandler(property.orderId)
                          }
                        >
                          <button href="#" className="btn btn-color">
                            <Link href="#">
                              <span className="text-light">
                                {" "}
                                <FaArchive />
                              </span>
                            </Link>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </>
                ) : isWait && property.status !== 2 ? (
                  <>
                    {/* <p className="btn btn-danger  w-100">
                      {`No further actions can be taken on this property since it is ${
                        property.isOnCancel ? "Cancelled" : "On Hold"
                      } .`}
                    </p> */}
                    {/* <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Archive Property"
                    >
                      <div
                        className="w-100"
                        onClick={() =>
                          onArchivePropertyHandler(property.orderId)
                        }
                      >
                        <button href="#" className="btn btn-color">
                          <Link href="#">
                            <span className="text-light">
                              {" "}
                              <FaArchive />
                            </span>
                          </Link>
                        </button>
                      </div>
                    </li> */}
                  </>
                ) : isBidded.orderstatus <= 6 &&
                  isBidded.orderstatus !== 3 &&
                  isBidded.status === 1 ? (
                  <>
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Archive Property"
                    >
                      <div
                        className="w-100"
                        onClick={() =>
                          onArchivePropertyHandler(property.orderId)
                        }
                      >
                        <button href="#" className="btn btn-color">
                          <Link href="#">
                            <span className="text-light">
                              {" "}
                              <FaArchive />
                            </span>
                          </Link>
                        </button>
                      </div>
                    </li>
                    <button
                      href="#"
                      className="list-inline-item btn btn-color w-20"
                      // style={{ marginLeft: "12px" }}
                      onClick={() => openStatusUpdateHandler(isBidded)}
                    >
                      <Link href="#">
                        <span className="flaticon-edit text-light"></span>
                      </Link>
                    </button>
                  </>
                ) : (
                  isBidded.status === 1 &&
                  isBidded.orderstatus === 3 && (
                    <ul>
                      {/* <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-placement="top"
                      >
                        <span className="btn btn-completed w-100">Completed </span>
                      </li> */}
                    </ul>
                  )
                )}
              </div>
            ),
          };
          tempData.push(updatedRow);
        }
      });
      setWishlistedProperties(tempData);
      setUpdatedData(tempData);
    };
    getData();
  }, [properties]);

  useEffect(() => {
    setUpdatedCode(true);
  }, [updatedData]);

  const refreshHandler = () => {
    setRefresh(true);
    setStartLoading(true);
  };
  useEffect(() => {
    setProperties([]);
    setBids([]);
    setWishlist([]);
    setFilterQuery("All");
    setSearchInput("");
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
    };
    let tempProperties = [],
      tempWishlist = [];

    const startDate = new Date();
    axios
      .get("/api/getAllListedProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: data?.userId,
        },
      })
      .then((res) => {
        setDataFetched(true);
        const temp = res.data.data.properties.$values;

        let tempBids = [];
        axios
          .get("/api/getAllBids", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
            params: {
              email: data.userEmail,
            },
          })
          .then((res) => {
            tempBids = res.data.data.$values;
            const updatedBids = tempBids.filter((prop, index) => {
              if (String(prop.appraiserUserId) === String(data.userId)) {
                return true;
              } else {
                return false;
              }
            });
            console.log(updatedBids);
            setBids(updatedBids);
            axios
              .get("/api/appraiserWishlistedProperties", {
                headers: {
                  Authorization: `Bearer ${data?.token}`,
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                const endDate = new Date();
                console.log("wishlisted", endDate - startDate);
                const tempData = res.data.data.$values;

                // setAllWishlistedProperties(res.data.data.$values);
                const responseData = tempData.filter((prop, index) => {
                  if (String(prop.userId) === String(data.userId)) {
                    return true;
                  } else {
                    return false;
                  }
                });
                const tempId = responseData;
                setWishlist(responseData);
                setProperties(temp);
              })
              .catch((err) => {
                toast.error(err?.response);
                setErrorMessage(err?.response);
                setModalIsOpenError(true);
              });
          })
          .catch((err) => {
            setErrorMessage(err?.response?.data?.error);
            setModalIsOpenError(true);
          });
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    // axios
    //   .get("/api/getAllAppraiserByCompanyId", {
    //     headers: {
    //       Authorization: `Bearer ${data.token}`,
    //     },
    //     params: {
    //       userId: data.appraiserCompany_Datails?.appraiserCompanyId,
    //     },
    //   })
    //   .then((res) => {
    //     // const endDate = new Date();
    //     // console.log("all appraiser by company",res.data.data);
    //     setAssignAppraiser(res.data.data.$values);
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err?.response?.data?.error);
    //     setModalIsOpenError(true);
    //   });

    axios
      .get("/api/getAllBrokers", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        let allbroker = res.data.data.$values;
        axios
          .get("/api/getAllBrokerageCompany", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((res) => {
            const allbrokerage = res.data.data.result.$values;
            let updated = allbroker;
            allbrokerage.map((user, index) => {
              updated.push(user);
            });

            setAllBrokers(updated);
          })
          .catch((err) => {
            setErrorMessage(err?.response?.data?.error);
            setModalIsOpenError(true);
          });
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    axios
      .get("/api/getAllAssignProperties", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        params: {
          userId: data.appraiserCompany_Datails?.appraiserCompanyId,
        },
      })
      .then((res) => {
        // const endDate = new Date();
        // console.log("assign prop",res.data.data);
        setAssignedProperties(res.data.data.$values);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    // axios
    //   .get("/api/getAllAppraiserByCompanyId", {
    //     headers: {
    //       Authorization: `Bearer ${data.token}`,
    //     },
    //     params: {
    //       userId: data.appraiserCompany_Datails?.appraiserCompanyId,
    //     },
    //   })
    //   .then((res) => {
    //     setAssignAppraiser(res.data.data.$values);
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err?.response?.data?.error);
    //     setModalIsOpenError(true);
    //   });

    axios
      .get("/api/getArchiveAppraiserProperty", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        params: {
          userId: data.userId,
        },
      })
      .then((res) => {
        setAllArchive(res.data.data.$values);
      })
      .catch((err) => {
        setDataFetched(false);
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    setRefresh(false);
  }, [refresh]);
  // console.log(sortObjectsByOrderIdDescending(updatedData));
  return (
    <>
      {refresh ? (
        <Loader />
      ) : (
        <SmartTable
          title=""
          setSearchInput={setSearchInput}
          setFilterQuery={setFilterQuery}
          data={sortObjectsByOrderIdDescending(updatedData)}
          headCells={headCells}
          setRefresh={setRefresh}
          setProperties={setProperties}
          refresh={refresh}
          refreshHandler={refreshHandler}
          setStartLoading={setStartLoading}
          start={start}
          searchInput={searchInput}
          filterQuery={filterQuery}
          properties={updatedData}
          dataFetched={dataFetched}
          end={end}
        />
      )}
    </>
  );
}
