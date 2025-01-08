import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
// import "./SmartTable.css";

const headCells = [
  {
    id: "appraiser",
    numeric: false,
    label: "Appraiser / Appraiser Company",
    width: 220,
  },

  {
    id: "quote",
    numeric: false,
    label: "Quote Amount",
    width: 150,
  },
  {
    id: "description",
    numeric: false,
    label: "Remark",
    width: 200,
  },
  {
    id: "date",
    numeric: false,
    label: "Appraisal Submitted Date",
    width: 220,
  },
  ,
  {
    id: "action",
    numeric: false,
    label: "Actions",
    width: 270,
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
  openModal,
  closeModal,
  property,
  setProperty,
  setId,
  setAppInfo,
  open,
  close,
  start,
  end,
  setRefresh,
  refresh,
  setOpenBrokerModal,
  setIsModalOpen,
  orderId,
  properties,
  setProperties,
  setAllAppraiser,
  deletePropertyHandler,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [show, setShow] = useState(false);
  const [all, setAll] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  const [appraiser, setAppraisers] = useState([]);

  const router = useRouter();
  let tempData = [];

  const openPopupModal = (prop, id) => {
    // console.log(prop);
    setProperty(prop);
    setId(id);

    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
      hour12: false, // Set to false for 24-hour format
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

    // For EST date and time

    const formatDateTimeEST = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Toronto", // EST/Canada timezone
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date));
    };
  
    // Only for time
  
    const formatDateToEST = (date) => {
      try {
        // Convert input date string to a Date object
        const utcDate = new Date(`${date}T00:00:00Z`); // Treat input as UTC midnight
        return new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Toronto", // EST/Canada timezone
          dateStyle: "medium",        // Format only the date
        }).format(utcDate);
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
      }
    };
  

  const refreshHandler = () => {
    setRefresh(true);
  };

  function addCommasToNumber(number) {
    if (Number(number) <= 100 || number === undefined) return number;
    return number.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getCurrentPropertyInfoHandler = () => {
    let currentProperty = {};
    const url = window.location.pathname;
    const propertyOrderId = url.split("/brokerage-properties-bid/")[1];
    allProperties.map((prop, index) => {
      if (String(prop.orderId) === String(propertyOrderId)) {
        currentProperty = prop;
      }
    });
    return currentProperty;
  };

  const triggerAppraiserInfo = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));
    let selectedAppraiser = {};
    appraiser.map((app, index) => {
      if (String(app.userId) === String(id)) {
        selectedAppraiser = app;
      }
    });
    setAppInfo(selectedAppraiser);
    setOpenBrokerModal(true);
  };

  //Re assign appraiser funciton
  const reAssign = (QuoteId) => {
    toast.loading("Re Assigning the appraiser ");

    const userData = JSON.parse(localStorage.getItem("user"));
    const payload = {
      QuoteId: QuoteId,
      token: userData.token,
    };

    const encryptedBpdy = encryptionData(payload);
    axios
      .put("/api/reAssignAppraiser", encryptedBpdy)
      .then((res) => {
        console.log(res);
        toast.dismiss();
        toast.success("Successfully Re assigned Appraiser");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Try Again!!");
      });
    setRefresh(true);
  };

  const getUserName = (id)=>{
    let requiredUser = "";
    appraiser.map((user,index)=>{
      if(String(user?.userId) === String(id)){
        requiredUser=`${user.firstName} ${user.lastName}`;
      }
    });
    return requiredUser;
  }


  function handleDownloadClick(event, url, fileName) {
    event.preventDefault(); // Prevent the default link behavior

    // Fetch the PDF file
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;

        // Append the link to the body and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => console.error("Error downloading file:", error));
  }

  useEffect(() => {
    const prop = getCurrentPropertyInfoHandler();
    console.log(prop);
    const getData = () => {
      properties.map((propertyWhole, index) => {
        const property = propertyWhole.bid;
        const updatedRow = {
          AppraiserId: property.appraiserUserId ? property.appraiserUserId : 0,
          quote: `$ ${addCommasToNumber(property.bidAmount)}`,
          amount: ` ${property.bidAmount}`,
          description: property.description != "" ? property.description : "NA",
          date: formatDateTimeEST(property.requestTime),
          appraiser: (
            <a href="#">
              <button
                style={{
                  border: "0px",
                  color: "blue",
                  backgroundColor: "transparent",
                  textDecoration:"underline"
                }}
                onClick={() => triggerAppraiserInfo(property.appraiserUserId)}
              >
                {getUserName(property.appraiserUserId)}
              </button>
            </a>
          ),
          appraiser_company: (
            <a href="#">
              <button
                style={{
                  border: "0px",
                  color: "blue",
                  backgroundColor: "transparent",
                  textDecoration:"underline"
                }}
                onClick={() => triggerAppraiserInfo(property.appraiserUserId)}
              >
                {getUserName(property.appraiserUserId)}
              </button>
            </a>
          ),

          action:
            prop.isOnHold || prop.isOnCancel ? (
              <p className="btn btn-danger">
                {`Cannot perform any actions as the current property is ${
                  prop.isOnCancel || prop.isOnHold ? "Cancelled" : "On Hold"
                }`}{" "}
              </p>
            ) : property.status === 1 ? (
              <div>
                <h5 className="btn btn-success m-1">Accepted</h5>
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Approved Lender List"
                >
                  <div className="btn btn-color fw-bold m-1">
                    
                    <span className="flaticon-pdf text-light">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          propertyWhole?.lenderListUrl
                            ? propertyWhole?.lenderListUrl
                            : "#"
                        }
                        onClick={(event) =>
                          handleDownloadClick(
                            event,
                            propertyWhole?.lenderListUrl,
                            `lenderlist.pdf`
                          )
                        }
                        style={{ cursor: "pointer", color: "white" }}
                      >
                        Lender List Pdf
                      </a>
                    </span>
                  </div>
                </li>
              </div>
            ) : property.status === 0 ? (
              <ul className="">
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Accept"
                >
                  <div
                    className="fp_pdate float-end mt-1 fw-bold"
                    onClick={() => openPopupModal(property, property.bidId)}
                  >
                    <a href="#" className="btn btn-success">
                      Accept
                    </a>
                  </div>
                </li>
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Approved Lender List"
                >
                  <div className="fp_pdate float-end btn btn-color fw-bold ">
                    
                    <span className="flaticon-pdf text-light">
                      {" "}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          propertyWhole?.lenderListUrl
                            ? propertyWhole?.lenderListUrl
                            : "#"
                        }
                        onClick={(event) =>
                          handleDownloadClick(
                            event,
                            propertyWhole?.lenderListUrl,
                            `lenderlist.pdf`
                          )
                        }
                        style={{ cursor: "pointer", color: "white" }}
                      >
                        Lender List Pdf
                      </a>
                    </span>
                    {/* </Link> */}
                  </div>
                </li>
              </ul>
            ) : (
              <div>
                <h5 className="btn btn-danger m-1">Declined</h5>
                {property?.appraiserAssign === false && (
                  <div
                    className="list-inline-item"
                    onClick={() => reAssign(property.bidId)}
                  >
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Change Appraiser"
                    >
                      <div className=" btn btn-color fw-bold ">
                        <span className="flaticon-replace text-light">
                          {" "}
                          Change Apprasier
                        </span>
                        {/* </Link> */}
                      </div>
                    </li>
                  </div>
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
    const data = JSON.parse(localStorage.getItem("user"));

    axios
      .get("/api/getAllAppraiser", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        let allbroker = res.data.data.result.$values;
        axios
          .get("/api/getAllAppraiserCompany", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((res2) => {
            const allbrokerage = res2.data.data.result.$values;
            let updated = allbroker;
            allbrokerage.map((user, index) => {
              updated.push(user);
            });

            console.log(updated);
            setAppraisers(updated);
          })
          .catch((err) => {
            toast.error(err);
          });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
        // (true);
      });

    //
    axios
      .get("/api/getAllListedProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        // console.log(result);
        setDataFetched(true);
        // setAllProperties(result.data.data.properties.$values);
        const url = window.location.pathname;
        const propertyOrderId = url.split("/brokerage-properties-bid/")[1];
        axios
          .get("/api/getAllQuotesForProperty", {
            headers: {
              Authorization: `Bearer ${data?.token}`,
              "Content-Type": "application/json",
            },
            params: {
              OrderId: propertyOrderId,
            },
          })
          .then((res) => {
            toast.dismiss();
            const tempBids = res.data.data.$values;

            setAllProperties(result.data.data.properties.$values);
            setProperties(tempBids);
          })
          .catch((err) => {
            toast.dismiss();
            setDataFetched(false);
            toast.error(err?.response?.data?.error);
          });
      })
      .catch((err) => {
        toast.dismiss();
       
      });

    setRefresh(false);
  }, [refresh]);
  return (
    <>
      {updatedData && (
        <SmartTable
          title=""
          data={updatedData}
          headCells={headCells}
          refreshHandler={refreshHandler}
          dataFetched={dataFetched}
          properties={updatedData}
          start={start}
          end={end}
        />
      )}
    </>
  );
}
