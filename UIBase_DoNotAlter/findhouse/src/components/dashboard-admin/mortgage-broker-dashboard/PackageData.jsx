import axios from "axios";
import toast from "react-hot-toast";
import SmartTable from "./TabularView";
import { useEffect, useState } from "react";

const SearchData = ({ data, properties , setRefresh}) => {

  const [updatedCode,setUpdatedCode] = useState([]);
  const [dataFetched,setDataFetched] = useState(true);

  const headCells = [
    {
      id: "sno",
      numeric: false,
      label: "S.no",
      width: 200,
    },
  
    {
      id: "broker_name",
      numeric: false,
      label: "Broker Name",
      width: 200,
    },
  
    {
      id: "active_plan",
      numeric: false,
      label: "Active Plans",
      width: 200,
    },
  
    {
      id: "appraised_properties",
      numeric: false,
      label: "No of Appraised Properties",
      width: 200,
    },
    {
      id: "status",
      numeric: false,
      label: "Status",
      width: 200,
    },
  
    {
      id: "expiry_date",
      numeric: false,
      label: "Expiry Date",
      width: 280,
    },
  ];

  useEffect(()=>{
    let tempData = [];
      const getData = ()=>{
        data?.map((row,index)=>{
          const newRow = {
            sno : index+1,
            broker_name : `${row.firstName} ${row.lastName}`,
            active_plan : row.planName,
            appraised_properties : allPropertiesForUser(row.userId),
            status : row.firstName ? (
              <span className="btn btn-success  w-100">Active</span>
            ) : (
              <span className="btn btn-danger  w-100">In-Active </span>
            ),
            expiry_date : formatDate(row.endDate)
          };

          tempData.push(newRow);
        });
        return tempData;
       
      }
      const resultedArray = getData();
      setUpdatedCode(resultedArray);
  },[data,properties]);

  const formatDate = (dateString) => {

    if(dateString === "-"){
      return dateString;
    }
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const originalDate = new Date(dateString);
    const estDate = new Date(originalDate.getTime() - 5 * 60 * 60 * 1000);

    const formattedDate = estDate.toLocaleString("en-US", options);
    return formattedDate;
  };
  const allPropertiesForUser = (id) => {
    let allProperties = 0;
    properties?.map((bid, index) => {
      if (String(bid.userId) === String(id)) {
        allProperties += 1;
      }
    });

    return allProperties;
  };

  const refreshHandler = ()=>{
    setRefresh(true)
  }
  return (
    <>
    <SmartTable
    headCells={headCells}
      data={updatedCode}
      properties={updatedCode}
      dataFetched={dataFetched}
      refreshHandler={refreshHandler} 
    />
   </>
  );
};

export default SearchData;
