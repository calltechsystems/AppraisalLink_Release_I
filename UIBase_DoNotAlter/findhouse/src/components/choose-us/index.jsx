import React from "react";
import WhyChoose from "../common/WhyChoose";
import Header from "../common/header/DefaultHeader";

const ChooseUs = () => {
  return (
    <div>
      <Header />
      <section id="why-chose" className="whychose_us bgc-f7 pb30 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Why Choose Us</h2>
                <p>We provide full service at every step.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <WhyChoose />
          </div>
        </div>
      </section>
      {/* <section>
        <div className="row mt80">
          <div className="col-lg-6 offset-lg-3">
            <div className="main-title text-center">
              <h2>Why Choose Us</h2>
              <p>We provide full service at every step.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <WhyChoose />
        </div>
      </section> */}
      {/* End .row */}
    </div>
  );
};

export default ChooseUs;
