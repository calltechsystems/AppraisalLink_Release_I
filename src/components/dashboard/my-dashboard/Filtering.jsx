const Filtering = ({setFilterQuery}) => {
    return (
      <select className="selectpicker show-tick form-select c_select" onChange={(e)=>setFilterQuery(e.target.value)}>
      <option value={"Yearly"}>Yearly</option>
      <option value={"Monthly"}>Monthly</option>
        <option value={"Weekly"}>Weekly</option>
       
      </select>
    );
  };
  
  export default Filtering;