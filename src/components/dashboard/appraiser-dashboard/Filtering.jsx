import { FaRedo } from "react-icons/fa";

const Filtering = ({ setRefresh }) => {
  const refreshHandler = () => {
    setRefresh(true);
  };
  return (
    <>
      <div className="col=lg-12">
        <div className="row">
          <div className="col-lg-9">
            <select className="selectpicker show-tick form-select c_select">
              <option value={"Monthly"}>Monthly</option>
              <option value={"Weekly"}>Weekly</option>
              <option value={"Yearly"}>Yearly</option>
            </select>
          </div>
          <div className="col-lg-3">
            <button
              className="btn btn-color w-100 mt-2"
              onClick={refreshHandler}
              title="Refresh"
            >
              <FaRedo />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filtering;
