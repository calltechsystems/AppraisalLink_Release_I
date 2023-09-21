import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import MobileMenu from "../common/header/MobileMenu";
import Partners from "../common/Partners";
import Blogs from "../common/Blogs";
import FeaturedProperties from "./FeaturedProperties";
import FindProperties from "./FindProperties";
import Header from "./Header";
import Hero from "./Hero";
import WhyChoose from "../common/WhyChoose";
import Team from "../about-us/Team";
// import PopupSignInUp from "../common/PopupSignInUp";
import Pricing from "../membership/Pricing";
// import Testimonial from "../home-7/Testimonial";
import HeroSlider from "./HeroSlider";
import GlobalHeroFilter from "../common/GlobalHeroFilter";
import ComfortPlace from "./ComfortPlace";
import Testimonials from "./Testimonials";

const Index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      {/* <PopupSignInUp /> */}

      {/* <!-- Home Design --> */}
      {/* <Hero /> */}
      {/* <HeroSlider/> */}

      {/* <!-- 4th Home Slider --> */}

      <div className="home-four ">
        <div className="container-fluid p0">
          <div className="main-banner-wrapper">
            <div className="arrow-style-2 banner-style-one ">
              <HeroSlider />
            </div>
          </div>
          {/* <!-- /.main-banner-wrapper --> */}
        </div>
        {/* End .container-fluid */}

        <div className="container home_iconbox_container">
          <div className="row posr">
            <div className="col-lg-12">
              <div className="home_content home4">
                <div
                  className="home-text text-center"
                  style={{ marginTop: "-40px", marginBottom: "50px" }}
                >
                  <h2 className="fz50">
                    Brokers Paradise for all Real Estate Appraisals
                  </h2>
                  <p className="fz18 color-white">
                    From as low as $11 per month for limited time.
                  </p>
                </div>
                {/* <GlobalHeroFilter className="home4" /> */}
                <div className="row">
                  <ComfortPlace />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 4th Home Slider End --> */}

      {/* <!-- Why Chose Us --> */}
      <section id="why-chose" className="whychose_us bgc-f7 pb30">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title text-center">
              <h2
                style={{
                  backgroundColor: "#2e008b",
                  color: "white",
                  padding: "20px",
                }}
              >
                Why Choose Us
              </h2>
              <p>We provide full service at every step.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <WhyChoose />
          </div>
        </div>
      </section>

      {/* <!-- Our Blog --> */}
      {/* <section className="our-blog bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Membership Plans</h2>
                <p>Choose a plan tailored to your needs.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Blogs />
            <Pricing hideButton={true} />
          </div>
        </div>
      </section> */}

      <hr />

      {/* <!-- Our Team --> */}
      <section className="our-team bgc-f7">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title text-center">
              <h2
                style={{
                  backgroundColor: "#2e008b",
                  color: "white",
                  padding: "20px",
                }}
              >
                Meet Our Team
              </h2>
              <p>Our team of experts is there to grow your buisness.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team_slider gutter-x15">
                <Team />
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* <!-- Our Partners --> */}
      <section id="our-partners" className="our-partners">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-title text-center">
              <h2
                style={{
                  backgroundColor: "#2e008b",
                  color: "white",
                  padding: "20px",
                }}
              >
                Our Partners
              </h2>
              <p>We work with the best appraisers around the country.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Partners />
          </div>
        </div>
      </section>

      <hr />

      {/* <!-- Our Testimonials --> */}
      <section className="our-testimonials">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="main-title text-center mb20">
              <h2
                style={{
                  backgroundColor: "#2e008b",
                  color: "white",
                  padding: "20px",
                }}
              >
                {/* What Customers Says About Us */}
                What Our Users Says
              </h2>
              <p>
                Discover how Listable can you help you find everything you want.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
              <div className="testimonialsec slick-custom-as-nav">
                {/* <Testimonial /> */}
                <Testimonials />
              </div>
            </div>
          </div>
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
      <div className="footer_middle_area">
        <div className="container">
          <CopyrightFooter />
        </div>
      </div>
    </>
  );
};

export default Index;
