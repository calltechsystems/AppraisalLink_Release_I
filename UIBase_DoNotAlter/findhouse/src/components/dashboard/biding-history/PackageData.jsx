const SearchData = () => {
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Date</th>
          <th scope="col">Property Details</th>
          <th scope="col">Bid Amount</th>
          <th scope="col">Proposed Amount</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      {/* End thead */}

      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>December 31, 2020</td>
          <td>0</td>
          <td>3</td>
          <td>8</td>
          <td>
            {" "}
            <span className="status_tag badge">Pending</span>
          </td>
        </tr>
        {/* End tr */}

        <tr>
          <th scope="row">2</th>
          <td>December 31, 2020</td>
          <td>0</td>
          <td>3</td>
          <td>8</td>
          <td>
            {" "}
            <span className="status_tag badge2">Completed</span>
          </td>
        </tr>
        {/* End tr */}
      </tbody>
    </table>
  );
};

export default SearchData;
