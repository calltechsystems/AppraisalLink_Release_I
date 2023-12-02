import Header from "../../common/header/dashboard/Header_02";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu_01";
import TableData from "./TableData";
import Filtering from "./Filtering";
import FilteringBy from "./FilteringBy";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Modal from "./Modal";
import { encryptionData } from "../../../utils/dataEncryption";
import Loader from "./Loader";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult , setSearchResult] = useState([]);
  const [property, setProperty] = useState("");
  const [filterProperty, setFilterProperty] = useState("");
  const [filterQuery, setFilterQuery] = useState("Last 30 Days");
  const [searchQuery, setSearchQuery] = useState("city");
  const [properties, setProperties] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [lowRangeBid , setLowRangeBid] = useState("");
  const [propertyId , setPropertyId] = useState(null);
  const [updatedCode,setUpdatedCode]=useState(false);

  const [modalIsOpenError , setModalIsOpenError] = useState(false);
  const [errorMessage , setErrorMessage ] = useState("");

  const [isLoading,setIsLoading]=useState(true);

  const [reload,setReload] = useState(false);

  const closeErrorModal =()=>{
    setModalIsOpenError(false);
  }
  const router = useRouter();

  const openModal = (property) => {
    setProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(()=>{
    setReload(false);
  },[reload]);

  useEffect(() => {
    const filterProperties = (propertys, searchInput) => {
      if (searchInput === "") {
        return propertys;
      }
      const filteredProperties = propertys.filter((property) => {
        // Convert the search input to lowercase for a case-insensitive search
        const searchTerm = searchInput.toLowerCase();

        // Check if any of the fields contain the search term
        return (
          property.zipCode.toLowerCase().includes(searchTerm) ||
          property.area.toLowerCase().includes(searchTerm) ||
          property.city.toLowerCase().includes(searchTerm) ||
          property.state.toLowerCase().includes(searchTerm) ||
          property.streetName.toLowerCase().includes(searchTerm) ||
          property.streetNumber.toLowerCase().includes(searchTerm) ||
          property.typeOfBuilding.toLowerCase().includes(searchTerm)
        );
      });

      return filteredProperties;
    };
    const filteredData = filterProperties(properties, searchInput);
    setFilterProperty(filteredData);
  }, [searchInput]);

  const filterData = (tempData) => {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    switch (filterQuery) {
      case "Last 30 Days":
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= thirtyDaysAgo
        );
      case "Last 1 month":
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneMonthAgo
        );
      case "Last 6 months":
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= sixMonthsAgo
        );
      case "Last 1 year":
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneYearAgo
        );
      default:
        return tempData; // Return all data if no valid timeFrame is specified
    }
  };

  useEffect(() => {
    const tmpData = filterData(properties);
    setProperties(tmpData);
  }, [filterQuery]);

  const handleDelete = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    toast.loading("deleting this property");
    axios
      .delete("/api/deleteBrokerPropertyById", {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        params: {
          propertyId: property.propertyId,
        },
      })
      .then((res) => {
        setRerender(true);
      })
      .catch((err) => {
        toast.error(err);
      });
    toast.dismiss();
    closeModal();
  };

  useEffect(()=>{
    
    setIsLoading(false);
    
  },[updatedCode]);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      router.push("/login");
    } else if (!data?.brokerage_Details.firstName) {
      router.push("/appraiser-profile");
    }
    if (!data) {
      router.push("/login");
    }
    const fetchData = () => {
      if (data) {
        setUserData(data);
      }
    };
    fetchData();
  }, []);


  const participateHandler = (val , id)=>{
    setLowRangeBid(val);
    setPropertyId(id);
    setModalOpen(true);
  }

  const onWishlistHandler = (id) =>{

    

    const userData = JSON.parse(localStorage.getItem("user"));

    const formData = {
      userId : userData.userId,
      propertyId : id,
      token : userData.token
    }

    const payload = encryptionData(formData);

    toast.loading("Setting this property into your wishlist");
    axios.post("/api/addToWishlist",payload)
    .then((res) => {
      toast.dismiss();
      toast.success("Successfully added !!! ");
      router.push("/appraiser-wishlisted");
     
    })
    .catch((err) => {
      toast.dismiss();
      toast.error(err?.response?.data?.error);
    });
    
  }

  useEffect(()=>{
    console.log(searchQuery);
   const tempData = properties;
   if(searchInput === ""){
    return ;
   }
   else if(searchQuery === "city"){
      const newProperties = tempData.filter((item)=>{
        if(item.city.toLowerCase() === searchInput.toLowerCase()){
          return true;
        }
        else {
          return false
        }
        
      })
      setSearchResult(newProperties);
   }
   else if(searchQuery === "state"){
    const newProperties = tempData.filter((item)=>{
      if(item.state.toLowerCase() === searchInput.toLowerCase()){
        return true;
      }
      else {
        return false
      }
      
    })
    setSearchResult(newProperties);
   }
   else{
    const newProperties = tempData.filter((item)=>{
      if(item.zipCode.toLowerCase() === searchInput.toLowerCase()){
        return true;
      }
      else {
        return false
      }
      
    })
    setSearchResult(newProperties);
   }
  },[searchInput]);

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
        <div
          className="container-fluid ovh"
          style={{ marginLeft: "-10px", marginTop: "" }}
        >
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

                {/* <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">My Properties</h2>
                    <p>We are glad to see you again!</p>                                                            
                  </div>
                </div> */}
                {/* End .col */}

                <div className="col-lg-12 col-xl-12">
                  <div className="candidate_revew_select style2 mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <Filtering setFilterQuery={setFilterQuery} />
                      </li>
                      <li className="list-inline-item">
                      <FilteringBy setFilterQuery={setSearchQuery} />
                      </li>
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox setSearchInput={setSearchInput} />
                        </div>
                      </li>
                      {/* End li */}

                      {/* <li className="list-inline-item">
                        <Filtering setFilterQuery={setFilterQuery} />
                      </li> */}
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                      {isLoading ? <Loader/> : 
                        <TableData
                          userData={userData}
                          setModalOpen={openModal} 
                          close={closeModal} 
                          setProperties={setProperties}
                          properties={
                            searchInput === "" ? properties : filterProperty
                          }
                          setUpdatedCode={setUpdatedCode}
                          onWishlistHandler={onWishlistHandler}
                          participateHandler={participateHandler}
                          setErrorMessage={setErrorMessage}
                          setModalIsOpenError={setModalIsOpenError}
                          setReload = {setReload}
                          reload={reload}
                        />}
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
                      
                      {/* End .table-responsive */}

                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>

              <Loader/>

              <div className="row">
              
              <Modal
                modalOpen={modalOpen}
                closeModal={closeModal}
                lowRangeBid = {lowRangeBid}
                propertyId={propertyId}
              />
            </div>
              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination
                      properties={properties}
                      setProperties={setProperties}
                    />
                  </div>
                </div>
                {/* End paginaion .col */}
              </div>
              {/* End .row */}
            </div>
            {/* End .row */}

            <div className="row mt50">
              <div className="col-lg-12">
                <div className="copyright-widget text-center">
                  <p>© 2020 Find House. Made with love.</p>
                </div>
              </div>
            </div>
            {/* End .col */}
          
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
