import { useEffect } from "react";
import Header from "../../common/header/dashboard/Header_02";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu_01";
import PackageData from "./PackageData";
import { useState } from "react";
import Loader from "../appraised-properties/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const [show, setShow] = useState(true);

  const [modalIsOpenError, setModalIsOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedCode, setUpdatedCode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const closeErrorModal = () => {
    setModalIsOpenError(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [updatedCode]);

  const onClickHandler = () => {
    setShow(false);
  };

  const router = useRouter();

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
    };
  }, []);

  useEffect(() => {
    // Check for inactivity every minute
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;

      // Check if there has been no activity in the last 10 minutes (600,000 milliseconds)
      if (timeSinceLastActivity > 600000) {
        localStorage.removeItem("user");
        router.push("/login");
      }
    }, 60000); // Check every minute

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);
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
                    <li className="search_area">{/* <SearchBox /> */}</li>
                  </ul>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12">
                  <div className="">
                    <div className="col-lg-12">
                      <div className="packages_table">
                        <div className="table-responsive mt0">
                          {isLoading ? (
                            <Loader />
                          ) : (
                            <PackageData
                              setModalIsOpenError={setModalIsOpenError}
                              setErrorMessage={setErrorMessage}
                              setUpdatedCode={setUpdatedCode}
                            />
                          )}
                          {modalIsOpenError && (
                            <div className="modal">
                              <div
                                className="modal-content"
                                style={{
                                  borderColor: "orangered",
                                  width: "20%",
                                }}
                              >
                                <h3
                                  className="text-center"
                                  style={{ color: "orangered" }}
                                >
                                  Error
                                </h3>
                                <div
                                  style={{
                                    borderWidth: "2px",
                                    borderColor: "orangered",
                                  }}
                                >
                                  <br />
                                </div>
                                <h5 className="text-center">{errorMessage}</h5>
                                <div
                                  className="text-center"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <button
                                    className="btn w-35 btn-white"
                                    onClick={() => closeErrorModal()}
                                    style={{
                                      borderColor: "orangered",
                                      color: "orangered",
                                    }}
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
