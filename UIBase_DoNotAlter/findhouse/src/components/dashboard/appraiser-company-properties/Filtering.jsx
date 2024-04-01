const Filtering = ({setFilterQuery}) => {
  return (
    <select className="selectpicker show-tick form-select c_select" onChange={(e)=>setFilterQuery(e.target.value)}>
    <option>All</option>
      <option>Last 30 Days</option>
      <option>Last 3 months</option>
    </select>
  );
};

export default Filtering;
