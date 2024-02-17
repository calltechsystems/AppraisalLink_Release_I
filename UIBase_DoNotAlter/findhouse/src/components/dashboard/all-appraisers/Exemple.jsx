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
  {
    id: "appraiser_id",
    numeric: false,
    label: "Appraiser Id",
    width: 100,
  },

  {
    id: "firstname",
    numeric: false,
    label: "First Name",
    width: 200,
  },
  {
    id: "lastname",
    numeric: false,
    label: "Last Name",
    width: 200,
  },
  {
    id: "phone",
    numeric: false,
    label: "Phone",
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
    label: "Address",
    width: 200,
  },

  {
    id: "date",
    numeric: false,
    label: "Date",
    width: 200,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 180,
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
  setAppraiser,
  end,
  setUpdatedCode,
  setCurrentViewAppraiser,
  setOpenViewModal,setAppraiserCompanyInfo,setCloseRegisterModal,
  properties,
  setIsStatusModal,
  setProperties,
  deletePropertyHandler,
  onWishlistHandler,
  participateHandler,
  setFilterQuery,
  setSearchInput,
  openModalBroker,
  setErrorMessage,
  setModalIsOpenError,
  setOpenEditModal,
  setSelectedAppraiser,
  setRefresh,
  setStartLoading,
  refresh,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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

  const openCredModal = (data)=>{
  setCurrentViewAppraiser(data);
  setOpenViewModal(true);
  }

  const router = useRouter();

  const openStatusUpdateHandler = () => {
    setIsStatusModal(true);
  };

  const openEditModalHandler = (appraiser)=>{
      setSelectedAppraiser(appraiser);
      setOpenEditModal(true);
  }

  const removeWishlistHandler = (id) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    const formData = {
      userId: userData.userId,
      propertyId: id,
      token: userData.token,
    };

    const payload = encryptionData(formData);
    toast.loading("removing this property into your wishlist");
    axios
      .delete("/api/removeWishlistProperty", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        params: {
          userId: id,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully removed !!! ");
        location.reload(true);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

  const openModalEdit = (appraiser)=>{
    setAppraiser(appraiser);
    setOpenEditModal(true);
  }

  const onDeletePropertyHandler = () => {};

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const checkWishlistedHandler = (data) => {
    let temp = {};
    console.log(wishlist, data);
    wishlist.map((prop, index) => {
      if (String(prop.propertyId) === String(data.propertyId)) {
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
    return data.sort((a, b) => b.appraisal_id - a.appraisal_id);
  };

  const checkData = properties && !updatedData ? true : false;
  useEffect(() => {
    setProperties([]);
  }, [checkData]);

  useEffect(() => {
    const getData = () => {
      const dateNow = formatDate(new Date());
      properties.map((data, index) => {
        const updatedRow = {
          appraiser_id: data.item.id,
          firstname: data.item.firstName ? data.item.firstName : "-",
          lastname: data.item.lastName ? data.item.lastName : "-",
          status : data.item.isActive  ? (<span
          className="btn btn-success  w-100"
          
        >
          Active
        </span>
      ) : !data.item.firstName  ?  (
        <span className="btn btn-warning  w-100">Not Registered</span>)
      : (
      <span className="btn btn-danger  w-100">In-Active</span>
    ) ,
          phone: data.item.phoneNumber ? data.item.phoneNumber : "-",
          address :data.item.streetName ? `${data.item.streetName} ${data.item.streetNumber},${data.city}-${data.postalCode}` : "N.A.",
          date: dateNow,

          action: (
            <div className="print-hidden-column">
            { data.item.firstName  && <button className="btn btn-color m-1" onClick={()=>openEditModalHandler(data.item)}>
                <i className="flaticon-edit"></i>
              </button>}
              
              { !data.item.firstName &&  <button className="btn btn-color m-1" onClick={()=>openCredModal(data)}>
              <i className="flaticon-view"></i>
            </button>}
            
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
    const data = JSON.parse(localStorage.getItem("user"));
    const payload = {
      token: userData.token,
      userId : userData.userId
    };
      const encryptedData = encryptionData(payload);
    axios
      .get("/api/getAllAppraiserByCompanyId",{
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: data?.appraiserCompany_Datails?.appraiserCompanyId,
        },
      })
      .then((res) => {

        // console.log(res.data);
        setAppraiserCompanyInfo([]);
        setProperties(res.data.data.$values);
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.error);
        setModalIsOpenError(true);
      });
       setRefresh(false);
  }, [refresh]);
  console.log(sortObjectsByOrderIdDescending(updatedData));
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
