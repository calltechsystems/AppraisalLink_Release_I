import { useEffect, useState } from "react";
import SmartTable from "./SmartTable";
import toast from "react-hot-toast";
import axios from "axios";
// import "./SmartTable.css";

const headCells = [
  {
    id: "id",
    numeric: false,
    label: "Unique Id",
    width: 250,
  },
  {
    id: "planName",
    numeric: false,
    label: "Selected Plan",
    width: 120,
  },
  {
    id: "planType",
    numeric: false,
    label: "Selected Plan",
    width: 120,
  },

  {
    id: "st_date",
    numeric: false,
    label: "Start Date",
    width: 120,
  },
  {
    id: "end_date",
    numeric: false,
    label: "End Date",
    width: 120,
  },
  {
    id: "amount",
    numeric: false,
    label: "Amount",
    width: 100,
  },
  {
    id: "remained_prop",
    numeric: false,
    label: "Used Properties",
    width: 100,
  },
  {
    id: "status",
    numeric: false,
    label: "Status",
    width: 190,
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
  data,
  open,
  dataFetched,
  close,
  deletePropertyHandler,
  onWishlistHandler,
  participateHandler,
  setErrorMessage,
  setModalIsOpenError,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [properties, setProperties] = useState([]);
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

    // For EST date and time

      const formatDateTimeEST = (date) => {
    const d = new Date(date);
    const utcOffset = -5; // EST is UTC-5
    d.setHours(d.getHours() + utcOffset);
    return d.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
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
  

  const prices = [
    {
      lite: 49,
      Premium: 99,
      Ultimate: 149,
    },
  ];

  useEffect(() => {
    if (data.result) {
      if ((data?.result?.$values).length === 0) {
        setDataFetched(true);
      }
    }
  }, [data]);

  const getTypePrice = (type) => {
    return prices[0].type;
  };

  const getNextDate = (date) => {
    return date;
  };
  const calculateNextYearDate = (inputDate) => {
    const inputDateTime = new Date(inputDate);

    // Calculate the next year
    const nextYear = inputDateTime.getFullYear() + 1;

    // Create a new Date object for the next year
    const nextYearDate = new Date(
      nextYear,
      inputDateTime.getMonth(),
      inputDateTime.getDate()
    );

    // Format the result as a string
    const result = nextYearDate.toISOString();

    return result;
  };

  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.status);
      const dateB = new Date(b.status);
      return dateB - dateA;
    });
  };

  const NextMonthAndYearCalculator = (inputDate) => {
    const inputDateTime = new Date(inputDate);

    // Calculate the next month and next year
    let nextMonth = inputDateTime.getMonth() + 1;
    let nextYear = inputDateTime.getFullYear();

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    // Calculate the last day of the next month
    const lastDayOfNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();

    // Set the day to the minimum of the current day and the last day of the next month
    const nextMonthDate = new Date(
      nextYear,
      nextMonth,
      Math.min(inputDateTime.getDate(), lastDayOfNextMonth)
    );

    // Calculate the next year date
    const nextYearDate = new Date(
      nextYear + 1,
      inputDateTime.getMonth(),
      inputDateTime.getDate()
    );

    // Format the results as strings
    const nextMonthDateStr = nextMonthDate.toISOString().split("T")[0];
    const nextYearDateStr = nextYearDate.toISOString().split("T")[0];

    return { nextMonth: nextMonthDateStr, nextYear: nextYearDateStr };
  };

  const sortFunction = (hisotries)=>{
    const data = hisotries;
    data?.sort((a, b) => {
      const startDateA = new Date(a.startDate);
      const startDateB = new Date(b.startDate);
      
      if (startDateA < startDateB) return -1;
      if (startDateA > startDateB) return 1;
      
      // If start dates are equal, compare by end date
      const endDateA = new Date(a.endDate);
      const endDateB = new Date(b.endDate);
      
      if (endDateA < endDateB) return -1;
      if (endDateA > endDateB) return 1;
      
      return 0;
  });
  return data;
  }


  useEffect(() => {
    const getData = () => {
      const date = formatDate(new Date());

      const sortedData = sortFunction(data); 
      sortedData?.map((property, index) => {
        const propertyCount = 26;
        const { nextMonth, nextYear } = NextMonthAndYearCalculator(
          property.createdTime
        );
        const endDate = property.planAmount < 500 ? nextMonth : nextYear;
        const expired =
          new Date(property.endDate) >= new Date() &&
          new Date() >= new Date(property.startDate)
            ? true
            : false;

        if (true) {
          const updatedRow = {
            id: property.paymentid,
            planName: property.planName,
            planType:(
                <span>Monthly</span>
              ),
            amount: property.planAmount ? `$ ${property.planAmount}` : "$ -",
            st_date: formatDateTimeEST(property.startDate),
            end_date: formatDateTimeEST(property.endDate),
            remained_prop: `${
              property.usedProperties === null ? 0 : property.usedProperties
            } of ${property.noOfProperties}`,
            status: !expired ? (
              <span className="btn btn-info  w-100">
                Will Be Active on {formatDate(property.startDate)}
              </span>
            ) : (
              <span className="btn btn-success  w-100">Active</span>
            ),
          };
          tempData.push(updatedRow);
        }
      });
      setUpdatedData(tempData);
    };
    getData();
  }, [data]);

  useEffect(() => {
    let tempProperties = [];
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: userData.token,
    };
  }, [data]);
  return (
    <>
      {updatedData && (
        <SmartTable
          title=""
          properties={updatedData}
          dataFetched={dataFetched}
          data={sortObjectsByOrderIdDescending(updatedData)}
          headCells={headCells}
        />
      )}
    </>
  );
}
