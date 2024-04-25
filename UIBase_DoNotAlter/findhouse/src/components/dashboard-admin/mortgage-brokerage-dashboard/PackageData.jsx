import axios from "axios";
import toast from "react-hot-toast";

const SearchData = ({ data, properties }) => {
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

    // Adjust for Eastern Standard Time (EST) by subtracting 5 hours
    const estDate = new Date(originalDate.getTime() - 5 * 60 * 60 * 1000);

    // Format the EST date
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
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Broker Name</th>
          <th scope="col">Active Plan</th>
          <th scope="col">No. of Appraised Properties</th>
          <th scope="col">Status</th>
          <th scope="col">Plan Expiry Date</th>
        </tr>
      </thead>
      {/* End thead */}

      <tbody>
        {data
          ? data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{`${item.firstName} ${item.lastName}`}</td>
                  <td>{item.planName}</td>
                  <td>{allPropertiesForUser(item.userId)}</td>

                  <td>
                    {item.firstName ? (
                      <span className="btn btn-success  w-100">Active</span>
                    ) : (
                      <span className="btn btn-danger  w-100">In-Active </span>
                    )}
                  </td>
                  <td>{formatDate(item.endDate)}</td>
                </tr>
              );
            })
          : ""}
      </tbody>
    </table>
  );
};

export default SearchData;
