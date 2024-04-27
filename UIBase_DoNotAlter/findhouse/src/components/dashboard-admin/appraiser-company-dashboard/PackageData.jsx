import { useEffect, useState } from "react";
import SmartTable from "./TabularView";

const SearchData = ({
   data, 
  allBids, 
  setRefresh ,
  setBroker,
  setOpenBrokerModal}) => {
  const [updatedCode, setUpdatedCode] = useState([]);
  const [dataFetched, setDataFetched] = useState(true);

  const headCells = [
    {
      id: "sno",
      numeric: false,
      label: "S.no",
      width: 200,
    },

    {
      id: "appraiser_company",
      numeric: false,
      label: "Appraiser Company Name",
      width: 200,
    },

    {
      id: "bids",
      numeric: false,
      label: "No of Quotes",
      width: 200,
    },

    {
      id: "pending_bids",
      numeric: false,
      label: "Pending Quotes",
      width: 200,
    },
    {
      id: "completed_bids",
      numeric: false,
      label: "Completed Quotes",
      width: 200,
    },

    {
      id: "status",
      numeric: false,
      label: "Status",
      width: 280,
    },
  ];

  useEffect(() => {
    let tempData = [];
    const getData = () => {
      data?.map((row, index) => {
        const totalBids = allBidForUser(row.userId).allBid;
        const pendingBids = allBidForUser(row.userId).pendingBids;
        const acceptedBids = allBidForUser(row.userId).acceptedBids;
        const newRow = {
          sno: index + 1,
          appraiser_company: 
          <span onClick={()=>openViewModal(row)} style={{textDecoration:"underline",color:"blueviolet",cursor:"pointer"}}>{row.firstName} {row.lastName}</span>,
          bids: totalBids,
          pending_bids: pendingBids,
          completed_bids: acceptedBids,
          status: row.firstName ? (
            <span className="btn btn-success  w-100">Active</span>
          ) : (
            <span className="btn btn-danger  w-100">In-Active </span>
          ),
        };

        tempData.push(newRow);
      });
      return tempData;
    };
    const resultedArray = getData();
    setUpdatedCode(resultedArray);
  }, [data, allBids]);

  const allBidForUser = (id) => {
    let allBid = 0,
      acceptedBids = 0;
    allBids?.map((bid, index) => {
      if (String(bid.appraiserUserId) === String(id)) {
        allBid += 1;
        if (bid.status === 1) {
          acceptedBids += 1;
        }
      }
    });
    const pendingBids = allBid - acceptedBids;
    return { allBid, pendingBids, acceptedBids };
  };

  const openViewModal = (user)=>{
    setBroker(user)
    setOpenBrokerModal(true)
  }

  const refreshHandler = () => {
    setRefresh(true);
  };

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
