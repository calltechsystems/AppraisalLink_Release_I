import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import { FaArchive } from "react-icons/fa";
// import Loader from "./Loader";
// import "./SmartTable.css";

const headCells = [
  {
    id: "order_id",
    numeric: false,
    label: "Order ID",
    width: 100,
  },
  {
    id: "address",
    numeric: false,
    label: "Property Address",
    width: 280,
  },
  {
    id: "status",
    numeric: false,
    label: "Order Status",
    width: 170,
  },
  {
    id: "appraisal_status",
    numeric: false,
    label: "Appraisal Status",
    width: 170,
  },
  {
    id: "remark",
    numeric: false,
    label: "Remark",
    width: 170,
  },
  {
    id: "sub_date",
    numeric: false,
    label: "Quote Submitted Date",
    width: 220,
  },
  {
    id: "urgency",
    numeric: false,
    label: "Request Type",
    width: 140,
  },
  {
    id: "quote_required_by",
    numeric: false,
    label: "Appraisal Report Required By",
    width: 220,
  },
  // {
  //   id: "user",
  //   numeric: false,
  //   label: "Appraiser",
  //   width: 200,
  // },
  // {
  //   id: "amount",
  //   numeric: false,
  //   label: "Quote Amount",
  //   width: 200,
  // },

  {
    id: "type_of_building",
    numeric: false,
    label: "Property Type",
    width: 140,
  },
  {
    id: "amount",
    numeric: false,
    label: "Estimated Value / Purchase Price",
    width: 150,
  },
  {
    id: "purpose",
    numeric: false,
    label: "Purpose",
    width: 130,
  },
  {
    id: "type_of_appraisal",
    numeric: false,
    label: "Type Of Appraisal",
    width: 160,
  },
  {
    id: "lender_information",
    numeric: false,
    label: "Lender Information",
    width: 160,
  },

  // {
  //   id: "actions",
  //   numeric: false,
  //   label: "Actions",
  //   width: 170,
  // },
  {
    id: "actions_01",
    numeric: false,
    label: "Actions",
    width: 170,
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
  setIsStatusModal,
  setProperties,
  deletePropertyHandler,
  onWishlistHandler,
  participateHandler,
  setFilterQuery,
  setSearchInput,
  openModalBroker,
  setErrorMessage,
  setModalIsOpenError,
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

  const filterBidsWithin24Hours = (property) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0,
      bidValue = {};
    console.log(bids);
    bids.filter((bid) => {
      if (bid.propertyId === property.propertyId) {
        console.log("matched", bid);
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
  const formatDateQuote = (dateString) => {
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

  const openStatusUpdateHandler = () => {
    setIsStatusModal(true);
  };

  const onUnarchiveHandler = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));
    const payload = {
      token: data.token,
      propertyId: id,
    };

    toast.loading("un-archiving the property!!...");
    const encryptedBody = encryptionData(payload);
    axios
      .put("/api/unarchiveBrokerProperty", encryptedBody)
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully unarchived the property!");
        window.location.reload();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Try again!");
      });
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
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
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

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.orderId - a.orderId);
  };

  const checkData = properties && !updatedData ? true : false;

  useEffect(() => {
    console.log(properties);
    const getData = () => {
      properties.map((property, index) => {
        const isWishlist = checkWishlistedHandler(property);
        const isBidded = filterBidsWithin24Hours(property);

        // console.log(property.isArchive);
        if (property.isArchive) {
          const updatedRow = {
            order_id: property.orderId,
            address: `${property.streetNumber} ${property.streetName}, ${property.city}, ${property.province}, ${property.zipCode}`,
            estimatedValue: property.estimatedValue
              ? `$ ${property.estimatedValue}`
              : "$ 0",
            sub_date: formatDate(property.addedDatetime),
            type_of_building: property.typeOfBuilding,
            remark: property.remark ? property.remark : "N.A.",
            amount: property.estimatedValue
              ? `$ ${formatLargeNumber(property.estimatedValue)}`
              : "$ 0",
            quote_required_by: property.quoteRequiredDate
              ? formatDateQuote(property.quoteRequiredDate)
              : formatDate(property.addedDatetime),
            purpose: property.purpose ? property.purpose : "NA",
            status: isBidded.bidId ? (
              isBidded.status === 0 ? (
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
                      Property Info
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
                : "NA",

            actions_01: (
              <div className="print-hidden-column">
                <ul>
                  <li
                    className="list-inline-item"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="un-archive Property"
                  >
                    <div
                      className="w-100"
                      onClick={() => onUnarchiveHandler(property.propertyId)}
                    >
                      <button href="#" className="btn btn-color">
                        <span className="text-light">
                          <FaArchive />
                        </span>
                      </button>
                    </div>
                  </li>
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
  }, [properties]);

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
        console.log(res.data.data.properties.$values);
        const temp = res.data.data.properties.$values;

        tempProperties = temp.filter((prop, index) => {
          if (
            String(prop.userId) === String(data.userId) &&
            String(prop.isArchive)
          ) {
            return true;
          } else {
            return false;
          }
        });
        setProperties(tempProperties);
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
        console.log(res);
        tempBids = res.data.data.result.$values;
        const updatedBids = tempBids.filter((prop, index) => {
          if (String(prop.appraiserUserId) === String(data.userId)) {
            return true;
          } else {
            return false;
          }
        });
        setBids(updatedBids);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });

    console.log("end", bids, properties, wishlist);
    setRefresh(false);
  }, [refresh]);
  console.log(sortObjectsByOrderIdDescending(updatedData));
  return (
    <>
      <SmartTable
        title=""
        setSearchInput={setSearchInput}
        setFilterQuery={setFilterQuery}
        data={sortObjectsByOrderIdDescending(updatedData)}
        headCells={headCells}
        setRefresh={setRefresh}
        refresh={refresh}
        refreshHandler={refreshHandler}
        setStartLoading={setStartLoading}
        start={start}
        end={end}
      />
    </>
  );
}
