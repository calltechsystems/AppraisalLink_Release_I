import { useState } from "react";
import Header from "../../components/common/header/dashboard/Header";
import MobileMenu from "../../components/common/header/MobileMenu";
import Pricing from "./pricing";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu";

const Index = () => {
  //by default monthly being selected here as
  // 1-->means monthly
  // 2--> yearly
  const [isSelected, setSelected] = useState(1);

  const changePlanToMonthly = () => {
    setSelected(1);
  };

  const changePlanToYearly = () => {
    setSelected(2);
  };
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

      <section
        className="our-dashbord dashbord bgc-f7 pb50 "
        style={{ marginLeft: "" }}
      >
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 col-lg-6 maxw100flex-992">
              <div className="main-title text-center">
                <h2 className="text-dark">Ready to get started?</h2>
                <p className="text-dark">
                  Choose a plan tailored to your needs{" "}
                  {isSelected === 1 ? "Monthly" : "Yearly"}{" "}
                </p>
                <div>
                  <button
                    style={{
                      width: "120px",
                      margin: "6px",
                      borderRadius: "8px",
                      backgroundColor: "blue",
                      color: "white",
                      border: "4px solid blue", // Initial border color
                      transition: "border-color 0.3s", // Adding a smooth transition
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.border = "2px solid white"; // Change border color on hover
                      e.target.style.backgroundColor = "rgba(0, 0, 255, 0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.border = "2px solid blue";
                      e.target.style.backgroundColor = "blue";
                    }}
                    onClick={changePlanToMonthly}
                  >
                    Monthly
                  </button>
                  <button
                    style={{
                      width: "120px",
                      margin: "6px",
                      borderRadius: "8px",
                      backgroundColor: "blue",
                      color: "white",
                      border: "2px solid blue", // Initial border color
                      transition: "border-color 0.3s", // Adding a smooth transition
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.border = "2px solid white"; // Change border color on hover
                      e.target.style.backgroundColor = "rgba(0, 0, 255, 0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.border = "2px solid blue";
                      e.target.style.backgroundColor = "blue";
                    }}
                    onClick={changePlanToYearly}
                  >
                    Yearly
                  </button>
                </div>
                {/* <div class="form-switch mt-2">
                  <label className="form-check-label" for="flexSwitchCheckDefault">Monthly</label>
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                  <label className="form-check-label" for="flexSwitchCheckDefault">Yearly</label>
                </div> */}
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Pricing isPlan={isSelected} />
            {/* <Pricing hideButton={false}/> */}
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default Index;
