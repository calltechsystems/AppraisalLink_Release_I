import { useEffect, useState } from "react";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader_01";
import MobileMenu from "../common/header/MobileMenu";
import Pricing from "./Pricing";
import  Modal  from "./Modal";

const Index = () => {
  const [isSelected, setSelected] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('Monthly');
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState({
    title : "Pro",
    price : 19
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
    console.log("selected ",isSelected);
    setSelectedPlan(newPlan);
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}

      {/* <!-- Inner Page Breadcrumb --> */}
      {/* <BreadCrumbBanner /> */}

      {/* <!-- Service Section Area --> */}
      <section
      className="our-dashbord mt-5 container"
      style={{  }}
    >
      <div className="container-fluid ovh">
        <div className="row">
        <div className="col-lg-12 col-lg-6 maxw100flex-992">
          <div className="main-title text-center">
            <h2 className="text-dark">Ready to get started?</h2>
            <p className="text-dark">
              Choose a plan tailored to your needs {isSelected ? "Monthly" : "Yearly"}
            </p>
            <div>
              <button
              
              onClick={()=>console.log(1)}
                style={{
                  
                  width: "120px",
                  margin: "6px",
                  borderRadius: "8px",
                  borderColor:"#2e008b",
                  backgroundColor:
                    isSelected === 1 ? "#2e008b" : "white",
                  color: isSelected === 1 ? "white" : "#2e008b"
                }}
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
                    isSelected === 2 ? "#2e008b" : "white",
                  color: isSelected === 2 ? "white" : "#2e008b"
                }}
                onClick={()=>console.log(2)}
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
