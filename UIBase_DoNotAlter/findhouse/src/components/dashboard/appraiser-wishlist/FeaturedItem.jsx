import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "../appraiser-properties/Modal";
import Exemple from "./Exemple";

const FeaturedItem = ({user , data , setReload , allWishlistedProperties,setModalIsOpenError,setErrorMessage}) => {

  console.log(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [lowRangeBid , setLowRangeBid] = useState("");
  const [propertyId , setPropertyId] = useState(null);

  const openModal = (val,bid) => {
    setPropertyId(val);
    setLowRangeBid(bid);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
 
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

  // keyword filter
  const keywordHandler = (item) =>
    item.community.toLowerCase().includes(keyword?.toLowerCase())||
    item.city.toLowerCase().includes(keyword?.toLowerCase())||
    item.area.toLowerCase().includes(keyword?.toLowerCase())||
    item.typeOfBuilding.toLowerCase().includes(keyword?.toLowerCase())||
    item.state.toLowerCase().includes(keyword?.toLowerCase())||
    item.streetNumber.toLowerCase().includes(keyword?.toLowerCase())||
    item.streetName.toLowerCase().includes(keyword?.toLowerCase());


  // location handler
  const locationHandler = (item) => {
    item.city.toLowerCase().includes(keyword?.toLowerCase())||
    item.area.toLowerCase().includes(keyword?.toLowerCase())||
    item.state.toLowerCase().includes(keyword?.toLowerCase())||
    item.streetNumber.toLowerCase().includes(keyword?.toLowerCase())||
    item.streetName.toLowerCase().includes(keyword?.toLowerCase());
  };

  // status handler
  const statusHandler = (item) =>
  item.community.toLowerCase().includes(keyword?.toLowerCase())||
  item.typeOfBuilding.toLowerCase().includes(keyword?.toLowerCase());

  // properties handler
  const propertiesHandler = (item) =>
  item.community.toLowerCase().includes(keyword?.toLowerCase())||
  item.typeOfBuilding.toLowerCase().includes(keyword?.toLowerCase());

  // price handler
  const priceHandler = (item) =>
    item.bidLowerRange < price?.max && item.bidUpperRange > price?.min;

  // bathroom handler
  const bathroomHandler = (item) => {
    if (bathrooms !== "") {
      return item.itemDetails[1].number == bathrooms;
    }
    return true;
  };

  // bedroom handler
  const bedroomHandler = (item) => {
    if (bedrooms !== "") {
      return item.itemDetails[0].number == bedrooms;
    }
    return true;
  };

  // garages handler
  const garagesHandler = (item) =>
    garages !== ""
      ? item.garages?.toLowerCase().includes(garages.toLowerCase())
      : true;

  // built years handler
  const builtYearsHandler = (item) =>
    yearBuilt !== "" ? item?.built == yearBuilt : true;

  // area handler
  const areaHandler = (item) => {
    if (area.min !== 0 && area.max !== 0) {
      if (area.min !== "" && area.max !== "") {
        return (
          parseInt(item.itemDetails[2].number) > area.min &&
          parseInt(item.itemDetails[2].number) < area.max
        );
      }
    }
    return true;
  };

  // advanced option handler
  const advanceHandler = (item) => {
    if (amenities.length !== 0) {
      return amenities.find((item2) =>
        item2.toLowerCase().includes(item.amenities.toLowerCase())
      );
    }
    return true;
  };

  // status filter
  const statusTypeHandler = (a, b) => {
    if (statusType === "recent") {
      return a.created_at + b.created_at;
    } else if (statusType === "old") {
      return a.created_at - b.created_at;
    } else if (statusType === "all-status") {
      return a.created_at + b.created_at;
    }
  };

  // featured handler
  const featuredHandler = (item) => {
    if (featured !== "") {
      if (featured === "featured-all") {
        return item;
      }
      return item.featured === featured;
    }
    return true;
  }; 

  const removeFromWishlist = (id)=>{
 
    const getId = allWishlistedProperties.filter((item,index)=>{
     if(item.userId === user.userId && item.propertyId === id){
      return true;
     }
     else{
      return false;
     }
    });

    toast.loading("removing this property from wishlist");
    
    axios.delete("/api/removeWishlistProperty",
    {
     headers: {
       Authorization:`Bearer ${user?.token}`,
       "Content-Type":"application/json"
     },
     params : {
      userId : getId[0]?.id
     }
   })
   .then((res) => {
    toast.dismiss();
    toast.success("Successfully removed");
    setReload(true);
   })
   .catch((err) => {
    toast.dismiss();
     toast.error(err?.response?.data?.error);
   });
    
  }

  let content = data
    ?.filter(keywordHandler)
    .map((item) => {
      return <div className="col-md-6" key={item.id}>
        <div className="feat_property home7 style4">
          <div className="thumb">
            {/* <Image
              width={342}
              height={220}
              className="img-whp w-100 h-100 cover"
              src={item.img}
              alt="fp1.jpg"
            /> */}
            <div className="thmb_cntnt">
              {/*<ul className="tag mb0">
                {item.saleTag.map((val, i) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">{val}</a>
                  </li>
                ))}
                </ul>*/}
              <ul className="icon mb0">
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-transfer-1"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <span className="flaticon-heart"></span>
                  </a>
                </li>
              </ul>

              <Link
                href={`/listing-details-v1/${item.id}`}
                className="fp_price"
              >
                ${item.bidLowerRange} - ${item.bidUpperRange}
                <small>/mo</small>
              </Link>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <p className="text-thm">{item.typeOfBuilding}</p>
              <h4>
                <Link href={`/listing-details-v1/${item.id}`}>
                  {item.community}
                </Link>
              </h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.area} {item.city} {item.state} {item.zipCode}
              </p>

              {/*<ul className="prop_details mb0">
                {item.itemDetails.map((val, i) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">
                      {val.name}: {val.number}
                    </a>
                  </li>
                ))}
                </ul>*/}
            </div>
            {/* End .tc_content */}
            <Modal
            modalOpen={modalOpen}
            closeModal={closeModal}
            lowRangeBid = {lowRangeBid}
            propertyId={propertyId}
          />

            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  {/* <Link href="/agent-v1">
                    <Image
                      width={40}
                      height={40}
                      src={item.posterAvatar}
                      alt="pposter1.png"
                    />
                  </Link> */}
                </li>
                <li className="list-inline-item" style={{width:"50%"}}>
                  {/* <Link href="/agent-v1">{item.posterName}</Link> */}
                  <button onClick={()=>removeFromWishlist(item.propertyId)}>Remove</button>
                </li>
              </ul>
              {/* <div className="fp_pdate float-end">{item.postedYear}</div> */}
              <div className="fp_pdate float-end mt-1 fw-bold"><button onClick={()=>openModal(item.propertyId,item.bidLowerRange)} className="text-color">Provide Quote</button></div>
            </div>
            {/* End .fp_footer */}
          </div>
        </div>
      </div>
                });

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(data.length));
  }, [dispatch, data]);
  return <>
  <Exemple   onWishlistHandler ={openModal} removeFromWishlist={removeFromWishlist} setModalIsOpenError={setModalIsOpenError} setErrorMessage={setModalIsOpenError}/></>;
};

export default FeaturedItem;
