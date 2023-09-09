import Image from "next/image";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader_01";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import AddressSidebar from "./AddressSidebar";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";

const index = () => {
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

      {/* <!-- Our Contact --> */}
      <section className="our-contact pb0 bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4 className="mb5 text-center">Send Us An Email</h4>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                gravida quis libero eleifend ornare. Maecenas mattis enim at
                arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio,
                malesuada eu libero sit amet, congue aliquam leo. In hac
                habitasse platea dictumst.
              </p>
            </div>
            <div className="container">
              <div className="row" style={{ marginLeft: "150px" }}>
                <AddressSidebar />
              </div>
            </div>
            <div className="col-lg-12 mb-5">
              <div
                className="row form_grid"
                style={{ boxShadow: "0px 0px 50px 0px rgba(19, 19, 28, 0.42)" }}
              >
                <div
                  className="col-lg-2"
                  style={{ backgroundColor: "#2e008b", borderRadius: "2px", background:'url(https://pub-static.fotor.com/assets/bg/78f0d7f1-e8e5-4f87-9af7-17495858c8ec.jpg)' }}
                >
                 <h3 className="text-center mt-5 text-light"> Reach out to our team for any questions or inquiries you have!</h3>
                </div>
                <div className="col-lg-10">
                  <div className="">
                    <Form />
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}

            {/* <div className="col-lg-5 col-xl-4 mb-5"></div> */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}

        {/* <div className="container-fluid p0 mt50">
          <div className="row">
            <div className="col-lg-12">
              <div className="h600" id="map-canvas">
                <div className="gmap_canvas pe-none">
                  <iframe
                    title="map"
                    className="gmap_iframe"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193309.02147838814!2d-74.53513266718751!3d40.79602810000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1663993365939!5m2!1sen!2sbd"
                  ></iframe> */}
        {/* End iframe */}

        {/* <Image
                    width={32}
                    height={50}
                    className="location-finder"
                    src="/assets/images/location.png"
                    alt="location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
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

export default index;
