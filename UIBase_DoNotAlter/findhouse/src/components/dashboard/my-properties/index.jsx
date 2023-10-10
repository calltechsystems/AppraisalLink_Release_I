import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

const Index = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ property , setProperty] = useState("");

  const openModal = (property) => {
    setProperty(property);
    setIsModalOpen(true);
  };

  const router = useRouter();
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    const data = (JSON.parse(localStorage.getItem("user")));
    
    toast.loading("deleting this property");
    axios
      .delete("/api/deleteBrokerPropertyById",
       {
        headers: {
          Authorization:`Bearer ${data?.token}`,
          "Content-Type":"application/json"
        },
        params: {
          propertyId : property.propertyId
        }
        
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

  
  
  const [userData , setUserData ] = useState( {} );

  useEffect(() => {
    const data = (JSON.parse(localStorage.getItem("user"))) ;
    if(!data){
      router.push("/login");
    }
    const fetchData = ()=>{
      
      
      if(data){
        setUserData(data);
      }
    }
    fetchData();
  },[]);

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
                <div className="col-lg-12">
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
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">My Properties</h2>
                    {/* <p>We are glad to see you again!</p>                                                             */}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox />
                        </div>
                      </li>
                      {/* End li */}

                      <li className="list-inline-item">
                        <Filtering />
                      </li>
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData  userData = {userData} open ={openModal} close={closeModal} />
                      </div>
                      {/* End .table-responsive */}

                     
                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Confirm Deletion</h2>
                  <p>Are you sure you want to delete the property: {property.area}?</p>
                  <div style={{marginLeft:"30%"}}>
                    <button style={{marginRight:"6%",borderRadius:"8px",color:"white",backgroundColor:"red",fontSize:"22px",fontFamily:"Abhaya Libre"}} onClick={handleDelete}>Delete</button>
                    <button style={{marginRight:"6%",borderRadius:"8px",color:"black",borderColor:"darkblue",fontSize:"22px",fontFamily:"Abhaya Libre"}} onClick={closeModal}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
