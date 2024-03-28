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
  // {
  //   id: "appraiser_company",
  //   numeric: false,
  //   label: "Appraiser Company Name",
  //   width: 220,
  // },
  {
    id: "quote",
    numeric: false,
    label: "Quote Amount",
    width: 150,
  },
  // {
  //   id: "amount",
  //   numeric: false,
  //   label: "Bid Amount",
  //   width: 200,
  // },
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
    width: 200,
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
  setIsModalOpen_01,
  orderId,
  properties,
  setProperties,
  deletePropertyHandler,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [show, setShow] = useState(false);
  const [acceptedBid, setAcceptedBid] = useState(-1);
  const [all, setAll] = useState([]);

  const router = useRouter();
  let tempData = [];

  const [appraiser, setAppraisers] = useState([]);

  const openPopupModal = (prop, id) => {
    // console.log(prop);
    setProperty(prop);
    setId(id);

    setIsModalOpen(true);
  };

  const openPopupModal_01 = () => {
    // console.log(prop);
    // setProperty(prop);
    // setId(id);
    setIsModalOpen_01(true);
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

  const refreshHandler = () => {
    setRefresh(true);
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
    // window.location.reload();
    // toast.success("Successfully Re assigned Appraiser");
  };

  const getCurrentPropertyInfoHandler = () => {
    let currentProperty = {};
    allProperties.map((prop, index) => {
      if (String(prop.orderId) === String(orderId)) {
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

  const getPropertyHandler = (currentProperty) => {
    let temp = {};

    allProperties.forEach((prop) => {
      if (prop.propertyId === currentProperty.propertyId) {
        temp = prop;
      }
    });
    return temp;
  };

  const acceptRequestHandler = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));
    toast.loading("Accepting the bid ...");
    const payload = {
      bidId: id,
      token: data.token,
    };

    const encryptedBody = encryptionData(payload);
    axios
      .post("/api/acceptBid", encryptedBody, {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully accepted the requested Bid");
        router.push("/my-properties");
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err);
        toast.error(err?.response?.data?.error);
      });
  };

  const rejectRequestHandler = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));
    toast.loading("Declining the bid ...");
    const payload = {
      bidId: id,
    };
    const encryptedBody = encryptionData(payload);
    axios
      .post("/api/declineBid", encryptedBody, {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully declined the requested Bid");
        router.push("/my-properties");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

  useEffect(() => {
    const prop = getCurrentPropertyInfoHandler();

    const getData = () => {
      properties.map((property, index) => {
        const isWait = prop.isOnCancel || prop.isOnHold ? true : false;
        if (property.status === 1) {
          setAcceptedBid(property.bidId);
        }
        const updatedRow = {
          AppraiserId: property.appraiserUserId ? property.appraiserUserId : 0,
          quote: `$ ${property.bidAmount}`,
          amount: property.bidAmount,
          description: property.description != "" ? property.description : "NA",
          date: formatDate(property.requestTime),
          appraiser: (
            <a href="#">
              <button
                style={{
                  border: "0px",
                  color: "blue",
                  backgroundColor: "transparent",
                }}
                onClick={() => triggerAppraiserInfo(property.appraiserUserId)}
              >
                Get Info
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
                }}
                onClick={() => triggerAppraiserInfo(property.appraiserUserId)}
              >
                Get Info
              </button>
            </a>
          ),

          action: (
            <>
              {prop.isOnCancel || prop.isOnHold ? (
                <p className="btn btn-danger">
                  {`Cannot perform any actions as the current property is ${
                    prop.isOnHold ? "On Hold" : "On Cancelled"
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
                    <div className=" btn btn-color fw-bold ">
                      {/* <Link
                      href="assets/images/Terms & Conditions.pdf"
                      target="_blank"
                      className="form-check-label text-primary"
                    > */}
                      <span className="flaticon-pdf text-light">
                        {" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            userData?.appraiser_Details?.lenderListUrl
                              ? userData?.appraiser_Details?.lenderListUrl
                              : "#"
                          }
                          style={{ cursor: "pointer", color: "white" }}
                        >
                          Lender List Pdf
                        </a>
                      </span>
                      {/* </Link> */}
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
                      {/* <Link
                      href="assets/images/Terms & Conditions.pdf"
                      target="_blank"
                      className="form-check-label text-primary"
                    > */}
                      <span className="flaticon-pdf text-light">
                        {" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            userData?.appraiser_Details?.lenderListUrl
                              ? userData?.appraiser_Details?.lenderListUrl
                              : "#"
                          }
                          style={{ cursor: "pointer" }}
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
                </div>
              )}{" "}
            </>
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

    axios
      .get("/api/getAllListedProperties", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log(result);

        setAllProperties(result.data.data.properties.$values);
        const url = window.location.pathname;
        const propertyOrderId = url.split("/my-property-bids/")[1];
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
            // console.log(res.data);
            toast.dismiss();
            const tempBids = res.data.data.$values;
            console.log(tempBids, orderId);
            let updatedBids = [];
            tempBids.filter((bid, index) => {
              if (String(bid.orderId) === String(orderId)) {
                updatedBids.push(bid);
              }
            });

            setProperties(updatedBids);

            console.log(updatedBids);
          })
          .catch((err) => {
            toast.dismiss();
            toast.error(err?.response?.data?.error);
          });
      })
      .catch((err) => {
        toast.dismiss();
        // setErrorMessage(err?.response?.data?.error);
        // setModalIsOpenError(true);
      });

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
          start={start}
          end={end}
        />
      )}
    </>
  );
}
