import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
// import properties from "../../../data/properties";
import Image from "next/image";

const FeaturedItem = ({ setEditPlan, editPlan, setModalOpen, data }) => {
  // const [data, setData] = useState([]);

  const {} = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  const openEditPlanModal = (plan) => {
    setEditPlan(plan)
    setModalOpen(true)
  };

  // status handler
  let content = data?.map((item) => (
    <div className="col-md-4" key={item.id}>
      <div className="pricing_table">
        <div className="details">
          <div className="tc_content" style={{ textAlign: "center" }}>
            <p
              className="text-thm mb-4"
              style={{ fontSize: "23px", fontWeight: "bold", color: "" }}
            >
              {item.type}
            </p>
            <h3>
              <Link href={`/listing-details-v1/${item.id}`} className="fw-bold">
                {item.planName}
              </Link>
            </h3>

            <h2>
              <Link href={`/listing-details-v1/${item.id}`} className="fw-bold">
                {item.amount}
              </Link>
            </h2>
            <ul>
              <li>
                <span className="fs-6">
                  {item.noOfProperties} Properties Appraisal
                </span>
              </li>
            </ul>

            {/* <ul className=" mb0">
              {data?.map((val, i) => (
                <li className="" key={i}>
                  <a href="#">{val.name}</a>
                </li>
              ))}
            </ul> */}
          </div>

          <div className="fp_footer text-center">
            <div
              className="fp_pdate float-center btn btn-color w-50"
              onClick={() => openEditPlanModal(item)}
            >
              <a href="#" className="text-light">
                Edit Plan
              </a>
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content.length));
  }, [dispatch, content]);
  return <>{content}</>;
};

export default FeaturedItem;
