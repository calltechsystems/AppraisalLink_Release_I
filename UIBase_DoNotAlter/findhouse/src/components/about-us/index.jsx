import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader_01";
import MobileMenu from "../common/header/MobileMenu";
import Partners from "../common/Partners";
import WhyChoose from "../common/WhyChoose";
import Testimonial from "../home-7/Testimonial";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Team from "./Team";
import OurMission from "./OurMission";
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

      {/* <!-- About Text Content --> */}
      <section className="about-section">
        {/* <div className="container"> */}
        <div className="row">
          <div className="col-lg-12">
            <div
              className="main-title text-center"
              style={{
                backgroundColor: "#2e008b",
                color: "white",
                padding: "15px",
              }}
            >
              <h2 className="mt0 text-light">
                Our Mission Is To Appraisal Link
              </h2>
            </div>
          </div>
        </div>
        {/* End .row */}

        <div className="container">
          <div className="row">
            <OurMission />
          </div>
        </div>
        {/* End .row */}

        {/* <div className="row mt80">
          <div className="col-lg-12">
            <div className="main-title text-center">
              <h2 className="text-light" style={{
                backgroundColor: "#2e008b",
                color: "white",
                padding: "20px",
              }}>Why Choose Us</h2>
              <p>We provide full service at every step.</p>
            </div>
          </div>
        </div> */}
        {/* End .row */}

        <div className="container mt-5">
          <div className="row">
            {/* <WhyChoose /> */}
            <div className="col-lg-12 col-xl-12">
              <div className="terms_condition_grid">
                <div className="grids mb30">
                  {/* <h4>{item.title}</h4> */}
                  <p className="mb20">
                    Based in Ontario, our company collaborates with brokers and
                    appraisers to deliver a comprehensive suite of services
                    tailored to the real estate sector. Our primary mission is
                    to ensure the provision of property appraisal services that
                    are marked by efficiency, strict adherence to industry
                    regulations, and unwavering reliability. Our ultimate goal
                    is to cultivate enduring relationships by maintaining open
                    lines of communication, encouraging robust collaboration
                    with all stakeholders, and proactively addressing any
                    challenges with a solution-oriented and analytically-driven
                    approach.
                  </p>
                  <p>
                    Our dedication to excellence remains steadfast, and we are
                    unwavering in our pursuit of raising industry standards. Our
                    team of devoted experts consistently works with precision
                    and accuracy to ensure that every property appraisal meets
                    the highest standards, offering our clients the confidence
                    they need when making crucial decisions.{" "}
                  </p>
                  <p>
                    As we continually strive to broaden our network of partners
                    and collaborators, we emphasize the importance of
                    transparent and open communication. It's not just about
                    conducting business; it's about fostering a community of
                    professionals who share a common vision: to push the
                    boundaries of excellence in the real estate sector. We also
                    prioritize proactivity in addressing challenges and
                    concerns. Our analytical approach allows us to identify
                    issues and create practical, forward-thinking solutions for
                    their resolution. This approach is a testament to our
                    commitment and passion for innovation within the real estate
                    industry.{" "}
                  </p>
                  <p>
                    In summary, our Ontario-based company is more than just a
                    service provider. We are a trusted partner on your real
                    estate journey, dedicated to elevating industry standards,
                    fostering strong connections, and proactively solving
                    problems to ensure your success.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End .row */}
        {/* </div> */}
      </section>

      {/* <!-- Property Search --> */}
      <section
        id="property-search"
        className="property-search home1-overlay bg-img5"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="search_smart_property text-center">
              <h2 className="text-light">
                Having trouble finding what you want?
              </h2>
              <p className="text-light">
                To learn more about the plans available and how to tailor your
                Appraisal Link membership to maximize your earning potential,
                speak with a product consultant.
              </p>
              <Link href="/contact">
                <button className="btn ssp_btn">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Our Team --> */}
      {/* <section className="our-team bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Our Team</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="team_slider gutter-x15">
                <Team />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Our Testimonials --> */}
      {/* <section className="our-testimonials">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb20">
                <h2>Testimonials</h2>
                <p>Here could be a nice sub title</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="testimonial_grid_slider style2 gutter-x15">
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Our Partners --> */}
      {/* <section id="our-partners" className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Our Partners</h2>
                <p>We only work with the best companies around the globe</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Partners />
          </div>
        </div>
      </section> */}

      {/* <!-- Start Call to Action --> */}
      {/* <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section> */}

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
