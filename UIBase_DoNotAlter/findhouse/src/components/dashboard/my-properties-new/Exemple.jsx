import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios, { all } from "axios";
import millify from "millify";
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
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allBids, setBids] = useState([]);
  const [show, setShow] = useState(false);
  let tempData = [];

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.order_id - a.order_id);
  };

  const AppraiserStatusOptions = [
    {
      id: -1,
      type: "Select...",
      value: "",
    },
    {
      id: 0,
      type: "Applicant Contacted by appraiser",
      value: "Applicant Contacted by appraiser",
    },
    {
      id: 1,
      type: "Appraisal Visit Confirmed",
      value: "Appraisal Visit Confirmed",
    },
    {
      id: 2,
      type: "Appraisal Report Writing in Progress",
      value: "Appraisal Report Writing in Progress",
    },
    {
      id: 3,
      type: "Appraisal Report Writing Completed and Submitted",
      value: "Appraisal Report Writing Completed and Submitted",
    },

    {
      id: 4,
      type: "Assignment on Hold",
      value: "Assignment on Hold",
    },

    {
      id: 5,
      type: "Assignment Cancelled new status to be added",
      value: "Assignment Cancelled new status to be added",
    },

    {
      id: 6,
      type: "Appraisal visit completed; report writing is pending until fee received",
      value:
        "Appraisal visit completed; report writing is pending until fee received",
    },
  ];

  const getOrderValue = (val) => {
    let title = "";
    AppraiserStatusOptions?.map((status) => {
      if (String(status.id) === String(val)) {
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
        const isHold = property.isOnHold;
        const isCancel = property.isOnCancel;
        const isStatus = getPropertyStatusHandler(property);
        console.log(isStatus);
        const isEditable = isStatus === 0 ? true : false;
        if (!property.isArchive) {
          const updatedRow = {
            order_id: property.orderId,
            sub_date: formatDate(property.addedDatetime),
            quote_required_by: property.quoteRequiredDate
              ? formatDate(property.quoteRequiredDate)
              : formatDate(property.addedDatetime),
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
            address: `${property.streetNumber}, ${property.streetName}, ${property.city}, ${property.province}, ${property.zipCode}`,
            remark: property.remark ? property.remark : "N.A.",
            // user: property.applicantEmailAddress,
            type_of_building: property.typeOfBuilding,
            amount: ` $ ${millify(property.estimatedValue)}`,
            purpose: property.purpose,
            type_of_appraisal: property.typeOfAppraisal,
            lender_information: property.lenderInformation
              ? property.lenderInformation
              : "N.A.",
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

                {!isEditable && isStatus === 1 && (
                  <li>
                    <Link href={`/my-property-bids/${property.orderId}`}>
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

                {!isEditable && (
                  <li title="Quotes">
                    {/* <Link href={`/my-property-bids/${property.propertyId}`}>
                      <span className="btn btn-color w-100 mb-1"> Quotes </span>
                    </Link>{" "} */}
                    <Link
                      className="btn btn-color-table"
                      // style={{ marginLeft: "4.3rem" }}
                      href={`/my-property-bids/${property.orderId}`}
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

                {(isEditable || isStatus === 1) && (
                   <li title="Edit Property">
                    {/* <Link href={`/create-listing/${property.propertyId}`}>
                      <span className="btn btn-color w-100 mb-1"> Edit </span>
                    </Link>{" "} */}
                    <Link
                      className="btn btn-color-table"
                      href={`/create-listing/${property.orderId}`}
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
                {!isCancel && (
                  <li title={"Order Cancel"}>
                    <span
                      className="btn btn-color-table"
                      style={{ border: "1px solid grey" }}
                      // onClick={() =>
                      //   onCancelHandler(property.propertyId, !isCancel)
                      // }
                      onClick={() => openModal(property.orderId, 2, 1)}
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
                    <Link className="color-light" href={`/archive-property`}>
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
        const temp = res.data.data.properties.$values;
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
