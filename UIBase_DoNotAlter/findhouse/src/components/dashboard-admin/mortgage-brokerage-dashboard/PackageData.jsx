import axios from "axios";
import toast from "react-hot-toast";

const SearchData = ({ data, properties }) => {


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
          <th scope="col">Brokerage Name</th>
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
                  <td>lite</td>
                  <td>{allPropertiesForUser(item.userId)}</td>
                  
                  <td>
                    {item.firstName ? (
                      <span className="btn btn-success  w-100">Active</span>
                    ) : (
                      <span className="btn btn-danger  w-100">In-Active </span>
                    )}
                  </td>
                  <td>xx-yy-zzzz</td>
                </tr>
              );
            })
          : ""}
      </tbody>
    </table>
  );
};

export default SearchData;
