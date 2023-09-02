import { useState } from "react";
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Pricing from "./Pricing";

const Index = () => {
  //by default monthly being selected here as 
  // 1-->means monthly
  // 2--> yearly
  const [isSelected,setSelected] = useState(1);

  const changePlanToMonthly = ()=>{
    setSelected(1);
  }

  const changePlanToYearly = ()=>{
    setSelected(2);
  }
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- Service Section Area --> */}
      <section className="our-service pb30 bg-color">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2 className="text-dark">Ready to get started?</h2>
                <p className="text-dark">Choose a plan tailored to your needs {isSelected ===1 ? "Monthly" : "Yearly"} </p>
                <div>
                <button
                style={{
                  width: '120px',
                  margin: '6px',
                  borderRadius: '8px',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: '2px solid blue', // Initial border color
                  transition: 'border-color 0.3s', // Adding a smooth transition
                }}
                onMouseEnter={(e) => {
                  e.target.style.border = '2px solid white'; // Change border color on hover
                  e.target.style.backgroundColor = 'rgba(0, 0, 255, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.border = '2px solid blue';
                  e.target.style.backgroundColor = 'blue';
                }}

                onClick={changePlanToMonthly}
              >
                Monthly
              </button>
              <button
                style={{
                  width: '120px',
                  margin: '6px',
                  borderRadius: '8px',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: '2px solid blue', // Initial border color
                  transition: 'border-color 0.3s', // Adding a smooth transition
                }}
                onMouseEnter={(e) => {
                  e.target.style.border = '2px solid white'; // Change border color on hover
                  e.target.style.backgroundColor = 'rgba(0, 0, 255, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.border = '2px solid blue';
                  e.target.style.backgroundColor = 'blue';
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
            <Pricing  isPlan = {isSelected}/>
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Start Call to Action --> */}
      {/* <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section> */}

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Index;
