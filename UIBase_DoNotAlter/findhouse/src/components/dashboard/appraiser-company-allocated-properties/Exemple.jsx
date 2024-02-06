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
    id: "appraiser_info",
    numeric: false,
    label: "Appraiser Name",
    width: 160,
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
  start,
  setAssignedAppraiser,
  end,
  openAppraiserInfoModal,
  setOpenAssignModal,
  setUpdatedCode,
  properties,
  setCurrentBid,
  setIsStatusModal,
  setProperties,
  onWishlistHandler,
  participateHandler,
  setFilterQuery,
  setSearchInput,
  openModalBroker,
  setErrorMessage,
  setModalIsOpenError,
  setRefresh,
  setAllBrokers,
  setStartLoading,

  refresh,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [bids, setBids] = useState([]);
  const [hideAction, setHideAction] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [show, setShow] = useState(false);
  const [Appraiser, setAppraiser] = useState({});
  const [allAssignAppraiser, setAllAssignAppraiser] = useState([]);
  let tempData = [];

  const filterBidsWithin24Hours = (property) => {
    let tempBid = 0,
      bidValue = {};
    let isAccepted = {};
    // console.log(bids);
    bids.filter((bid) => {
      if (bid.orderId === property?.orderId) {
        if (bid.status === 1) {
          isAccepted = bid;
        } else {
          bidValue = bid;
        }
        tempBid = tempBid + 1;
      } else {
      }
    });
    return isAccepted.$id ? isAccepted : bidValue; //   return requestTime >= twentyFourHoursAgo && requestTime <= currentTime;
  };

  const getAppraiser = (id) => {
    let selectedAppraiser = {};
    allAssignAppraiser.map((appraiser, index) => {
      console.log(appraiser, id);
      if (String(appraiser.id) === String(id)) {
        selectedAppraiser = appraiser;
      }
    });

    console.log(selectedAppraiser);
    openAppraiserInfoModal(selectedAppraiser);
  };
  const getAppraiserName = (id) => {
    let selectedAppraiser = {};
    allAssignAppraiser.map((appraiser, index) => {
      console.log(appraiser, id);
      if (String(appraiser.id) === String(id)) {
        selectedAppraiser = appraiser;
      }
    });

    return `${selectedAppraiser.firstName} ${selectedAppraiser.lastName}`;
  };

  const router = useRouter();

  const getOrderValue = (val) => {
    let title = "";
    AppraiserStatusOptions.map((status) => {
      if (String(status.value) === String(val)) {
        title = status.type;
      }
    });
    return title;
  };

  const checkIsOfSameCompany = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data.appraiserCompany_Datails?.appraiserCompanyId === id) {
      return true;
    } else {
      return false;
    }
  };

  const openStatusUpdateHandler = (bidId) => {
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
    let temp = {};
    // console.log(wishlist, data);
    wishlist.map((prop, index) => {
      if (
        String(prop?.propertyId) === String(data?.propertyId) &&
        String(prop?.userId) === String(userData.userId)
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

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.orderId - a.orderId);
  };

  const [isBroker, setIsBroker] = useState(-1);

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

  const checkData = properties && !updatedData ? true : false;
  useEffect(() => {
    setProperties([]);
  }, [checkData]);

  useEffect(() => {
    const getData = () => {
      properties.map((propertyDetail, index) => {
        const property = propertyDetail?.propertyDetails;
        const isWishlist = checkWishlistedHandler(property);
        const isBidded = filterBidsWithin24Hours(property);

        const isWait = property?.isOnHold || property?.isOnCancel;
        const updatedRow = {
          orderId: property?.orderId,
          address: property?.city
            ? `${property?.city}-${property?.province},${property?.zipCode}`
            : "-",
          estimatedValue: property?.estimatedValue
            ? `$ ${formatLargeNumber(property?.estimatedValue)}`
            : "$ 0",
          purpose: property?.purpose ? property?.purpose : "N.A.",
          remark: property?.remark ? <p>remark</p> : "N.A.",
          status: isWait ? (
            <span className="btn btn-danger  w-100">
              {property.isOnCancel
                ? "On Cancel"
                : property.isOnHold
                ? "On Hold"
                : ""}
            </span>
          ) : isBidded.bidId ? (
            isBidded.status === 0 ? (
              <span className="btn btn-primary  w-100">Quote Provided</span>
            ) : isBidded.status === 1 ? (
              <span className="btn btn-success  w-100">Accepted</span>
            ) : (
              <span className="btn btn-danger  w-100">Declined</span>
            )
          ) : (
            <span className="btn btn-warning  w-100">New</span>
          ),
          appraisal_status: isBidded.orderStatus ? (
            <span className="btn btn-warning  w-100">
              {getOrderValue(isBidded.orderStatus)}
            </span>
          ) : (
            <span className="btn btn-warning  w-100">N.A.</span>
          ),
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
                    onClick={() => openModalBroker(property, 2)}
                  >
                    Broker Info
                  </button>
                </a>
              ) : isBidded.status === 2 ? (
                <h6 style={{ color: "red" }}> Declined</h6>
              ) : (
                <p>
                  Broker Information will be available post the quote acceptance
                </p>
              )}
            </div>
          ),
          appraiser_info: (
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
                onClick={() => getAppraiser(propertyDetail?.appraiserid)}
              >
                {getAppraiserName(propertyDetail?.appraiserid)}
              </button>
            </a>
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
          type_of_appraisal: property?.typeOfAppraisal
            ? property?.typeOfAppraisal
            : "N.A.",
          typeOfBuilding: property?.typeOfBuilding
            ? property?.typeOfBuilding
            : "N.A.",
          quote_required_by: formatDate(property?.addedDatetime),
          date: formatDate(property?.addedDatetime),
          bidAmount: property?.bidLowerRange,
          lender_information: property?.lenderInformation
            ? property?.lenderInformation
            : "N.A.",
          urgency:
            property?.urgency === 0
              ? "Rush"
              : property?.urgency === 1
              ? "Regular"
              : "N.A.",

          action: (
            <div className="print-hidden-column">
              {isBidded.orderStatus === 6 ? (
                <span className="btn btn-success  w-100">Completed</span>
              ) : isWait ? (
                <p className="btn btn-danger  w-100">
                  {`Cannot perform any actions right now as property is being ${
                    property.isOnCancel ? "Cancelled" : "On Hold"
                  } !.`}{" "}
                </p>
              ) : isBidded && isBidded.status !== 1 ? (
                <ul className="">
                  {isBidded.$id && isBidded.status < 1 && (
                    <ul>
                      <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Provide Quote"
                      >
                        <div
                          className="w-100"
                          onClick={() =>
                            participateHandler(
                              property?.bidLowerRange,
                              property?.propertyId
                            )
                          }
                        >
                          <button
                            href="#"
                            className="btn btn-color w-0 mt-1"
                            style={{ marginLeft: "12px" }}
                          >
                            <Link href="#">
                              <span className="flaticon-building text-light"></span>
                            </Link>
                          </button>
                        </div>
                      </li>
                    </ul>
                  )}

                  <li
                    className="list-inline-item"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Archive Property"
                  >
                    <div
                      className="w-100"
                      onClick={() =>
                        onDeletePropertyHandler(property?.propertyId)
                      }
                    >
                      <button
                        href="#"
                        className="btn btn-color w-0 mt-1"
                        style={{ marginLeft: "12px" }}
                      >
                        <button
                          href="#"
                          className="btn btn-color  mt-1"
                          style={{ marginLeft: "12px" }}
                        >
                          <Link href="#">
                            <span className="flaticon-home text-light"></span>
                          </Link>
                        </button>
                      </button>
                    </div>
                  </li>
                </ul>
              ) : (
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Order Update"
                >
                  <div
                    className="w-100"
                    onClick={() => openStatusUpdateHandler(isBidded.bidId)}
                  >
                    <button
                      href="#"
                      className="btn btn-color w-0 mt-1"
                      style={{ marginLeft: "12px" }}
                    >
                      <button
                        href="#"
                        className="btn btn-color  mt-1"
                        style={{ marginLeft: "12px" }}
                      >
                        <Link href="#">
                          <span className="flaticon-edit text-light"></span>
                        </Link>
                      </button>
                    </button>
                  </div>
                </li>
              )}
            </div>
          ),
        };
        tempData.push(updatedRow);
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
    // console.log("inside");
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
    };
    let tempProperties = [],
      tempWishlist = [];
    axios
      .get("/api/getAllAssignProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: data.appraiserCompany_Datails?.appraiserCompanyId,
        },
      })
      .then((res) => {
        // console.log(res.data.data.$values);
        tempProperties = res.data.data.$values;
        const temp = res.data.data.$values;

        tempProperties = temp.filter((prop, index) => {
          if (String(prop.userId) === String(data.userId)) {
            return true;
          } else {
            return false;
          }
        });

        setProperties(temp);
        console.log("props", temp);
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
          if (String(prop.userId) === String(data.userId)) {
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
        // console.log(res);
        tempBids = res.data.data.$values;
        const updatedBids = tempBids.filter((prop, index) => {
          if (String(prop.appraiserUserId) === String(data.userId)) {
            return true;
          } else {
            return false;
          }
        });
        console.log("bids", updatedBids);
        setBids(updatedBids);
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

    axios
      .get("/api/getAllAppraiser", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        //   const getAllAppraiser = res.data.data.result.$values;
        setAllAssignAppraiser(res.data.data.result.$values);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    // console.log("end", bids, properties, wishlist);
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
