import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Loader from "./Loader";
// import "./SmartTable.css";

const headCells = [
  // {
  //   id: "email",
  //   numeric: false,
  //   label: "Email / Username",
  //   width: 200,
  // },

  {
    id: "firstname",
    numeric: false,
    label: "First Name",
    width: 150,
  },
  {
    id: "lastname",
    numeric: false,
    label: "Last Name",
    width: 150,
  },
  {
    id: "phone",
    numeric: false,
    label: "Phone Number",
    width: 200,
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
    width: 150,
  },

  {
    id: "emailaddress",
    numeric: false,
    label: "Email Address",
    width: 200,
  },
  // {
  //   id: "date",
  //   numeric: false,
  //   label: "Date",
  //   width: 200,
  // },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 100,
  },
];

const temporaryData = [
  {
    email: "test@gmail.com",
    firstname: "Joe",
    lastname: "Doe",
    company: "Appraiser Company 1",
    phone: "+91 12324 235644",
    date: " 29 December 2023",
  },
  {
    email: "test@gmail.com",
    firstname: "Joe",
    lastname: "Doe",
    company: "Appraiser Company 1",
    phone: "+91 12324 235644",
    date: " 29 December 2023",
  },
  {
    email: "test@gmail.com",
    firstname: "Joe",
    lastname: "Doe",
    company: "Appraiser Company 1",
    phone: "+91 12324 235644",
    date: " 29 December 2023",
  },
  {
    email: "test@gmail.com",
    firstname: "Joe",
    lastname: "Doe",
    company: "Appraiser Company 1",
    phone: "+91 12324 235644",
    date: " 29 December 2023",
  },
  {
    email: "test@gmail.com",
    firstname: "Joe",
    lastname: "Doe",
    company: "Appraiser Company 1",
    phone: "+91 12324 235644",
    date: " 29 December 2023",
  },
];
let count = 0;

export default function Exemple({
  userData,
  open,
  close,
  start,
  end,
  setUpdatedCode,
  setCloseRegisterModal,
  properties,
  setIsStatusModal,
  setProperties,
  deletePropertyHandler,
  onWishlistHandler,
  participateHandler,
  setCurrentViewBroker,
  setOpenViewModal,
  setFilterQuery,
  setSearchInput,
  openModalBroker,
  setErrorMessage,
  setModalIsOpenError,
  selectedBroker,
  setSelectedBroker,
  setRefresh,
  setStartLoading,
  refresh,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [allBrokers, setAllBrokers] = useState([]);
  const [bids, setBids] = useState([]);
  const [hideAction, setHideAction] = useState(false);
  const [hideClass, setHideClass] = useState("");
  const [show, setShow] = useState(false);
  let tempData = [];

  const filterBidsWithin24Hours = (property) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let tempBid = 0,
      bidValue = {};

    console.log(bids);
    bids.filter((bid) => {
      if (bid.propertyId === property.propertyId) {
        console.log("matched", bid);
        tempBid = tempBid + 1;
        bidValue = bid;
      } else {
      }
    });
    return tempBid > 0 ? bidValue : {};
    // const currentTime = new Date();
    // const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000; // Subtracting milliseconds for 24 hours
    //    const requestTime = new Date(tempBid.requestTime);
    //   return requestTime >= twentyFourHoursAgo && requestTime <= currentTime;
  };

  const openCredModal = (data) => {
    setCurrentViewBroker(data);
    setOpenViewModal(true);
  };

  const findBroker = (userId) => {};

  const router = useRouter();

  const openStatusUpdateHandler = (broker) => {
    setSelectedBroker(broker);
    setIsStatusModal(true);
  };

  const removeWishlistHandler = (id) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const formData = {
      userId: userdata?.userId,
      propertyId: id,
      token: userdata?.token,
    };

    const payload = encryptionData(formData);
    toast.loading("removing this property into your wishlist");
    axios
      .delete("/api/removeWishlistProperty", {
        headers: {
          Authorization: `Bearer ${userdata?.token}`,
        },
        params: {
          userId: id,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully removed !!! ");
        window.location.reload();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

  const onDeletePropertyHandler = () => {};

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
    let temp = {};
    console.log(wishlist, data);
    wishlist.map((prop, index) => {
      if (String(prop.propertyId) === String(data?.propertyId)) {
        temp = prop;
      }
    });
    return temp ? temp : {};
  };

  const checkCanBidAgainHandler = (data) => {
    let temp = true;
    return temp;
  };

  const sortObjectsByOrderIdDescending = (data) => {
    return data?.sort((a, b) => b.orderId - a.orderId);
  };

  const checkData = properties && !updatedData ? true : false;
  useEffect(() => {
    setProperties([]);
  }, [checkData]);

  useEffect(() => {
    let tempData = [];
    const getData = () => {
      const dateNow = formatDate(new Date());
      allBrokers?.map((temp, index) => {
        console.log(temp);
        const data = temp.broker;
        const updatedRow = {
          // appraiser_id: data?.item.id,
          // emailaddress: data?.emailId ? data?.emailId : "NA",
          firstname: data?.firstName ? data?.firstName : "NA",
          lastname: data?.lastName ? data?.lastName : "NA",
          // company: data?.company,
          status:
            data?.isActive && data.firstName !== null ? (
              <span className="btn btn-success  w-100">Active</span>
            ) : !data?.firstName ? (
              <span className="btn btn-warning  w-100">Not Registered</span>
            ) : (
              <span className="btn btn-danger  w-100">In-Active</span>
            ),
          phone: data?.phoneNumber ? data?.phoneNumber : "NA",
          address: `${data?.streetName} ${data?.streetNumber},${data?.city}-${data?.postalCode}`,
          // date: dateNow,
          emailaddress: data?.emailId ? data?.emailId : "NA",
          date: dateNow,
          action: (
            <div className="print-hidden-column">
              <button
                href="#"
                className="btn btn-color"
                onClick={() => openStatusUpdateHandler(data)}
                title="Update Status"
              >
                <Link href="#">
                  <span className="flaticon-edit text-light"></span>
                </Link>
              </button>
              <button
                className="btn btn-color m-1"
                onClick={() => openCredModal(temp)}
              >
                <i className="flaticon-view"></i>
              </button>
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
    setUpdatedCode(true);
  }, [updatedData]);

  const refreshHandler = () => {
    setRefresh(true);
    setStartLoading(true);
  };
  useEffect(() => {
    console.log("inside");
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
      userId: userData.userId,
    };
    const encryptedData = encryptionData(payload);
    let tempProperties = [],
      tempWishlist = [];

    axios
      .get("/api/getBrokerByBrokerageId", {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: data?.brokerage_Details?.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        // setAppraiserCompanyInfo(res.data?.data?.brokerage);
        setAllBrokers(res.data?.data?.brokers.$values);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });
    // console.log(err);
    setRefresh(false);
  }, [refresh]);
  return (
    <>
      {refresh ? (
        <Loader />
      ) : (
        <SmartTable
          title=""
          setSearchInput={setSearchInput}
          setFilterQuery={setFilterQuery}
          data={sortObjectsByOrderIdDescending(updatedData)}
          headCells={headCells}
          setRefresh={setRefresh}
          setProperties={setProperties}
          setCloseRegisterModal={setCloseRegisterModal}
          refresh={refresh}
          refreshHandler={refreshHandler}
          setStartLoading={setStartLoading}
          start={start}
          end={end}
        />
      )}
    </>
  );
}
