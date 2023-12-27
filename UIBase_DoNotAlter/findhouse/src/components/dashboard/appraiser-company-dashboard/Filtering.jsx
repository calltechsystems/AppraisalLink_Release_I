import { FaRedo } from "react-icons/fa";

const Filtering = ({setRefresh}) => {

  const refreshHandler = ()=>{
    setRefresh(true);
  }
    return (
      <>
      <select className="selectpicker show-tick form-select c_select">
        <option value={"Monthly"}>Monthly</option>
        <option value={"Weekly"}>Weekly</option>
        <option value={"Yearly"}>Yearly</option>
      </select>
      <button
        className="btn btn-color w-25 h-10 m-1"
        onClick={refreshHandler}
        title="Refresh"
      >
        <FaRedo />
      </button>
    </>
    );
  };
  
  export default Filtering;