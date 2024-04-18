import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
// import properties from "../../../data/properties";
import Image from "next/image";

const FeaturedItem = ({ setModalOpen, data }) => {
  // const [data, setData] = useState([]);
  const plan = [
    {
      id: 1,
      price: "13000",
      type: "Lite ",
      title: "$11",
      location: `1421 San Pedro
  St, Los Angeles, CA 900015`,
      saleTag: ["Featured", "For Sale"],
      garages: "yes",
      itemDetails: [
        {
          name: "5 Properties Appraisal",
          // number: "1",
        },
        {
          name: "30 Days Validity",
          // number: "1",
        },
        {
          name: "No Roll Over",
          // number: "8280",
        },
        {
          name: "Limited Support",
        },
      ],
      posterAvatar: "/assets/images/property/pposter1.png",
      posterName: "Ali Tufan",
      postedYear: "1 year ago",
      imgList: [
        "/assets/images/property/2.jpg",
        "/assets/images/property/3.jpg",
        "/assets/images/property/4.jpg",
        "/assets/images/property/5.jpg",
        "/assets/images/property/6.jpg",
        "/assets/images/property/7.jpg",
      ],
      imgList2: [
        "/assets/images/property/ls2.jpg",
        "/assets/images/property/ls3.jpg",
        "/assets/images/property/ls4.jpg",
        "/assets/images/property/ls5.jpg",
      ],
      built: "2013",
      amenities: "air-conditioning",
      featured: "sale",
      created_at: 1667181268893,
    },
    {
      id: 2,
      img: "/assets/images/property/fp2.jpg",
      price: "14000",
      type: "Pro ",
      title: "$19",
      location: `1421 San Pedro
  St, Los Angeles, CA 900015`,
      saleTag: ["Featured", "For Rent"],
      garages: "no",
      itemDetails: [
        {
          name: "20 Properties Appraisal",
          // number: "1",
        },
        {
          name: "30 Days Validity",
          // number: "1",
        },
        {
          name: "Partial Roll Over",
          // number: "8280",
        },
        {
          name: "Enhance Support",
        },
      ],
      posterAvatar: "/assets/images/property/pposter2.png",
      posterName: "Ali Tufan",
      postedYear: "1 year ago",
      imgList: [
        "/assets/images/property/2.jpg",
        "/assets/images/property/3.jpg",
        "/assets/images/property/4.jpg",
        "/assets/images/property/5.jpg",
        "/assets/images/property/6.jpg",
        "/assets/images/property/7.jpg",
      ],
      imgList2: [
        "/assets/images/property/ls2.jpg",
        "/assets/images/property/ls3.jpg",
        "/assets/images/property/ls4.jpg",
        "/assets/images/property/ls5.jpg",
      ],
      built: "2014",
      amenities: "barbeque",
      featured: "rent",
      created_at: 1667181256361,
    },
    {
      id: 3,
      img: "/assets/images/property/fp3.jpg",
      price: "13000",
      type: "Ultimate ",
      title: "$35",
      location: `1421 San Pedro
  St, Los Angeles, CA 900015`,
      saleTag: ["Featured", "For Rent"],
      garages: "others",
      itemDetails: [
        {
          name: "50 Properties Appraisal",
          // number: "1",
        },
        {
          name: "30 Days Validity",
          // number: "1",
        },
        {
          name: "Unlimited Roll Over",
          // number: "8280",
        },
        {
          name: "Complete Support",
        },
      ],
      posterAvatar: "/assets/images/property/pposter3.png",
      posterName: "Ali Tufan",
      postedYear: "1 year ago",
      imgList: [
        "/assets/images/property/2.jpg",
        "/assets/images/property/3.jpg",
        "/assets/images/property/4.jpg",
        "/assets/images/property/5.jpg",
        "/assets/images/property/6.jpg",
        "/assets/images/property/7.jpg",
      ],
      imgList2: [
        "/assets/images/property/ls2.jpg",
        "/assets/images/property/ls3.jpg",
        "/assets/images/property/ls4.jpg",
        "/assets/images/property/ls5.jpg",
      ],
      built: "2015",
      amenities: "gym",
      featured: "sale",
      created_at: 1667181247152,
    },
  ];
  const {
    keyword,
    location,
    status,
    propertyType,
    price,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
    area,
    amenities,
  } = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  // status handler
  let content = data?.map((item) => (
    <div className="col-md-4" key={item.id}>
      <div className="feat_property home7 style4">
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
                <span className="fs-6">{item.noOfProperties} Properties Appraisal</span>
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
              onClick={() => setModalOpen()}
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
