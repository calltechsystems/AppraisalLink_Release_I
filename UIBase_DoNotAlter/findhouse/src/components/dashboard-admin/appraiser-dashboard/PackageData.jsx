const SearchData = ({data,allBids}) => {

  
  const allBidForUser = (id)=>{
    let allBid = 0, acceptedBids = 0;
    allBids?.map((bid,index)=>{
      if(String(bid.appraiserUserId) === String(id)){
        allBid += 1;
        if(bid.status === 1){
          acceptedBids +=1;
        }
      }
    })

    const pendingBids = allBid - acceptedBids;
    return {allBid,pendingBids,acceptedBids}
  }
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Appraiser Name</th>
          <th scope="col">No. of Bids</th>
          <th scope="col">Pending Bids</th>
          <th scope="col">Completed Bids</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      {/* End thead */}

      <tbody>
        
        { data ? data.map((item,index)=>{
          return <tr key={index}>
          <th scope="row">{index + 1 }</th>
          <td>{`${item.firstName} ${item.lastName}`}</td>
          <td>{allBidForUser(item.userId).allBid}</td>
          <td>{allBidForUser(item.userId).pendingBids}</td>
          <td>{allBidForUser(item.userId).acceptedBids}</td>
          <td>{
          item.firstName ? (
            <span className="btn btn-success  w-100">Active</span>
          ) : (
            <span className="btn btn-danger  w-100">In-Active </span>
          )}</td>
        </tr> 
        }) : ""}
          
       
      </tbody>
    </table>
  );
};

export default SearchData;
