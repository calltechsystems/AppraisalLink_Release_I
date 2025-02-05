import toast from "react-hot-toast";
import { FaRedo } from "react-icons/fa";

const Filtering = ({ setRefresh, FilterQuery, setFilterQuery }) => {
  const refreshHandler = () => {
    setRefresh(true);
  };
  return (
    <>
      <div className="col=lg-12 pb-1 pt-1">
        <div className="row">
          <div className="col-lg-9">
            <select
              className="selectpicker show-tick form-select c_select"
              value={FilterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            >
              <option value={"All"}>All</option>
              <option value={"Weekly"}>Last 7 Days</option>
              <option value={"Monthly"}>Last 30 Days</option>
              <option value={"Yearly"}>Last 90 Days</option>
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
