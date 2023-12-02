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
    id: "amount",
    numeric: false,
    label: "Qouted Amount",
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

export default function Exemple({
  setModalIsOpenError,
  setUpdatedCode,
  setViewPropertyHandler,
  setErrorMessage,
}) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [properties, setProperties] = useState([]);

  const [updatedData, setUpdatedData] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [show, setShow] = useState(false);
  let tempData = [];

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);

    return formattedDate;
  };

  const filterBidsWithin24Hours = (property) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0;
    let prop = {};
    allProperties.filter((bid) => {
      if (bid.propertyId === property.propertyId) {
        prop = bid;
      } else {
      }
    });
    console.log(prop);
    return prop;
    // const currentTime = new Date();
    // const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // Subtracting milliseconds for 24 hours
    //    const requestTime = new Date(tempBid.requestTime);
    //   return requestTime >= twentyFourHoursAgo && requestTime <= currentTime;
  };

  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const currentProperty = filterBidsWithin24Hours(property);
        console.log(currentProperty);
        const updatedRow = {
          orderId: currentProperty.orderId,
          date: formatDate(property.requestTime),
          amount: property.bidLowerRange,
          prop_amount: property.bidAmount,
          status:
            property.status === 0 ? (
              <span className="btn bg-warning text-light" style={{cursor:"auto"}}>Pending</span>
            ) : property.status === 1 ? (
              <div className="print-hidden-column">
                <ul className="">
                  <li
                    className="list-inline-item"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Property Details"
                  >
                    <button className="btn btn-color-table"
                      onClick={() => setViewPropertyHandler(currentProperty)}
                    >
                      <span className="text-light flaticon-view"></span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <span className="btn bg-danger text-light" style={{cursor:"auto"}}>Declined</span>
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
    };

    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get("/api/getAllListedProperties", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let userWishlistProp = [];
        const tempData = res.data.data.properties.$values;

        const selectedData = properties.filter((prop, index) => {
          return tempData.filter((prop2, index) => {
            if (prop.propertyId === prop2.propertyId) {
              userWishlistProp.push(prop2);
              return true;
            } else return false;
          });
        });
        setAllProperties(userWishlistProp);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response);
      });

    axios
      .get("/api/getAllBids", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setProperties(res.data.data.result.$values);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
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
