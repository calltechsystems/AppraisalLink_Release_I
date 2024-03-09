import { FaRedo } from "react-icons/fa";

const Filtering = ({ setRefresh }) => {
  const refreshHandler = () => {
    setRefresh(true);
  };
  return (
    <>
      <div className="row mb-2">
        <div className="col-lg-8">
          <select className="selectpicker show-tick form-select c_select">
            <option value={"Monthly"}>Monthly</option>
            <option value={"Weekly"}>Weekly</option>
            <option value={"Yearly"}>Yearly</option>
          </select>
        </div>
        <div className="col-lg-4 mt-1">
          <button
            className="btn btn-color w-100 "
            onClick={refreshHandler}
            title="Refresh"
          >
            <FaRedo />
          </button>
        </div>
      </div>
    </>
  );
};

export default Filtering;
