import Header from "../../common/header/dashboard/Header_02";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu_01";
import PackageData from "./PackageData";
import { useState } from "react";

const Index = () => {

  const [show , setShow] = useState(true);

  const [modalIsOpenError , setModalIsOpenError] = useState(false);
  const [errorMessage , setErrorMessage ] = useState("");

  const closeErrorModal =()=>{
    setModalIsOpenError(false);
  }
  

  

  
  const onClickHandler = ()=>{
    setShow(false);
  }
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
              </div>
              {/* End .row */}

              <div className="row align-items-center">
                <div className="col-md-8 col-lg-8 col-xl-9 ">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Biding History</h2>
                    {/* <p>You can see your transactions history here!</p> */}
                  </div>
                </div>
                {/* End .col */}
                <div className="col-md-4 col-lg-4 col-xl-3 mb20">
                  <ul className="sasw_list mb0">
                    <li className="search_area">
                      {/* <SearchBox /> */}
                    </li>
                  </ul>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="col-lg-12">
                      <div className="packages_table">
                        <div className="table-responsive mt0">
                          <PackageData setModalIsOpenError={setModalIsOpenError} setErrorMessage={setErrorMessage}/>
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
                      </div>
                      {/* End .packages_table */}

                      {/* <div className="pck_chng_btn text-end">
                        <button className="btn btn-lg">
                          Update Package
                        </button>
                      </div> */}
                    </div>
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
