import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios, { all } from "axios";
import millify from "millify";
import { AppraiserStatusOptions } from "../create-listing/data";
import {
  FaArchive,
  FaHandHoldingHeart,
  FaHandHoldingUsd,
  FaHandPointer,
  FaPause,
  FaRedo,
} from "react-icons/fa";
// import "./SmartTable.css";

const headCells = [
  {
    id: "order_id",
    numeric: false,
    label: "Order ID",
    width: 100,
  },
  {
    id: "broker",
    numeric: false,
    label: "Broker",
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

export default function Exemple({
  userData,
  archievePropertyHandler,
  start,
  end,
  open,
  setModalIsPopupOpen,
  close,
  properties,
  onHoldHandler,
  onCancelHandler,
  refresh,
  setRefresh,
  setProperties,
  setCurrentProperty,
  setFilterQuery,
  setSearchInput,
  setPropertyId,
  setPropValue,
  setModalOpen,
  setIsCancelProperty,
  setIsHoldProperty,
  isBidded,
  setErrorMessage,
  setModalIsOpenError,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allBids, setBids] = useState([]);
  const [show, setShow] = useState(false);
  let tempData = [];

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.order_id - a.order_id);
  };

  const getOrderValue = (val) => {
    let title = "";
    AppraiserStatusOptions.map((status) => {
      if (String(status.value) === String(val)) {
        title = status.type;
      }
    });
    return title;
  };

  const openModal = (propertyId, value, toggle) => {
    if (String(value) === String(1)) {
      setIsHoldProperty(true);
      setPropertyId(propertyId);
      setPropValue(toggle);
    } else {
      setIsCancelProperty(true);
      setPropertyId(propertyId);
      setPropValue(toggle);
    }
    setModalOpen(true);
  };

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

  const refreshHandler = () => {
    setRefresh(true);
  };

  const getPropertyStatusHandler = (property) => {
    let isInProgress = true;
    let isQuoteProvided = false;
    let isCompleted = false;
    allBids.map((bid, index) => {
      if (bid.orderId === property.orderId && bid.status === 1) {
        isCompleted = true;
      } else if (bid.orderId === property.orderId) {
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
        console.log("property", property);
        const isHold = property.value.isOnHold;
        const isCancel = property.value.isOnCancel;
        const isStatus = getPropertyStatusHandler(property);
        console.log(isStatus);
        const isEditable = isStatus === 0 ? true : false;
        if (!property.value.isArchive) {
          const updatedRow = {
            order_id: property.value.orderId,
            sub_date: formatDate(property.value.value.addedDatetime),
            quote_required_by: property.value.quoteRequiredDate
              ? formatDate(property.value.quoteRequiredDate)
              : formatDate(property.value.addedDatetime),
            status:
              isHold || isCancel ? (
                <span className="btn bg-warning w-100">
                  {isHold ? "On Hold" : "Cancelled"}
                </span>
              ) : isStatus === 2 ? (
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
            appraisal_status:
              isHold || isCancel ? (
                <span className="btn bg-warning  w-100">
                  {isHold ? "On Hold" : "OnCancelled"}
                </span>
              ) : property.orderStatus ? (
                <span className="btn bg-warning  w-100">
                  {getOrderValue(property.orderStatus)}
                </span>
              ) : (
                <span className="btn bg-warning  w-100">N.A.</span>
              ),
            address: `${property.value.streetNumber}, ${property.value.streetName}, ${property.value.city}, ${property.value.province}, ${property.value.zipCode}`,
            remark: property.value.remark ? property.value.remark : "N.A.",
            // user: property.value.applicantEmailAddress,
            type_of_building: property.value.typeOfBuilding,
            amount: ` $ ${millify(property.value.estimatedValue)}`,
            purpose: property.value.purpose,
            type_of_appraisal: property.value.typeOfAppraisal,
            lender_information: property.value.lenderInformation
              ? property.value.lenderInformation
              : "N.A.",
            urgency: property.value.urgency === 0 ? "Rush" : "Regular",
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

                {!isEditable && isStatus === 1 && (
                  <li>
                    <Link
                      href={`/brokerage-properties-bid/${property.orderId}`}
                    >
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
                    <Link href={`/create-listing-1/${property.propertyId}`}>
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
                    <button
                      onClick={() => onHoldHandler(property.propertyId, true)}
                    >
                      <Link href="#">
                        <span className="btn btn-color w-100 mb-1 text-light">
                          {" "}
                          On Hold{" "}
                        </span>
                      </Link>{" "}
                    </button>
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
            actions_01: (
              // <ul className="view_edit_delete_list mb0">
              <ul className="mb0 d-flex gap-1">
                {/* {!isEditable && ( */}
                <li title="Property Details" className="">
                  {/* <Link href={"#"}>
                      <span
                        className="btn btn-color w-100 mb-1"
                        onClick={() => openPopupModal(property)}
                      >
                        {" "}
                        Property Details{" "}
                      </span>
                    </Link>{" "} */}
                  <span
                    className="btn btn-color-table"
                    onClick={() => openPopupModal(property)}
                  >
                    <Link href={"#"}>
                      <span className="text-light flaticon-view"></span>
                    </Link>
                  </span>
                </li>
                {/* )} */}

                {!isEditable && !isCancel && (
                  <li title="Quotes">
                    {/* <Link href={`/my-property-bids/${property.propertyId}`}>
                      <span className="btn btn-color w-100 mb-1"> Quotes </span>
                    </Link>{" "} */}
                    <Link
                      className="btn btn-color-table"
                      // style={{ marginLeft: "4.3rem" }}
                      href={`/brokerage-properties-bid/${property.orderId}`}
                    >
                      <span className="flaticon-invoice">
                        {/* <FaHandHoldingUsd /> */}
                      </span>
                    </Link>
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

                {(isEditable || isStatus === 1) && !isCancel && (
                  <li title="Edit Property">
                    {/* <Link href={`/create-listing/${property.propertyId}`}>
                      <span className="btn btn-color w-100 mb-1"> Edit </span>
                    </Link>{" "} */}
                    <Link
                      className="btn btn-color-table"
                      href={`/create-listing-1/${property.orderId}`}
                    >
                      <span className="flaticon-edit"></span>
                    </Link>
                  </li>
                )}

                {/* End li */}

                {/* {isEditable && ( */}
                {!isCancel && (
                  <li title={!isHold ? "On Hold" : "Remove Hold"}>
                    <span
                      className="btn btn-color-table "
                      style={{ border: "1px solid grey" }}
                      // onClick={() => onHoldHandler(property.propertyId, !isHold)}
                      onClick={() =>
                        openModal(property.orderId, 1, isHold ? 0 : 1)
                      }
                    >
                      <Link href="#" className="text-light">
                        <FaPause />
                      </Link>
                    </span>
                  </li>
                )}
                {/* )} */}

                {/* {isEditable && ( */}
                {!isCancel && !isHold && (
                  <li title={!isCancel ? "Order Cancel" : "Remove Cancel"}>
                    <span
                      className="btn btn-color-table"
                      style={{ border: "1px solid grey" }}
                      // onClick={() =>
                      //   onCancelHandler(property.propertyId, !isCancel)
                      // }
                      onClick={() =>
                        openModal(property.orderId, 2, isCancel ? 0 : 1)
                      }
                    >
                      <Link href="#">
                        <span className="flaticon-garbage text-light"></span>
                      </Link>
                    </span>
                  </li>
                )}
                {/* )} */}

                {/* {isEditable && (
                  <li title="Edit Property">
                    <Link href="#">
                      <span className="btn btn-color w-100 mb-1">
                        {" "}
                        On Hold{" "}
                      </span>
                    </Link>{" "}
                    <Link
                      className="btn btn-color-table"
                      href={`/create-listing/${property.propertyId}`}
                    >
                      <span className="flaticon-edit"></span>
                    </Link>
                  </li>
                )} */}

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

                <li title="Archive Property">
                  {/* <Link
                      href="#"
                      onClick={() =>
                        archievePropertyHandler(property.propertyId)
                      }
                    >
                      <span className="btn btn-color w-100">
                        {" "}
                        Archive Property{" "}
                      </span>
                    </Link> */}
                  <span
                    className="btn btn-color-table"
                    onClick={() => archievePropertyHandler(property.orderId)}
                  >
                    <Link
                      className="color-light"
                      href={`/brokerage-archive-properties`}
                    >
                      <span className="text-light">
                        <FaArchive />
                      </span>
                    </Link>
                  </span>
                </li>

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
      .get("/api/getBrokersProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: data.brokerage_Details.id,
        },
      })
      .then((res) => {
        toast.dismiss();
        // console.log("bids", res.data.data.$values);
        const temp = res.data.data.$values;
        let tempProperties = [];
        tempProperties = temp.filter((prop, index) => {
          if (String(prop.userId) === String(data.userId)) {
            return true;
          } else {
            return false;
          }
        });
        setProperties(tempProperties);
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
        tempBids = res.data.data.$values;
        setBids(tempBids);
      })
      .catch((err) => {
        toast.error(err);
        // setModalIsOpenError(true);
      });

    // console.log(brokerageId);
    toast.loading("Getting properties...");
    // const url = window.location.pathname;
    // const brokerageId = url.split("/brokerage-properties/")[1];
    // axios
    //   .get("/api/getBrokersProperties", {
    //     headers: {
    //       Authorization: `Bearer ${data?.token}`,
    //       "Content-Type": "application/json",
    //     },
    //     params: {
    //       userId: data.brokerage_Details.id,
    //     },
    //   })
    //   .then((res) => {
    //     toast.dismiss();
    //     console.log("bids", res.data.data.$values);
    // const tempBids = res.data.data.$values;
    // console.log(tempBids, brokerageId);
    // let updatedBids = [];
    // tempBids.filter((bid, index) => {
    //   if (String(bid.orderId) === String(propertyId)) {
    //     updatedBids.push(bid);
    //   }
    // });

    // console.log(updatedBids);
    // setProperties(updatedBids);
    // })
    // .catch((err) => {
    //   toast.dismiss();
    //   toast.error(err?.response?.data?.error);
    // });
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
