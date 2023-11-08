import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader_01";
import MobileMenu from "../common/header/MobileMenu";
import BreadCrumbBanner from "./BreadCrumbBanner";
import TermsCondions from "./TermsCondions";
import FindProperties from "./FindProperties";
import Link from "next/link";

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- Our Terms & Conditions --> */}
      <section className="our-terms bgc-f7">
        <div className="container">
          <TermsCondions />
        </div>
      </section>

      {/* <!-- Property Search --> */}
      <section
        id="property-search"
        className="property-search home1-overlay bg-img4"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="search_smart_property text-center">
              <h2 className="text-light">
                Navigating Mortgages, Simplifying Your Life.
              </h2>
              <p className="text-light">
                Throughout the mortgage process, brokers serve as a point of
                contact between the borrower and the lender.
              </p>
              <Link href="/register">
                <button className="btn ssp_btn">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Our Images --> */}
      <section id="property-city" className="property-city pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="main-title text-center">
                <h2>Unlocking Your Homeownership Dreams.</h2>
                <p>Turning Houses into Homes, One Loan at a Time.</p>
              </div> */}
            </div>
          </div>
          <div className="row">
            <FindProperties />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one p20">
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
