import Header from "../../common/header/dashboard/Header_02";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu_01";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import BreadCrumb2 from "./BreadCrumb2";
import FeaturedItem from "./FeaturedItem";
import FilterTopBar from "../../common/listing/FilterTopBar";
import ShowFilter from "../../common/listing/ShowFilter";
import SidebarListing from "../../common/listing/SidebarListing";
import GridListButton from "../../common/listing/GridListButton";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ErrorModal from "../../common/popUpModal/errorModal/index";

const Index = () => {

  const [properties , setProperties ] = useState([]);

  const [allWishlistedProperties , setAllWishlistedProperties] = useState([]);
  const [reload , setReload] = useState(false);
  const [allProperties,setAllProperties] = useState([]);

  const [modalIsOpenError , setModalIsOpenError] = useState(false);
  const [errorMessage , setErrorMessage ] = useState("");

  const closeErrorModal =()=>{
    setModalIsOpenError(false);
  }

 

  const [show , setShow] = useState(true);

  const onClickHandler = ()=>{
    setShow(false);
  }

  let data = {};
  const router = useRouter();

  useEffect(()=>{
  data = JSON.parse(localStorage.getItem("user"));
  if (!data) {
    router.push("/login");
  } else if (!data?.brokerage_Details?.firstName) {
    router.push("/appraiser-profile");
  }
  if (!data) {
    router.push("/login");
  }

  let tempId = [];
  const func = ()=>{
    toast.loading("Getting all wishlishted properties");
  axios.get("/api/appraiserWishlistedProperties",
  {
   headers: {
     Authorization:`Bearer ${data?.token}`,
     "Content-Type":"application/json"
   }
 })
 .then((res) => {
  toast.dismiss();
  const tempData = res.data.data.$values;
  setAllWishlistedProperties(res.data.data.$values);
  const responseData = tempData.filter((prop,index)=>{
    if(prop.userId === data.userId){
      return true;
    }
    else{
      return false;
    }
  })
  tempId =responseData;
  toast.success("Successfully fteched ");
  console.log(tempData); 
  setProperties(responseData);
 })
 .catch((err) => {
  toast.dismiss();
   setErrorMessage(err?.response?.data?.error);
   setModalIsOpenError(true);
 });
}
func();


  },[])
  
  useEffect(()=>{
    setReload(false);
  
  },[reload]);

  useEffect(()=>{
   

   
},[]);


useEffect(()=>{

  const data = JSON.parse(localStorage.getItem("user"));
  if (!data) {
    router.push("/login");
  } else if (!data?.brokerage_Details?.firstName) {
    router.push("/appraiser-profile");
  }
  if (!data) {
    router.push("/login");
  }
 const func2 = ()=>{
  axios
  .get("/api/getAllListedProperties", {
    headers: {
      Authorization: `Bearer ${data?.token}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    toast.dismiss();

    const tempData = res.data.data.properties.$values;
    const responseData = tempData.filter((prop) => {
      return properties.some((data) => {
        return data.propertyId === prop.propertyId;
      });
    })
    setAllProperties(responseData);
  })
  .catch((err) => {
    toast.dismiss();
    setErrorMessage(err?.response?.data?.error);
    setModalIsOpenError(true);
  });
}
func2();

  }, [properties]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                {/* <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div> */}
                {/* End Dashboard Navigation */}

                <div className="our-listing bgc-f7 pb30-991 md-mt0 ">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6">
                        <BreadCrumb2 />
                      </div>
                      {/* End .col */}

                      <div className="col-lg-6 position-relative">
                        {/* <div className="listing_list_style mb20-xsd tal-991">
                          <GridListButton />
                        </div> */}
                        {/* End list grid */}

                        <div className="dn db-991 mt100 mb0">
                          <ShowFilter />
                        </div>
                        {/* ENd button for mobile sidebar show  */}
                      </div>
                      {/* End .col filter grid list */}
                    </div>
                    {/* End Page Breadcrumb and Grid,List and filter Button */}

                    <div className="row">
                      <div className="col-md-12 col-lg-8">
                        <div className="grid_list_search_result ">
                          <div className="row align-items-center">
                            <FilterTopBar />
                          </div>
                        </div>
                        {/* End .row */}
                        {/* End .row */}

                        <div className="row">
                          <FeaturedItem user={data} data = {allProperties} setReload = {setReload} allWishlistedProperties={allWishlistedProperties}/>
                          {modalIsOpenError && (
                            <div className="modal">
                              <div className="modal-content" style={{borderColor:"orangered",width:"20%"}}>
                                <h3 className="text-center" style={{color:"orangered"}}>Error</h3>
                                <div style={{borderWidth:"2px",borderColor:"orangered"}}><br/></div>
                                <h5 className="text-center">
                                  {errorMessage}
                                </h5>
                                <div
                                  className="text-center"
                                  style={{ display: "flex", flexDirection: "column" }}
                                >
                                  
                        
                                  <button
                                    className="btn w-35 btn-white"
                                    onClick={()=>closeErrorModal()}
                                    style={{borderColor:"orangered",color:"orangered"}}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* End .row */}

                       

                        <div className="row">
                          <div className="col-lg-12 mt20">
                            <div className="mbp_pagination">
                              {/* <Pagination /> */}
                            </div>
                          </div>
                          {/* End paginaion .col */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End  page conent */}

                      <div className="col-lg-4 col-xl-4">
                        <div className="sidebar-listing-wrapper">
                          <SidebarListing />
                        </div>
                        {/* End SidebarListing */}

                        <div
                          className="offcanvas offcanvas-start offcanvas-listing-sidebar"
                          tabIndex="-1"
                          id="sidebarListing"
                        >
                          <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Advanced Search</h5>
                            <button
                              type="button"
                              className="btn-close text-reset"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            ></button>
                          </div>
                          {/* End .offcanvas-heade */}

                          <div className="offcanvas-body">
                            <SidebarListing />
                            {show && (<ErrorModal content={"Error Modal"} close={onClickHandler}/>)}
                          </div>
                        </div>
                        {/* End mobile sidebar listing  */}
                      </div>
                      {/* End sidebar conent */}
                    </div>
                    {/* End .row */}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>&copy; {new Date().getFullYear()} Appraisal Link. All Rights Reserved.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
