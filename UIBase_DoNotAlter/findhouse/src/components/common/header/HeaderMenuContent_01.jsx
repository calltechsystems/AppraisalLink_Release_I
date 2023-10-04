import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const HeaderMenuContent = ({ float = "", hide, isListing }) => {
  const route = useRouter();

  const [hovered, setHovered] = useState(false);

  const [about, setAbout] = useState(false);

  const [login, setLogin] = useState(false);

  const home = [
    {
      id: 1,
      name: "Home 1",
      routerPath: "/",
    },
    // { id: 2, name: "Home 2", routerPath: "/home-2" },
    // {
    //   id: 3,
    //   name: "Home 3",
    //   routerPath: "/home-3",
    // },
    // { id: 4, name: "Home 4", routerPath: "/home-4" },
    // { id: 5, name: "Home 5", routerPath: "/home-5" },
    // { id: 6, name: "Home 6", routerPath: "/home-6" },
    // { id: 7, name: "Home 7", routerPath: "/home-7" },
    // { id: 8, name: "Home 8", routerPath: "/home-8" },
    // { id: 9, name: "Home 9", routerPath: "/home-9" },
    // { id: 10, name: "Home 10", routerPath: "/home-10" },
  ];

  const listing = [
    {
      id: 5,
      title: "Agent View",
      items: [
        {
          name: "Agent V1",
          routerPath: "/agent-v1",
        },
        {
          name: "Agent V2",
          routerPath: "/agent-v2",
        },
        {
          name: "Agent Details",
          routerPath: "/agent-details",
        },
      ],
    },
    {
      id: 6,
      title: "Agencies View",
      items: [
        {
          name: "Agencies V1",
          routerPath: "/agency-v1",
        },
        {
          name: "Agencies V2",
          routerPath: "/agency-v2",
        },
        {
          name: "Agencies Details",
          routerPath: "/agency-details",
        },
      ],
    },
  ];

  const property = [
    {
      id: 1,
      title: "User Admin",
      items: [
        {
          name: "Dashboard",
          routerPath: "/my-dashboard",
        },
        {
          name: "My Properties",
          routerPath: "/my-properties",
        },
        {
          name: "My Message",
          routerPath: "/my-message",
        },
        {
          name: "My Review",
          routerPath: "/my-review",
        },
        {
          name: "My Favourites",
          routerPath: "/my-favourites",
        },
        {
          name: "My Profile",
          routerPath: "/my-profile",
        },
        {
          name: "My Package",
          routerPath: "/my-package",
        },
        {
          name: "My Saved Search",
          routerPath: "/my-saved-search",
        },
        {
          name: "Add Property",
          routerPath: "/create-listing",
        },
      ],
    },
    {
      id: 2,
      title: "Listing Single",
      items: [
        {
          name: "Single V1",
          routerPath: "/listing-details-v1",
        },
        {
          name: "Single V2",
          routerPath: "/listing-details-v2",
        },
        {
          name: "Single V3",
          routerPath: "/listing-details-v3",
        },
        {
          name: "Single V4",
          routerPath: "/listing-details-v4",
        },
      ],
    },
  ];

  const blog = [
    { id: 1, name: "Blog List 1", routerPath: "/blog-list-1" },
    { id: 2, name: "Blog List 2", routerPath: "/blog-list-2" },
    { id: 3, name: "Blog List 3", routerPath: "/blog-list-3" },
    {
      id: 4,
      name: "Blog Details",
      routerPath: "/blog-details",
    },
  ];

  const pages = [
    { id: 1, name: "About Us", routerPath: "/about-us" },
    { id: 2, name: "Gallery", routerPath: "/gallery" },
    { id: 3, name: "Faq", routerPath: "/faq" },
    { id: 4, name: "LogIn", routerPath: "/login" },
    { id: 5, name: "Compare", routerPath: "/compare" },
    { id: 6, name: "Membership", routerPath: "/membership" },

    { id: 7, name: "Register", routerPath: "/register" },
    { id: 8, name: "Service", routerPath: "/service" },
    { id: 9, name: "404 Page", routerPath: "/404" },
    { id: 10, name: "Terms & Conditions", routerPath: "/terms" },
  ];

  const user = [
    { id: 1, name: "Mortgage Broker", routerPath: "/login" },
    { id: 2, name: "Mortgage Brokerage", routerPath: "/login" },
    { id: 3, name: "Appraiser", routerPath: "/login" },
    { id: 4, name: "Appraiser Company", routerPath: "/login" },
  ];

  let classname = "";
  if (hide) {
    classname = "ace-responsive-menu text-end d-lg-block d-none";
  } else {
    classname =
      "ace-responsive-menu text-end d-lg-block d-none text-end-01 ul_01";
  }

  return (
    <div onMouseLeave={() => setLogin()}>
      <div onMouseLeave={() => setHovered()}>
        <ul
          id="respMenu"
          className={classname}
          data-menu-style="horizontal"
          onMouseLeave={() => setAbout()}
        >
          <li className="dropitem" onMouseOver={() => setHovered()}>
            <Link
              href="/"
              className={
                home.some((page) => page.routerPath === route.pathname)
                  ? "ui-active"
                  : undefined
              }
            >
              <span className="title text-info-01">Home</span>
              {/* <span className="arrow"></span> */}
            </Link>
            {/* <!-- Level Two--> */}

            {/* <ul className="sub-menu ">
          {home.map((item) => (
            <li key={item.id}>
              <Link
                href={item.routerPath}
                className={
                  route.pathname === item.routerPath ? "ui-active" : undefined
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul> */}
          </li>

          {/* End .dropitem */}

          <li className="dropitem" onMouseOver={() => setAbout()}>
            <Link href="/choose-us">
              <span
                className="title text-info-01"
                onMouseOver={() => setHovered(!hovered)}
                // onMouseLeave={() => setLogin()}
                // onMouseLeave={() => setHovered()}
              >
                Why Choose Us
              </span>
              <span className="arrow text-info-01"></span>
            </Link>
            {/* <!-- Level Two--> */}
            {hovered ? (
              <div
                className=""
                style={{
                  width: "100%",
                  background: "red",
                  // opacity: isHovered ? 1 : 0,  Show content when hovered
                  transition: "opacity 0.3s ease", // Add transition for the opacity property
                  position: "absolute",
                  top: "100%",
                  left: "-520px",
                  width: "1420px",
                  margin: "-16px",
                  height: "215px",
                  backgroundColor: "#fff",
                  color: "#333",
                  borderTopColor: "#2e008b",
                  borderTopWidth: "2px",
                  borderTopStyle: "solid",
                  // display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "center",
                  marginTop: "15px",
                  cursor:"pointer"
                }}
              >
                <div className="row">
                  <div className="col-lg-3 text-center">
                    <div className="row">
                      <div className="col-lg-12 mt-4">
                        {/* <Link href="/">
                          <Image
                            width={40}
                            height={45}
                            className="logo2 img-fluid"
                            style={{ marginRight: "10px" }}
                            src="/assets/images/logo_new.png"
                            alt="header-logo2.png"
                          />
                          <span
                            className="fw-bold"
                            style={{ fontSize: "19px", color: "black" }}
                          >
                            <span></span>Appraisal Link
                          </span>
                        </Link> */}
                      </div>
                      <div className="col-lg-12 mt-4 mb-2">
                        <button className="btn btn2 w-50 btn-color">
                          For Brokers
                        </button>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <button className="btn btn2 w-50 btn-color">
                          For Appraiser
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 text-center">
                    <div className="row">
                      <div className="col-lg-8 m-5 fw-bold">
                        <span>Mortgage Broker</span>
                        <br />
                        <span>Mortgage Broker</span>
                        <br />
                        <span>Mortgage Broker</span>
                        <br />
                        <span>Mortgage Broker</span>
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 text-center">
                    <div className="row">
                      <div className="col-lg-8 m-5 fw-bold" style={{}}>
                        <span>Mortgage Broker</span>
                        <br />
                        <span>Mortgage Broker</span>
                        <br />
                        <span>Mortgage Broker</span>
                        <br />
                        <span>Mortgage Broker</span>
                        <br />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 text-center"
                    style={{ backgroundColor: "#c2c2c2" }}
                  >
                    <div className="row">
                      <div className="col-lg-8 m-5 fw-bold">
                        <span>
                          Ready to see Appraisal Link help make you more money
                          at record speed?
                        </span>
                        <br />
                        <Link href="/register">
                          <button className="btn btn2 w-50 btn-color">
                            Register
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <h1>hiiiii</h1> */}
              </div>
            ) : null}
          </li>

          {/* End .dropitem */}

          <li className="dropitem" onMouseOver={() => setHovered()}>
            <Link href="#">
              <span
                className="title text-info-01"
                onMouseOver={() => setAbout(!about)}
                // onMouseLeave={() => setAbout()}
                // onMouseLeave={() => setLogin()}
              >
                Insights
              </span>{" "}
              <span className="arrow text-info-01"></span>
            </Link>
            {about ? (
              <div
                className=""
                style={{
                  width: "100%",
                  background: "red",
                  // opacity: isHovered ? 1 : 0,  Show content when hovered
                  transition: "opacity 0.3s ease", // Add transition for the opacity property
                  position: "absolute",
                  top: "100%",
                  // left: "20px",
                  right: "-570px",
                  width: "1420px",
                  margin: "-16px",
                  height: "225px",
                  backgroundColor: "#fff",
                  color: "#333",
                  borderTopColor: "#2e008b",
                  borderTopWidth: "2px",
                  borderTopStyle: "solid",
                  // display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <div className="row">
                  <div className="col-lg-3 text-center">
                    <div className="row">
                      <div className="col-lg-12 mt-4">
                        {/* <Link href="/">
                          <Image
                            width={40}
                            height={45}
                            className="logo2 img-fluid"
                            style={{ marginRight: "10px" }}
                            src="/assets/images/logo_new.png"
                            alt="header-logo2.png"
                          />
                          <span
                            className="fw-bold"
                            style={{ fontSize: "19px", color: "black" }}
                          >
                            Appraisal Link
                          </span>
                        </Link> */}
                      </div>
                      <div className="col-lg-12 mt-4 mb-2">
                        <button className="btn btn2 w-50 btn-color">
                          For Brokers
                        </button>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <button className="btn btn2 w-50 btn-color">
                          For Appraiser
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 text-end">
                    <div className="row">
                      <div className="col-lg-12 m-4 fw-bold">
                        <Link href="/">
                          <Image
                            width={190}
                            height={125}
                            className="logo2 img-fluid mt-3"
                            // style={{ marginRight: "10px" }}
                            src="/assets/images/about/home-inspector-checks-condition-house-writes-report-flat-illustration_2175-8129.avif"
                            alt="header-logo2.png"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 text-center">
                    <div className="row">
                      <div className="col-lg-6 m-5 fw-bold" style={{}}>
                        <Link href="/">
                          <Image
                            width={160}
                            height={125}
                            className="logo2 img-fluid"
                            // style={{ marginRight: "10px" }}
                            src="/assets/images/about/house-mortgage-property-inspection-audit-icon-graphic-home-real-estate-deal-review-assessment_101884-2246.avif"
                            alt="header-logo2.png"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 text-center"
                    style={{ backgroundColor: "#c2c2c2" }}
                  >
                    <div className="row">
                      <div className="col-lg-8 m-5 fw-bold">
                        <span style={{ lineHeight: "1.9" }}>
                          Revolutionize Your Frieght Experience : conquer the
                          real estate buisness with{" "}
                          <span className="text-color fw-bold">
                            Appraisal Link
                          </span>
                          .
                        </span>
                        <br />
                        {/* <button className="btn btn2 w-50 btn-color">
                          Register
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <h1>hiiiii</h1> */}
              </div>
            ) : null}
          </li>

          {/* End .dropitem */}

          <li className="last">
            <Link
              href="/membership"
              className={
                route.pathname === "/membership" ? "ui-active" : undefined
              }
            >
              <span className="text-info-01" onMouseOver={() => setAbout()}>
                Subscription
              </span>
            </Link>
          </li>

          {/* End .dropitem */}

          <li className="last">
            <Link
              href="/about-us"
              className={
                route.pathname === "/contact" ? "ui-active" : undefined
              }
            >
              <span className="text-info-01" onMouseOver={() => setLogin()}>
                About Us
              </span>
            </Link>
          </li>

          {/* End .dropitem */}

          <li className="dropitem">
            <Link
              href="#"
              className={
                pages.some((page) => page.routerPath === route.pathname)
                  ? "ui-active"
                  : undefined
              }
            >
              <span className="btn text-color-01 flaticon-user"></span>
              <span
                className=" dn-lg text-info-01"
                onMouseOver={() => setLogin(!login)}
                // onMouseLeave={() => setLogin()}
              >
                Login
              </span>
              <span className="arrow text-info-01"></span>
            </Link>

            {login ? (
              <div
                className=""
                style={{
                  width: "100%",
                  background: "red",
                  // opacity: isHovered ? 1 : 0,  Show content when hovered
                  transition: "opacity 0.3s ease", // Add transition for the opacity property
                  position: "absolute",
                  top: "100%",
                  // left: "20px",
                  right: "-190px",
                  width: "1420px",
                  margin: "-16px",
                  height: "225px",
                  backgroundColor: "#fff",
                  color: "#333",
                  borderTopColor: "#2e008b",
                  borderTopWidth: "2px",
                  borderTopStyle: "solid",
                  // display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "center",
                  marginTop: "5px",
                }}
              >
                <div className="row">
                  <div className="col-lg-3 text-center">
                    <div className="row">
                      <div className="col-lg-12 mt-4">
                        {/* <Link href="/">
                          <Image
                            width={40}
                            height={45}
                            className="logo2 img-fluid"
                            style={{ marginRight: "10px" }}
                            src="/assets/images/logo_new.png"
                            alt="header-logo2.png"
                          />
                          <span
                            className="fw-bold"
                            style={{ fontSize: "19px", color: "black" }}
                          >
                            Appraisal Link
                          </span>
                        </Link> */}
                      </div>
                      <div className="col-lg-12 mt-4 mb-2">
                        <button className="btn btn2 w-50 btn-color">
                          For Brokers
                        </button>
                      </div>
                      <div className="col-lg-12 mb-2">
                        <button className="btn btn2 w-50 btn-color">
                          For Appraiser
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 text-end">
                    <div className="row">
                      <div className="col-lg-12 m-4 fw-bold">
                        <Link href="/">
                          <Image
                            width={190}
                            height={125}
                            className="logo2 img-fluid mt-3"
                            // style={{ marginRight: "10px" }}
                            src="/assets/images/about/home-inspector-checks-condition-house-writes-report-flat-illustration_2175-8129.png"
                            alt="header-logo2.png"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 text-center">
                    <div className="row">
                      <div className="col-lg-6 m-5 fw-bold" style={{}}>
                        <Link href="/">
                          <Image
                            width={160}
                            height={125}
                            className="logo2 img-fluid"
                            // style={{ marginRight: "10px" }}
                            src="/assets/images/about/house-mortgage-property-inspection-audit-icon-graphic-home-real-estate-deal-review-assessment_101884-2246.png"
                            alt="header-logo2.png"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-3 text-center"
                    style={{ backgroundColor: "#c2c2c2" }}
                  >
                    <div className="row">
                      <div className="col-lg-8 mt-3 fw-bold">
                        <Link href="/login">
                          <button className="btn btn2 w-100 btn-color">
                            Mortgage Broker
                          </button>
                        </Link>
                        <Link href="/login">
                          <button className="btn btn2 w-100 btn-color mt-3">
                            Mortgage Brokerage
                          </button>
                        </Link>
                        <Link href="/login">
                          <button className="btn btn2 w-100 btn-color mt-3">
                            Appraiser
                          </button>
                        </Link>
                        <Link href="/login">
                          <button className="btn btn2 w-100 btn-color mt-3">
                            Appraiser Company
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <h1>hiiiii</h1> */}
              </div>
            ) : null}

            {/* <ul className="sub-menu ">
            {user.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.routerPath}
                  className={
                    route.pathname === item.routerPath ? "ui-active" : undefined
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul> */}
          </li>

          <li
            className={`list-inline-item add_listing ${float}`}
            style={{ padding: "0px" }}
            onMouseOver={() => setLogin()}
          >
            <Link href="/contact">
              <span className="fs-13"></span>
              <span className="dn-lg fs-13"> GET IN TOUCH</span>
            </Link>
          </li>

          {/* End .dropitem */}
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenuContent;
