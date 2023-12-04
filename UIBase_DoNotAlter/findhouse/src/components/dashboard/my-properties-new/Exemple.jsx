import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";

const headCells = [
  {
    id: "order_id",
    numeric: false,
    label: "Order ID",
    width: 200,
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
    id: "sub_date",
    numeric: false,
    label: "Submission Date",
    width: 200,
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
    width: 200,
  },
  {
    id: "address",
    numeric: false,
    label: "Property Address",
    width: 200,
  },
  // {
  //   id: "amount",
  //   numeric: false,
  //   label: "Quote",
  //   width: 200,
  // },
  {
    id: "actions",
    numeric: false,
    label: "Actions",
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
  userData,
  archievePropertyHandler,
  open,
  setModalIsPopupOpen,
  close,
  properties,
  setProperties,
  setCurrentProperty,
  deletePropertyHandler,
}) {
  const [updatedData, setUpdatedData] = useState([]);
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

  const openPopupModal = (property) => {
    setModalIsPopupOpen(true);
    setCurrentProperty(property);
  };
  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const isEditable = !property.propertyStatus;
        const updatedRow = {
          order_id: property.orderId,
          sub_date: formatDate(property.addedDatetime),
          status: property.propertyStatus ? (
            <span className="btn bg-success text-light">Completed</span>
          ) : (
            <span className="btn bg-primary text-light">In Progress</span>
          ),
          address: `${property.streetNumber}, ${property.streetName}, ${property.city}, ${property.state}, ${property.zipCode}`,
          // user: property.applicantEmailAddress,
          amount: ` $${property.bidLowerRange}`,
          actions: (
            // <ul className="view_edit_delete_list mb0">
            <ul className="mb0">
              <li>
                <Link href={"#"}>
                  <span onClick={() => openPopupModal(property)}>
                    {" "}
                    Property Details{" "}
                  </span>
                </Link>{" "}
                <span
                  className="btn btn-color-table m-1"
                  onClick={() => openPopupModal(property)}
                >
                  <Link href={"#"}>
                    <span className="text-light flaticon-view"></span>
                  </Link>
                </span>
              </li>
              <li>
                <Link href={`/my-property-bids/${property.propertyId}`}>
                  <span> Quotes </span>
                </Link>{" "}
                <Link
                  className="btn btn-color-table"
                  style={{ marginLeft: "4.3rem" }}
                  href={`/my-property-bids/${property.propertyId}`}
                >
                  <span className="flaticon-invoice"></span>
                </Link>
              </li>
              {/* <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Property Details"
              >
                <span
                  className="btn btn-color-table"
                  onClick={() => openPopupModal(property)}
                >
                  <Link href={"#"}>
                    <span className="flaticon-view"></span>
                  </Link>
                </span>
              </li>

              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Bids"
              >
                <Link
                  className="btn btn-color-table"
                  href={`/my-property-bids/${property.propertyId}`}
                >
                  <span className="flaticon-invoice"></span>
                </Link>
              </li> */}

              {isEditable && (
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                >
                  <Link
                    className="btn btn-color-table"
                    href={`/create-listing/${property.propertyId}`}
                  >
                    <span className="flaticon-edit"></span>
                  </Link>
                </li>
              )}

              {/* End li */}

              {isEditable && (
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                >
                  <button
                    style={{ border: "none", backgroundColor: "white" }}
                    onClick={() => open(property)}
                  >
                    <Link href="#">
                      <span className="flaticon-garbage"></span>
                    </Link>
                  </button>
                </li>
              )}

              {/* {!isEditable && (
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Archive Property"
                >
                  <span
                    className="btn btn-color-table"
                    onClick={() => archievePropertyHandler(property.propertyId)}
                  >
                    <Link className="color-light" href={`/archive-property`}>
                      <span className="flaticon-box"></span>
                    </Link>
                  </span>
                </li>
              )} */}
              {!isEditable && (
                <li>
                  <Link href={`/archive-property`}>
                    <span
                      onClick={() =>
                        archievePropertyHandler(property.propertyId)
                      }
                    >
                      {" "}
                      Archive Property{" "}
                    </span>
                  </Link>{" "}
                  <span
                    className="btn btn-color-table m-1"
                    onClick={() => archievePropertyHandler(property.propertyId)}
                  >
                    <Link className="color-light" href={`/archive-property`}>
                      <span className="flaticon-box text-light"></span>
                    </Link>
                  </span>
                </li>
              )}
              {/* End li */}
            </ul>
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
        toast.error(err?.response?.data?.error);
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
