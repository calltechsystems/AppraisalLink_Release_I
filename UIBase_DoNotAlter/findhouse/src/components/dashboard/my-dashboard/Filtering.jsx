const Filtering = () => {
    return (
      <select className="selectpicker show-tick form-select c_select">
        <option value={"weekly"}>Weekly</option>
        <option value={"Monthly"}>Monthly</option>
        <option value={"Yearly"}>Yearly</option>
      </select>
    );
  };
  
  export default Filtering;