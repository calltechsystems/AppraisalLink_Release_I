import React, { useEffect, useState } from "react";
import Header from "../../components/common/header/dashboard/Header";
import MobileMenu from "../../components/common/header/MobileMenu";
import Pricing from "./pricing";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu";
import axios from "axios";

const Index = ({ setModalOpen, setPrice }) => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");

  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    axios
      .get("/api/getAllPlans", {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data.$values);
        setPlanData(res.data.data.$values);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const togglePlan = () => {
    setSelectedPlan(selectedPlan === "Monthly" ? "Yearly" : "Monthly");
  };

  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
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
                  <span>Monthly</span>
                  <div style={{ width: "20%", height: "70%" }}>
                    <label
                    // className={`toggleLabel ${selectedPlan}`}
                    // onClick={togglePlan}
                    >
                      <button className="toggleSwitch"></button>

                      <div className="toggle-switch">
                        <label className="switch">
                          <input
                            type="checkbox"
                            onClick={togglePlan}
                            checked={isChecked}
                            onChange={toggleSwitch}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </label>
                  </div>

                  <span>Yearly</span>
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
              data={planData}
            />
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default Index;
