import { useState } from "react";
import Header from "../../components/common/header/dashboard/Header";
import MobileMenu from "../../components/common/header/MobileMenu";
import Pricing from "./pricing";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu";

const Index = ({setModalOpen,setPrice}) => {
  //by default monthly being selected here as
  // 1-->means monthly
  // 2--> yearly
  const [isSelected, setSelected] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Monthly');

  const changePlan = (newPlan) => {
    if(newPlan === "Monthly"){
      setSelected(1);
    }
    else{
      setSelected(2);
    }
    setSelectedPlan(newPlan);
  };
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
                Choose a plan tailored to your needs {selectedPlan}
              </p>
              <div>
                <button
                  style={{
                    width: "120px",
                    margin: "6px",
                    borderRadius: "8px",
                    borderColor:"#2e008b",
                    backgroundColor:
                      selectedPlan === "Monthly" ? "#2e008b" : "white",
                    color: selectedPlan === "Monthly" ? "white" : "#2e008b",
                  }}
                  onClick={() => changePlan("Monthly")}
                >
                  Monthly
                </button>
                <button
                  style={{
                    width: "120px",
                    margin: "6px",
                    borderRadius: "8px",
                    borderColor:"#2e008b",
                    backgroundColor:
                      selectedPlan === "Yearly" ? "#2e008b" : "white",
                    color: selectedPlan === "Yearly" ? "white" : "#2e008b",
                  }}
                  onClick={() => changePlan("Yearly")}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Pricing isPlan={isSelected} setModalOpen={setModalOpen} setPrice={setPrice}/>
            {/* <Pricing hideButton={false}/> */}
          </div>
          {/* End .row */}
        </div>
      </section>
    </>
  );
};

export default Index;
