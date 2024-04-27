import { FaRedo } from "react-icons/fa";
const Filtering = ({ filterQuery, setFilterQuery , refreshHandler}) => {
  return (
    < div style={{display:"flex",flexDirection:"row"}}>
      <select
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
        className="selectpicker show-tick form-select p-2"
      >
        <option value={"All"}>All</option>
        <option value={"Monthly"}>Monthly</option>
        <option value={"Weekly"}>Weekly</option>
        <option value={"Yearly"}>Yearly</option>
      </select>
      <div
        className="col-lg-6 "
        onClick={() =>refreshHandler()}
        title="Refresh"
      >
        <span className="btn btn-color">
          <FaRedo
           />
        </span>
      </div>
    </div>
  );
};

export default Filtering;
