const FilteringBy = ({setFilterQuery}) => {
    return (
      <select className="selectpicker show-tick form-select c_select" onChange={(e)=>setFilterQuery(e.target.value)}>
        <option>Search By City</option>
        <option>Search By Appraiser</option>
        <option>Search By Status</option>
        {/* <option>Search By </option> */}
      </select>
    );
  };
  
  export default FilteringBy;
  