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
  setErrorMessage,
  setModalIsOpenError,
  onArchivePropertyHandler,
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
  let tempData = [];

  const [allArchive, setAllArchive] = useState([]);

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

  const filterBidsWithin24Hours = (property) => {
    let tempBid = 0,
      bidValue = {};
    let isAccepted = {};
    // console.log(bids);
    bids.filter((bid) => {
      if (bid.orderId === property.orderId) {
        if (bid.status === 1) {
          isAccepted = bid;
        } else {
          bidValue = bid;
        }
        tempBid = tempBid + 1;
      } else {
      }
    });
    return isAccepted.$id ? isAccepted : bidValue;
  };

  const router = useRouter();

  const openStatusUpdateHandler = (bid) => {
    setCurrentBid(bid);
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
        location.reload(true);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

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
    console.log(formatLargeNumber + ".." + unit);
    return `${formattedNumber}${unit}`;
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

    const originalDate = new Date(dateString);

    // Adjust for Eastern Standard Time (EST) by subtracting 5 hours
    const estDate = new Date(originalDate.getTime() - 5 * 60 * 60 * 1000);

    // Format the EST date
    const formattedDate = estDate.toLocaleString("en-US", options);
    return formattedDate;
  };

  const checkWishlistedHandler = (data) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    let temp = {};
    // console.log(wishlist, data);
    wishlist.map((prop, index) => {
      if (
        String(prop.propertyId) === String(data.propertyId) &&
        String(prop.userId) === String(userInfo.userId)
      ) {
        // console.log("wishlist",data,prop)
        temp = prop;
      }
    });
    return temp ? temp : {};
  };

  const checkCanBidAgainHandler = (data) => {
    let temp = true;
    return temp;
  };

  const openAssignModalHandler = (property) => {
    setAssignPropertyId(property.$id);
    setAssignModal(true);
  };

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.orderId - a.orderId);
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

        // console.log("wishlisted",isWishlist);
        const isWait = property.isOnHold || property.isOnCancel;
        const isArchive = false;

        if (!isArchive) {
          if (isBidded.status === 1) {
            console.log(getOrderValue(isBidded.orderStatus));
          }
          const updatedRow = {
            orderId: property.orderId,
            address: `${property.city}-${property.province},${property.zipCode}`,
            estimatedValue: property.estimatedValue
              ? `$ ${formatLargeNumber(property.estimatedValue)}`
              : "$ 0",
            purpose: property.purpose ? property.purpose : "N.A.",
            appraisal_status:
              isBidded.status === 1 && isBidded.orderStatus === 1 ? (
                <span className="btn btn-warning  w-100">
                  {getOrderValue(isBidded.orderStatus)} -
                  {formatDate(isBidded.statusDate)}
                </span>
              ) : isBidded.status === 1 && isBidded.orderStatus !== null ? (
                <span className="btn btn-warning  w-100">
                  {getOrderValue(isBidded.orderStatus)}
                </span>
              ) : (
                <span className="btn btn-warning  w-100">N.A.</span>
              ),
            remark:
              isBidded && isBidded.remark
                ? isBidded.orderStatus === 1
                  ? `${isBidded.remark} on ${formatDate(isBidded.modifiedDate)}`
                  : isBidded.remark
                : "N.A.",
            status: isWait ? (
              <span className="btn btn-danger  w-100">
                {property.isOnCancel
                  ? "Cancelled"
                  : property.isOnHold
                  ? "On Hold"
                  : ""}
              </span>
            ) : isBidded.bidId ? (
              isBidded.orderStatus === 3 ? (
                <span className="btn btn-success  w-100">Completed</span>
              ) : isBidded.status === 0 ? (
                <span className="btn btn-primary  w-100">Quote Provided</span>
              ) : isBidded.status === 1 ? (
                <span className="btn btn-success  w-100">Accepted</span>
              ) : (
                <span className="btn btn-danger  w-100">Rejected</span>
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
                  <p>
                    Broker Information will be available post the quote
                    acceptance
                  </p>
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
                        // fontWeight: "bold",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => openModalBroker(property, 1)}
                    >
                      Property Info
                    </button>
                  </a>
                ) : isBidded.status === 2 ? (
                  <h6 style={{ color: "red" }}> Declined</h6>
                ) : (
                  <p>
                    Property Information will be available post the quote
                    acceptance
                  </p>
                )}
              </div>
            ),
            type_of_appraisal: property.typeOfAppraisal
              ? property.typeOfAppraisal
              : "N.A.",
            typeOfBuilding:
              property.typeOfBuilding > 0
                ? "Apartment"
                : property.typeOfBuilding,
            quote_required_by: formatDate(property.addedDatetime),
            date: formatDate(property.addedDatetime),
            bidAmount: millify(property.bidLowerRange),
            lender_information: property.lenderInformation
              ? property.lenderInformation
              : "N.A.",
            urgency:
              property.urgency === 0
                ? "Rush"
                : property.urgency === 1
                ? "Regular"
                : "N.A.",

            action: (
              <div className="print-hidden-column">
                {isBidded.status === 2 ? (
                  <>
                    <p className="btn btn-danger  w-100">Rejected </p>
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
                  </>
                ) : isWait ? (
                  <ul>
                    <p className="btn btn-danger  w-100">
                      {`No further actions can be taken on this property since it is ${
                        property.isOnCancel ? "Cancelled" : "On Hold"
                      } .`}
                    </p>
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
                ) : isBidded && isBidded.status !== 1 ? (
                  <ul className="mb0 d-flex gap-1">
                    {isWishlist.id ? (
                      <button
                        className="btn "
                        style={{ border: "1px solid grey" }}
                        onClick={() => removeWishlistHandler(isWishlist.id)}
                      >
                        <img
                          width={26}
                          height={26}
                          src="https://png.pngtree.com/png-clipart/20200226/original/pngtree-3d-red-heart-cute-valentine-romantic-glossy-shine-heart-shape-png-image_5315044.jpg"
                        />
                      </button>
                    ) : (
                      <li
                        className="list-inline-item"
                        title="Wishlist Property"
                      >
                        {
                          <button
                            className="btn"
                            style={{ border: "1px solid grey" }}
                            onClick={() =>
                              onWishlistHandler(property.propertyId)
                            }
                          >
                            <span className="flaticon-heart text-color"></span>
                          </button>
                        }
                      </li>
                    )}

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
                          <button href="#" className="btn btn-color">
                            <Link href="#">
                              <span className="flaticon-invoice text-light"></span>
                            </Link>
                          </button>
                        </div>
                      </li>
                    )}
                    {/* <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Assign Appraiser"
                >
                  <div
                    className="w-100"
                    onClick={() =>
                      openAssignModalHandler(property)
                    }
                  >
                    <button
                      href="#"
                      className="btn btn-color"
                      
                    >
                    <Link href="#">
                    <span className="text-light flaticon-edit"></span>
                  </Link>
                    </button>
                  </div>
                  </li>*/}

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
                ) : (
                  isBidded.orderStatus <= 6 && (
                    <>
                      <button
                        href="#"
                        className="btn btn-color"
                        onClick={() => openStatusUpdateHandler(isBidded)}
                      >
                        <Link href="#">
                          <span className="flaticon-edit text-light"></span>
                        </Link>
                      </button>
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
                    </>
                  )
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

    if (data?.userType === 5) {
      axios
        .get("/api/getAllAssignProperties", {
          headers: {
            Authorization: `Bearer ${data?.token}`,
            "Content-Type": "application/json",
          },
          params: {
            userId: data.appraiser_Details?.companyId,
          },
        })
        .then((res) => {
          toast.dismiss();

          console.log(res.data);
          const prop = res.data.data.properties.$values;

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
                  setProperties(prop);
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
          // setRerender(false);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error(err);
          // setErrorMessage(err?.response?.data?.error);
          // setModalIsOpenError(true);
        });
    } else {
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
          toast.dismiss();

          console.log(res.data);
          const prop = res.data.data.properties.$values;

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
                  setProperties(prop);
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
          // setRerender(false);
        })
        .catch((err) => {
          toast.dismiss();
          toast.error(err);
          // setErrorMessage(err?.response?.data?.error);
          // setModalIsOpenError(true);
        });
    }

    let tempBids = [];

    // axios
    // .get("/api/getAllAssignProperties", {
    //   headers: {
    //     Authorization: `Bearer ${data?.token}`,
    //     "Content-Type": "application/json",
    //   },
    //   params:{
    //     userId : data.appraiser_Details?.companyId
    //   }
    // })
    // .then((res) => {

    //   // console.log(res.data.data.$values);
    //   // tempProperties = res.data.data.$values;
    //   const temp = res.data.data.$values;

    // //   tempProperties = temp.filter((prop,index)=>{
    // //     if(String(prop.userId) === String(data.userId)){
    // //       return true
    // //     }
    // //     else{
    // //       return false
    // //     }
    // //   })

    //   setProperties(temp);
    // console.log("props",temp)
    // })
    // .catch((err) => {
    //   setErrorMessage(err?.response?.data?.error);
    //   setModalIsOpenError(true);
    // });

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
      .get("/api/getAllAppraiser", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        setAllAppraiser(res.data.data.result.$values);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    // axios
    // .get("/api/getArchive?   m ppraiserProperty", {
    //   headers: {
    //     Authorization: `Bearer ${data.token}`,
    //   },
    //   params:{
    //   userId : data.userId
    //   }
    // })
    // .then((res) => {

    //   setAllArchive(res.data.data.$values);

    // })
    // .catch((err) => {
    //   setErrorMessage(err?.response?.data?.error);
    //   setModalIsOpenError(true);
    // });

    console.log("end", bids, properties, wishlist);
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
          end={end}
        />
      )}
    </>
  );
}
