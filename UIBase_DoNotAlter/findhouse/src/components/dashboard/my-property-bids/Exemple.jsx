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
    id: "AppraiserId",
    numeric: false,
    label: "Appraiser ID",
    width: 150,
  },
  {
    id: "appraiser",
    numeric: false,
    label: "Appraiser Name",
    width: 200,
  },
  {
    id: "appraiser_company",
    numeric: false,
    label: "Appraiser Compnay Name",
    width: 220,
  },
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
    width: 220,
  },
  ,
  {
    id: "action",
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
  propertyId,
  properties,
  setProperties,
  deletePropertyHandler,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [show, setShow] = useState(false);
  const [all, setAll] = useState([]);

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

  const refreshHandler = () => {
    setRefresh(true);
  };

  const triggerAppraiserInfo = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));
    axios
      .get("/api/getAppraiserById", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          Id: id,
        },
      })
      .then((res) => {
        setAppInfo(res.data.data.appraiser.result);
        setOpenBrokerModal(true);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
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
    const getData = () => {
      properties.map((property, index) => {
        const updatedRow = {
          AppraiserId: property.appraiserUserId ? property.appraiserUserId : 0,
          quote: property.bidAmount,
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

          action:
            property.status === 1 ? (
              <h5 className="btn btn-success">Accepted</h5>
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

                {/* <div className="fp_pdate float-end">{item.postedYear}</div> */}

                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                >
                  <div
                    className="fp_pdate float-end mt-1 fw-bold"
                    onClick={() => setProperty(property)}
                  >
                    <a href="#" className="btn btn-danger">
                      Decline
                    </a>
                  </div>
                </li>
              </ul>
            ) : (
              <h5 className="btn btn-danger">Declined</h5>
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
      .then((res) => {
        console.log(res);
        console.log("Properties", res.data.data.properties.$values);
        setAllProperties(res.data.data.properties.$values);
      })
      .catch((err) => {
        toast.dismiss();
        // setErrorMessage(err?.response?.data?.error);
        // setModalIsOpenError(true);
      });
    toast.loading("Getting properties...");
    axios
      .get("/api/getAllBids", {
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
        const tempBids = res.data.data.result.$values;
        console.log(tempBids, propertyId);
        let updatedBids = [];
        tempBids.filter((bid, index) => {
          if (String(bid.propertyId) === String(propertyId)) {
            updatedBids.push(bid);
          }
        });

        setProperties(updatedBids);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
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
