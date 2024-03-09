import React, { useEffect, useState } from "react";
import Header from "../../components/common/header/dashboard/Header_02";
import MobileMenu from "../../components/common/header/MobileMenu_01";
import Pricing from "./pricing";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu_002";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Index = ({ setModalOpen, setPrice ,disable,userData}) => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [planData, setPlanData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (!data) {
        router.push("/login");
      } else {
        try {
          const res = await axios.get("/api/getAllPlans", {
            headers: {
              Authorization: `Bearer ${data?.token}`,
              "Content-Type": "application/json",
            },
          });
          setPlanData(res.data.data.$values);
        } catch (err) {
          toast.error(err.message);
        }
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [router]);

  const togglePlan = () => {
    setSelectedPlan(selectedPlan === "Monthly" ? "Yearly" : "Monthly");
  };

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
          <SidebarMenu  disable={!disable}/>
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
                {/* <h2 className="text-dark">Ready to get started?</h2> */}
                <h5 className="text-dark mb-3">
                  Choose a plan tailored to your needs.
                </h5>
                <div className="toggleContainer">
                  <span className="fw-bold text-dark ">Monthly</span>
                  <div style={{ width: "20%", height: "50%" }}>
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
                  <span className="fw-bold text-dark">Yearly</span>
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
              userData={userData}
            />
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default Index;
