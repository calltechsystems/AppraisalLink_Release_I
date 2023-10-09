import { useEffect, useState } from "react";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader_01";
import MobileMenu from "../common/header/MobileMenu";
import Pricing from "./Pricing";
import Modal from "./Modal";
// import Header from "../home/Header";

const Index = () => {
  const [isSelected, setSelected] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState({
    title: "Basic",
    price: 0,
  });

  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const togglePlan = () => {
    setSelectedPlan(selectedPlan === "Monthly" ? "Yearly" : "Monthly");
  };

  const changePlan = (newPlan) => {
    console.log(newPlan);
    if (String(newPlan) === "Monthly") {
      setSelected(1);
    } else {
      setSelected(2);
    }
    console.log("selected ", isSelected);
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
      <section className="our-dashbord mt-5" style={{}}>
        <div className="ovh">
          <div className="row">
            <div className="col-lg-12 col-lg-6 maxw100flex-992">
              <div className="main-title text-center">
                <h2
                  className=""
                  style={{
                    backgroundColor: "#2e008b",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  Ready to get started?
                </h2>
                <p className="text-dark">
                  Choose a plan tailored to your needs {selectedPlan}
                </p>
                <div className="toggleContainer mt-3">
                  <span className="fw-bold text-dark">Monthly</span>
                  <div>
                    <label
                    // className={`toggleLabel ${selectedPlan}`}
                    // onClick={togglePlan}
                    >
                      {/* <button className="toggleSwitch"></button> */}

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

          <div className="container">
            <div className="row">
              <Pricing
                isPlan={selectedPlan}
                setModalOpen={setModalOpen}
                setPrice={setPrice}
              />
              <Modal
                modalOpen={modalOpen}
                closeModal={closeModal}
                price={price}
              />
              {/* <Pricing hideButton={false}/> */}
            </div>
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
