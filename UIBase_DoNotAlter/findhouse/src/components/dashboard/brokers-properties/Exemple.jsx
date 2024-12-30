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
    id: "property_id",
    numeric: false,
    label: "Order ID",
    width: 100,
  },
  {
    id: "broker",
    numeric: false,
    label: "Broker Name",
    width: 280,
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
    width: 190,
  },
  {
    id: "remark",
    numeric: false,
    label: "Appraiser Remark",
    width: 170,
  },
  {
    id: "sub_date",
    numeric: false,
    label: "Quote Submitted Date",
    width: 220,
  },
  {
    id: "quote_required_by",
    numeric: false,
    label: "Appraisal Report Required By",
    width: 220,
  },
  {
    id: "urgency",
    numeric: false,
    label: "Request Type",
    width: 140,
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
    id: "actions_01",
    numeric: false,
    label: "Actions",
    width: 100,
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
  searchInput,
  filterQuery,
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
  openbrokerInfoModal,
  isBidded,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allBids, setBids] = useState([]);
  const [show, setShow] = useState(false);

  const [dataFetched, setDataFetched] = useState(false);
  const [allListedProperties, setAllListedProperties] = useState([]);
  let tempData = [];
  const [AllBrokers, setAllBrokers] = useState([]);

  useEffect(() => {
    if (searchInput === "") {
      setFilterQuery("All");
      setSearchInput("");
      setRefresh(true);
    }
  }, [searchInput]);

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.property_id - a.property_id);
  };

  const getBrokerName = (id) => {
    let selectedAppraiser = {};
    AllBrokers.map((appraiser, index) => {
      if (String(appraiser.userId) === String(id)) {
        selectedAppraiser = appraiser;
      }
    });

    return `${selectedAppraiser.firstName} ${selectedAppraiser.lastName}`;
  };

  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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

  const getBroker = (id) => {
    let selectedBroker = {};
    AllBrokers.map((appraiser, index) => {
      if (String(appraiser.userId) === String(id)) {
        selectedBroker = appraiser;
      }
    });

    openbrokerInfoModal(selectedBroker);
  };

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

  const getBidOfProperty = (orderId) => {
    let Bid = {};
    allBids.map((bid, index) => {
      if (String(bid.orderId) === String(orderId)) {
        Bid = bid;
      }
    });
    return Bid;
  };

  const refreshHandler = () => {
    setAllListedProperties([]);
    setBids([]);
    setProperties([]);
    setRefresh(true);
  };

  const getPropertyStatusHandler = (property) => {
    let isInProgress = true;
    let isQuoteProvided = false;
    let isCompleted = false;
    let isAccepted = false;
    allBids.map((bid, index) => {
      if (
        bid.orderId === property?.orderId &&
        bid.status === 1 &&
        bid.orderstatus === 3
      ) {
        isCompleted = true;
      }
      if (bid.orderId === property?.orderId && bid.status === 1) {
        isAccepted = true;
      } else if (bid.orderId === property.orderId) {
        isQuoteProvided = true;
      }
    });
    return isCompleted ? 3 : isAccepted ? 2 : isQuoteProvided ? 1 : 0;
  };

  const getPropertyInfoById = (userId) => {
    let selectedProperty = {};
    allListedProperties.map((prop, index) => {
      if (String(prop.userId) === String(userId)) {
        selectedProperty = prop;
      }
    });
    return selectedProperty;
  };

  const openPopupModal = (property) => {
    setModalIsPopupOpen(true);
    setCurrentProperty(property);
  };
  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const isBidded = getBidOfProperty(property?.orderId);
        const isHold = property?.isonhold;
        const isCancel = property?.isoncancel;
        const isStatus = getPropertyStatusHandler(property);
        const isEditable = isStatus === 0 ? true : false;
        if (!property?.isArchive) {
          const updatedRow = {
            property_id: property?.orderId,
            sub_date: formatDate(property?.addedDatetime),
            quote_required_by: property?.quoteRequiredDate
              ? formatDateNew(property?.quoteRequiredDate)
              : formatDateNew(property?.addedDatetime),
            broker: (
              <a href="#">
                <button
                  className=""
                  style={{
                    border: "0px",
                    color: "#2e008b",
                    textDecoration: "underline",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => getBroker(property?.userId)}
                >
                  {getBrokerName(property?.userId)}
                </button>
              </a>
            ),
            status:
              isHold || isCancel ? (
                <span className="btn bg-danger text-light w-100">
                  {isHold ? "On Hold" : "Cancelled"}
                </span>
              ) : isStatus === 3 ? (
                <span className="btn btn-completed w-100 text-light">
                  Completed
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
                <button className="btn btn-warning" style={{width:"90%"}}>
                  {isHold ? "N.A." : "N.A."}
                </button>
              ) : isBidded.orderstatus !== 1 &&
                isBidded.orderstatus !== null &&
                isBidded.orderstatus !== undefined ? (
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
                  <button className="btn btn-status">
                    Current Status
                    <span className="m-1">
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              ) : isBidded.$id &&
                isBidded.status === 1 &&
                isBidded.orderstatus === 1 &&
                isBidded.orderstatus !== undefined ? (
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
                        {getOrderValue(isBidded.orderstatus)} -
                        {formatDate(isBidded.statusDate)}
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn-status">
                    Current Status
                    <span className="m-1">
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              ) : (
                <button className="btn btn-warning" style={{width:"90%"}}><span>N.A.</span></button>
              ),
            address: `${property.streetNumber} ${property.streetName}, ${property.city}, ${property.province}, ${property.zipCode}`,
            remark: isBidded.remark ? isBidded.remark : "N.A.",
            type_of_building: property.typeOfBuilding,
            amount: ` $ ${addCommasToNumber(property.estimatedValue)}`,
            purpose: property.purpose,
            type_of_appraisal: property.typeOfAppraisal,
            lender_information: property.lenderInformation
              ? property.lenderInformation
              : "N.A.",
            urgency: property.urgency === 0 ? "Rush" : "Regular",
            actions_01: (
              <ul className="mb0 d-flex gap-1">
                <li title="Property Details" className="">
                  <span
                    className="btn btn-color-table"
                    onClick={() => openPopupModal(property)}
                  >
                    <Link href={"#"}>
                      <span className="text-light flaticon-view"></span>
                    </Link>
                  </span>
                </li>
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
    setAllListedProperties([]);
    setBids([]);
    setProperties([]);
    setFilterQuery("All");
    setSearchInput("");
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
        setDataFetched(true);
        setAllListedProperties(res.data.data.properties.$values);
      })
      .catch((err) => {
        toast.error(err);
        setDataFetched(false);
      });

    axios
      .get("/api/getBrokeragebrokerProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: data?.brokerage_Details?.id,
        },
      })
      .then((res) => {
        toast.dismiss();
        const temp = res.data.data.$values;
        let requiredRows = [];
        temp.map((row, index) => {
          const data = row?.properties.$values;
          data.map((prop, idx) => {
            requiredRows.push(prop);
          });
        });

        axios
          .get("/api/getAllBids", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((res) => {
            tempBids = res.data.data.$values;
            setProperties(requiredRows);
            setBids(tempBids);
          })
          .catch((err) => {
            toast.error(err);
          });
      });
    axios
      .get("/api/getAllBrokers", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        let allbroker = res.data.data.$values;

        setAllBrokers(allbroker);
      })
      .catch((err) => {});

    let tempBids = [];

    setRefresh(false);
  }, [refresh]);
  return (
    <>
      {updatedData && (
        <SmartTable
          title=""
          searchInput={searchInput}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          setSearchInput={setSearchInput}
          data={sortObjectsByOrderIdDescending(updatedData)}
          headCells={headCells}
          refreshHandler={refreshHandler}
          start={start}
          dataFetched={dataFetched}
          properties={updatedData}
          end={end}
        />
      )}
    </>
  );
}
