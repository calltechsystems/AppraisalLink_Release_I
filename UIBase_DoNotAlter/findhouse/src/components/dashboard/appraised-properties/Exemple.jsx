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
  properties,
  setProperties,
  deletePropertyHandler,
  onWishlistHandler,
  participateHandler,
  setErrorMessage,
  setModalIsOpenError,
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
    let tempBid = {};
    bids.filter((bid) => {
      if (
        bid.appraiserUserId === userData.userId &&
        bid.propertyId === property.propertyId
      ) {
        tempBid = bid;
      } else {
        return false;
      }
    });
    const currentTime = new Date();
    const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // Subtracting milliseconds for 24 hours
    const requestTime = new Date(tempBid.requestTime);
    return requestTime >= twentyFourHoursAgo && requestTime <= currentTime;
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
          title: property.typeOfBuilding,
          date: formatDate(property.addedDatetime),
          urgency:
            property.urgency === 0
              ? "low"
              : property.urgency === 1
              ? "medium"
              : "high",
          bid: 0,

          action: (
            <div className="print-hidden-column">
              <ul className="">
                {isWishlist ? (
                  <img
                    className=""
                    style={{marginRight:"5px"}}
                    width={30}
                    height={30}
                    src="https://th.bing.com/th/id/OIP.h0_o3aftEQhOt3HLVaKSvQHaHT?w=219&h=216&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                  />
                ) : (
                  <li
                    className="list-inline-item"
                    style={{
                      width: "30px",
                      textAlign: "center",
                      borderRadius: "5px",
                    }}
                  >
                    {/* <Link href="/agent-v1">{item.posterName}</Link> */}
                    {
                      <button
                        onClick={() => onWishlistHandler(property.propertyId)}
                      >
                        <span className="flaticon-heart text-color"></span>
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
                      className="fw-bold"
                      onClick={() =>
                        participateHandler(
                          property.bidLowerRange,
                          property.propertyId
                        )
                      }
                    >
                      <a href="#" className="text-color">
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
    };

    toast.loading("Getting properties...");
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
        toast.success("Successfully fetched");
        console.log("wishlist", responseData);
        setWishlist(responseData);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response);
        setErrorMessage(err?.response);
        setModalIsOpenError(true);
      });
    axios
      .get("/api/getAllBids", {
        headers: {
          Authorization: ` Bearer ${data.token}`,
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
  }, []);
  return (
    <>
      {updatedData && (
        <SmartTable title="" data={updatedData} headCells={headCells} />
      )}
    </>
  );
}
