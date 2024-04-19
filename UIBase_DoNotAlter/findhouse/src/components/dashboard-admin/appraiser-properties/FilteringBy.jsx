const FilteringBy = ({ filterQuery, setFilterQuery }) => {
  return (
    <select
      className="selectpicker show-tick form-select c_select"
      value={filterQuery}
      onChange={(e) => setFilterQuery(e.target.value)}
    >
      <option value={"0"}>Search By Status</option>
      <option value={"1"}>Accepted</option>
      <option value={"2"}>Completed</option>
      <option value={"3"}>Quote Provided</option>
      <option value={"1"}>In Progress</option>
      <option value={"2"}>Cancelled</option>
      <option value={"3"}>On Hold</option>
    </select>
  );
};

export default FilteringBy;
