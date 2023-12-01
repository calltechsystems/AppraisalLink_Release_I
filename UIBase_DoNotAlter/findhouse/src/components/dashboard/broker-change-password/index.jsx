import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu_02";
import ChangePassword from "./ChangePassword";

const Index = () => {
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
                        <i className="fa fa-bars pr10"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12">
                  <div className="breadcrumb_content style2">
                    <h3 className="breadcrumb_title">Change Password</h3>
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      {/* <div className="col-xl-2">
                        <h4>Personal Information</h4>
                      </div> */}
                      <div className="col-xl-12">
                        <ChangePassword />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      &copy; {new Date().getFullYear()} Appraisal Link. All
                      Rights Reserved.
                    </p>
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
