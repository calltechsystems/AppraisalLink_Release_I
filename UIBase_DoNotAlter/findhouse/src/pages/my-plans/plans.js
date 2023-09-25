import { useState } from "react";
import Header from "../../components/common/header/dashboard/Header";
import MobileMenu from "../../components/common/header/MobileMenu";
import Pricing from "./pricing";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu";

const Index = ({ setModalOpen, setPrice }) => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [isHovered, setIsHovered] = useState(false);

  const togglePlan = () => {
    setSelectedPlan(selectedPlan === "Monthly" ? "Yearly" : "Monthly");
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const spanStyle = {
    marginLeft: '90%',
    color: isHovered ? 'black' : '', // Apply color when hovered
    fontWeight:"bold"
  };

  const spanStyle2 = {
    marginLeft: '120%',
    color: isHovered ? 'black' : '', // Apply color when hovered
    fontWeight:"bold"
  };
  return (
    <>
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
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
        className="our-dashbord dashbord bgc-f7 pb50"
        style={{ marginLeft: "" }}
      >
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 col-lg-6 maxw100flex-992">
              <div className="main-title text-center">
                <h2 className="text-dark">Ready to get started?</h2>
                <p className="text-dark">
                  Choose a plan tailored to your needs {selectedPlan}
                </p>
                <div className="toggleContainer">
                  <label className="toggleLabel">
                   
                    <input
                      type="radio"
                      name="planToggle"
                      value="Monthly"
                      checked={selectedPlan === "Monthly"}
                      onChange={togglePlan}
                    />
                    <span className="toggleSwitch"></span>
                    <span style={spanStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>Monthly</span>
                  </label>
                  <label className="toggleLabel">
                    
                    <input
                      type="radio"
                      name="planToggle"
                      value="Yearly"
                      checked={selectedPlan === "Yearly"}
                      onChange={togglePlan}
                    />
                    <span className="toggleSwitch"></span>
                    <span style={spanStyle2}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>Yearly</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Pricing
              isPlan={selectedPlan === "Monthly" ? 1 : 2}
              setModalOpen={setModalOpen}
              setPrice={setPrice}
            />
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default Index;
