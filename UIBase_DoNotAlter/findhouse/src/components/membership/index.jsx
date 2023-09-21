import { useState } from "react";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader_01";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import Pricing from "./Pricing";
import  Modal  from "./Modal";
// import Header from "../home/Header";

const Index = () => {
  const [isSelected, setSelected] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Monthly');
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState({
    title : "Basic",
    price : 0
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const changePlan = (newPlan) => {
    console.log(newPlan);
    if(String(newPlan) === "Monthly"){
      setSelected(1);
    }
    else{
      setSelected(2);
    }
    setSelectedPlan(newPlan);
  };
  
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      {/* <BreadCrumbBanner /> */}

      {/* <!-- Service Section Area --> */}
      <section
      className="our-dashbord dashbord bgc-f7 pb50 "
      style={{ marginLeft: "-20%",paddingRight:"5%" }}
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
                  color: selectedPlan === "Monthly" ? "white" : "#2e008b"
                }}
                onClick={()=>changePlan("Monthly")}
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
                  color: selectedPlan === "Yearly" ? "white" : "#2e008b"
                }}
                onClick={()=>changePlan("Yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        </div>
          {/* End .row */}

          <div className="row">
            <Pricing  isPlan = {isSelected} setModalOpen={setModalOpen} setPrice={setPrice}/>
            <Modal modalOpen={modalOpen} closeModal={closeModal} price={price}/>
            {/* <Pricing hideButton={false}/> */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <div className="footer_middle_area">
        <div className="container">
          <CopyrightFooter />
        </div>
      </div>
    </>
  );
};

export default Index;
