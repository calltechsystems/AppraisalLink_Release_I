import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios, { all } from "axios";
// import "./SmartTable.css";

const headCells = [
  {
    id: "order_id",
    numeric: false,
    label: "Order ID",
    width: 100,
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
    label: "Quote Submitted Date",
    width: 200,
  },
  {
    id: "status",
    numeric: false,
    label: "Order Status",
    width: 170,
  },
  {
    id: "status",
    numeric: false,
    label: "Appraisal Status",
    width: 170,
  },
  {
    id: "address",
    numeric: false,
    label: "Property Address",
    width: 250,
  },
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
  {
    id: "urgency",
    numeric: false,
    label: "Urgency",
    width: 100,
  },
  {
    id: "quote_required_by",
    numeric: false,
    label: "Appraisal Report Required By",
    width: 200,
  },
  {
    id: "actions",
    numeric: false,
    label: "Actions",
    width: 170,
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
  start,
  end,
  open,
  setModalIsPopupOpen,
  close,
  properties,
  refresh,
  setRefresh,
  setProperties,
  setCurrentProperty,
  setFilterQuery,
  setSearchInput,
  deletePropertyHandler,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allBids, setBids] = useState([]);
  const [show, setShow] = useState(false);
  let tempData = [];

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.order_id - a.order_id);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false, // Set to false for 24-hour format
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const refreshHandler = () => {
    setRefresh(true);
  };

  const getPropertyStatusHandler = (property) => {
    let isInProgress = true;
    let isQuoteProvided = false;
    let isCompleted = false;
    allBids.map((bid, index) => {
      if (bid.propertyId === property.propertyId && bid.status === 1) {
        isCompleted = true;
      } else if (bid.propertyId === property.propertyId) {
        isQuoteProvided = true;
      }
    });
    return isCompleted ? 2 : isQuoteProvided ? 1 : 0;
  };

  const openPopupModal = (property) => {
    setModalIsPopupOpen(true);
    setCurrentProperty(property);
  };
  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const isStatus = getPropertyStatusHandler(property);
        console.log(isStatus);
        const isEditable = isStatus === 0 ? true : false;
        if (!property.isArchive) {
          const updatedRow = {
            order_id: property.orderId,
            sub_date: formatDate(property.addedDatetime),
            quote_required_by: property.quoteRequiredDate ? formatDate(property.quoteRequiredDate) :  formatDate(property.addedDatetime),
            status:
              isStatus === 2 ? (
                <span className="btn bg-success w-100 text-light">
                  Accepted
                </span>
              ) : isStatus === 0 ? (
                <span className="btn bg-primary w-100 text-light">
                  In Progress
                </span>
              ) : isStatus === 1 ? (
                <span className="btn bg-info w-100 text-light">
                  Quote Provided
                </span>
              ) : (
                <span className="btn bg-info w-100 text-light">Cancelled</span>
              ),
            address: `${property.streetNumber}, ${property.streetName}, ${property.city}, ${property.province}, ${property.zipCode}`,
            // user: property.applicantEmailAddress,
            type_of_building: property.typeOfBuilding,
            amount: ` $${property.estimatedValue}`,
            purpose: property.purpose,
            type_of_appraisal: property.typeOfAppraisal,
            lender_information: property.lenderInformation
              ? property.lenderInformation
              : "NA",
            urgency: property.urgency === 0 ? "Rush" : "Regular",
            actions: (
              // <ul className="view_edit_delete_list mb0">
              <ul className="mb0">
                {!isEditable && (
                  <li>
                    <Link href={"#"}>
                      <span
                        className="btn btn-color w-100 mb-1"
                        onClick={() => openPopupModal(property)}
                      >
                        {" "}
                        Property Details{" "}
                      </span>
                    </Link>{" "}
                    {/* <span
                      className="btn btn-color-table m-1"
                      onClick={() => openPopupModal(property)}
                    >
                      <Link href={"#"}>
                        <span className="text-light flaticon-view"></span>
                      </Link>
                    </span> */}
                  </li>
                )}

                {!isEditable && (
                  <li>
                    <Link href={`/my-property-bids/${property.propertyId}`}>
                      <span className="btn btn-color w-100 mb-1"> Quotes </span>
                    </Link>{" "}
                    {/* <Link
                      className="btn btn-color-table"
                      style={{ marginLeft: "4.3rem" }}
                      href={`/my-property-bids/${property.propertyId}`}
                    >
                      <span className="flaticon-invoice"></span>
                    </Link> */}
                  </li>
                )}
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

                {(isEditable || isStatus === 1) && (
                  <li>
                    <Link href={`/create-listing/${property.propertyId}`}>
                      <span className="btn btn-color w-100 mb-1"> Edit </span>
                    </Link>{" "}
                    {/* <Link
                      className="btn btn-color-table"
                      href={`/create-listing/${property.propertyId}`}
                    >
                      <span className="flaticon-edit"></span>
                    </Link> */}
                  </li>
                )}

                {/* End li */}

                {isEditable && (
                  <li>
                    <Link href="#" onClick={() => open(property)}>
                      <span className="btn btn-color w-100 mb-1">
                        {" "}
                        Order Cancel{" "}
                      </span>
                    </Link>{" "}
                    {/* <button
                      className="btn"
                      style={{ border: "1px solid grey" }}
                      onClick={() => open(property)}
                    >
                      <Link href="#">
                        <span className="flaticon-garbage text-danger"></span>
                      </Link>
                    </button> */}
                  </li>
                )}

                {isEditable && (
                  <li>
                    <Link href="#">
                      <span className="btn btn-color w-100 mb-1">
                        {" "}
                        On Hold{" "}
                      </span>
                    </Link>{" "}
                    {/* <Link
                      className="btn btn-color-table"
                      href={`/create-listing/${property.propertyId}`}
                    >
                      <span className="flaticon-edit"></span>
                    </Link> */}
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
                    <Link
                      href="#"
                      onClick={() =>
                        archievePropertyHandler(property.propertyId)
                      }
                    >
                      <span className="btn btn-color w-100">
                        {" "}
                        Archive Property{" "}
                      </span>
                    </Link>
                    {/* <span
                      className="btn btn-color-table m-1"
                      onClick={() =>
                        archievePropertyHandler(property.propertyId)
                      }
                    >
                      <Link className="color-light" href={`/archive-property`}>
                        <span className="flaticon-box text-light"></span>
                      </Link>
                    </span> */}
                  </li>
                )}

                {/* End li */}
              </ul>
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
        toast.error(err?.response?.data?.error);
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
        tempBids = res.data.data.result.$values;
        setBids(tempBids);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });
    setRefresh(false);
  }, [refresh]);
  return (
    <>
      {updatedData && (
        <SmartTable
          title=""
          setFilterQuery={setFilterQuery}
          setSearchInput={setSearchInput}
          data={sortObjectsByOrderIdDescending(updatedData)}
          headCells={headCells}
          refreshHandler={refreshHandler}
          start={start}
          end={end}
        />
      )}
    </>
  );
}
