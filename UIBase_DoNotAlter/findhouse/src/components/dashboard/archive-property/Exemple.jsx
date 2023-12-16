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
  //   id: "name",
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
  // {
  //   id: "quote_date",
  //   numeric: false,
  //   label: "Quote Date",
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
  open,
  close,
  properties,
  setProperties,
  deletePropertyHandler,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [allBids,setBids] = useState([]);
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

  
  const getPropertyStatusHandler = (property)=>{
    let isInProgress = true ;
    let isQuoteProvided = false;
    let isCompleted = false;
    allBids.map((bid,index)=>{
      if(bid.propertyId === property.propertyId && bid.status === 1){
        isCompleted =true;
      }
      else if (bid.propertyId === property.propertyId ){
        isQuoteProvided = true
      }
    })
    return isCompleted ? 2 : isQuoteProvided ? 1 : 0 ;
  }


  useEffect(() => {
    const getData = () => {
      properties.map((property, index) => {
        const isStatus = getPropertyStatusHandler(property);
        
        const isEditable = isStatus === 0 ? true : false ;
        if(property.isArchive) {const updatedRow = {
          order_id: property.orderId,
          status: isStatus === 2  ? (
            <span className="btn bg-success text-light">Completed</span>
          ) : isStatus === 0 ? (
            <span className="btn bg-primary text-light">In Progress</span>
          ):
            (
              <span className="btn bg-primary text-light">Quote Provided</span>
            )
          ,
          address: `${property.streetNumber}, ${property.streetName}, ${property.city}, ${property.state}, ${property.zipCode}`,
          user: property.applicantEmailAddress,
          name: `${property.applicantFirstName}, ${property.applicantLastName}`,
          amount: ` $${property.bidLowerRange}`,
          sub_date: formatDate(property.addedDatetime),
          quote_date: formatDate(property.addedDatetime),
          actions: (
            <ul className="view_edit_delete_list mb0">
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="View"
              >
                <Link
                  href={`/my-property-bids/${property.propertyId}`}
                  className="btn btn-color-table"
                >
                  <span className="flaticon-view"></span>
                </Link>
              </li>
              {isEditable && (
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                >
                  <Link href={`/create-listing/${property.propertyId}`}>
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
  }, []);
  return (
    <>
      {updatedData && (
        <SmartTable title="" data={updatedData} headCells={headCells} />
      )}
    </>
  );
}
