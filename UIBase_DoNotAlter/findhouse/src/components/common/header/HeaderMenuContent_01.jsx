import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HeaderMenuContent = ({ float = "", hide, isListing, userData }) => {
  const route = useRouter();

  const [hovered, setHovered] = useState(false);

  const [about, setAbout] = useState(false);

  const [plan, setPlan] = useState(false);

  const [login, setLogin] = useState(false);

  const [insight, setInsight] = useState(false);

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
    { id: 1, name: "FR", routerPath: "#" },
    { id: 2, name: "EN", routerPath: "#" },
    // { id: 3, name: "GEM", routerPath: "#" },
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
    <div onMouseLeave={() => setPlan()}>
      <div onMouseLeave={() => setInsight()}>
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
                  onMouseOver={() => setAbout()}
                  onMouseEnter={() => setPlan()}
                >
                  <span
                    className="title text-info-01 cool-link menuitem"
                    onMouseOver={() => setInsight()}
                    onMouseEnter={() => setLogin()}
                  >
                    Home
                  </span>
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
              <li
                className="dropitem"
                onMouseOver={() => setAbout()}
                onMouseEnter={() => setLogin()}
              >
                <Link href="#" onMouseOver={() => setInsight()}>
                  <span
                    className="title text-info-01 cool-link menuitem"
                    onMouseOver={() => setHovered(!hovered)}
                    onMouseEnter={() => setPlan()}
                    // onMouseLeave={() => setLogin()}
                    // onMouseLeave={() => setHovered()}
                  >
                    Why Choose Us
                  </span>
                  {/* <span
                    className="arrow text-info-01"
                    style={{ marginLeft: "-5px" }}
                  ></span> */}
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
                      left: "-820px",
                      // right: "-500px",
                      width: "1900px",
                      margin: "-16px",
                      height: "225px",
                      backgroundColor: "#fff",
                      color: "#333",
                      borderTopColor: "#2e008b",
                      borderTopWidth: "4px",
                      borderTopStyle: "solid",
                      // display: "flex",
                      // flexDirection: "row",
                      // justifyContent: "center",
                      marginTop: "5px",
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div className="col-lg-2 text-end">
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
                            <Link href="/how-we-work">
                              <button className="btn btn2 w-50 btn-color">
                                For Brokers
                              </button>
                            </Link>
                          </div>
                          <div className="col-lg-12 mb-2">
                            <Link href="/how-we-work">
                              <button className="btn btn2 w-50 btn-color">
                                For Appraiser
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-end">
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
                      <div className="col-lg-2 text-center">
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
                          <div className="col-lg-8 m-5 fw-bold">
                            <span>
                              Ready to see Appraisal Link help make you more
                              money at record speed?
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
                      <div className="col-lg-1"></div>
                    </div>
                    {/* <h1>hiiiii</h1> */}
                  </div>
                ) : null}
              </li>
              {/* End .dropitem */}
              <li
                className="dropitem"
                onMouseOver={() => setHovered()}
                onMouseEnter={() => setLogin()}
              >
                <Link href="#" onMouseEnter={() => setPlan()}>
                  <span
                    className="title text-info-01 cool-link cool-link menuitem"
                    onMouseOver={() => setAbout(!about)}
                    onMouseEnter={() => setInsight()}
                    // onMouseLeave={() => setAbout()}
                    // onMouseLeave={() => setLogin()}
                  >
                    Insights
                  </span>{" "}
                  {/* <span className="arrow text-info-01 ml"></span> */}
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
                      right: "-790px",
                      width: "1900px",
                      margin: "-16px",
                      height: "225px",
                      backgroundColor: "#fff",
                      color: "#333",
                      borderTopColor: "#2e008b",
                      borderTopWidth: "4px",
                      borderTopStyle: "solid",
                      // display: "flex",
                      // flexDirection: "row",
                      // justifyContent: "center",
                      marginTop: "5px",
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div className="col-lg-2 text-center">
                        <div className="row">
                          <div className="col-lg-12 mt-4"></div>
                          <div className="col-lg-12 mt-4">
                            {/* <p className="">
                              To access your dashboard by clicking it.
                            </p> */}
                          </div>
                          <div className="col-lg-12 mt-4">
                            <button className="btn btn2 w-50 btn-color">
                              Dashboard
                            </button>
                          </div>
                          {/* <div className="col-lg-12 mb-2">
                          <button className="btn btn2 w-50 btn-color">
                            For Appraiser
                          </button>
                        </div> */}
                        </div>
                      </div>
                      <div className="col-lg-2 text-end">
                        <div className="row">
                          <div className="col-lg-12 m-3 fw-bold">
                            <Link href="/">
                              <Image
                                width={190}
                                height={125}
                                className="logo2 img-fluid mt-4"
                                // style={{ marginRight: "10px" }}
                                src="/assets/images/service/22.jpg"
                                alt="header-logo2.png"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <div className="row">
                          <div className="col-lg-6 m-4 fw-bold" style={{}}>
                            <Link href="/">
                              <Image
                                width={160}
                                height={125}
                                className="logo2 img-fluid"
                                // style={{ marginRight: "10px" }}
                                src="/assets/images/service/p.jpg"
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
                              Revolutionize Your Frieght Experience : conquer
                              the real estate buisness with{" "}
                              <span className="text-color fw-bold">
                                Appraisal Link
                              </span>
                              .
                            </span>
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-1"></div>
                    </div>
                    {/* <h1>hiiiii</h1> */}
                  </div>
                ) : null}
              </li>
              {/* End .dropitem */}
              <li className="last" onMouseOver={() => setHovered()}>
                <Link
                  href="#"
                  onMouseEnter={() => setInsight()}
                  className={
                    route.pathname === "/membership" ? "ui-active" : undefined
                  }
                >
                  <span
                    className="text-info-01 cool-link menuitem"
                    onMouseOver={() => setPlan(!plan)}
                    onMouseEnter={() => setLogin()}
                    // onMouseOver={() => setAbout()}
                    // onMouseEnter={() => setLogin()}
                  >
                    Subscription
                  </span>
                </Link>
                {plan ? (
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
                      right: "-700px",
                      width: "1900px",
                      margin: "-16px",
                      height: "225px",
                      backgroundColor: "#fff",
                      color: "#333",
                      borderTopColor: "#2e008b",
                      borderTopWidth: "4px",
                      borderTopStyle: "solid",
                      // display: "flex",
                      // flexDirection: "row",
                      // justifyContent: "center",
                      marginTop: "5px",
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div
                        className="col-lg-3 text-center"
                        style={{ backgroundColor: "" }}
                      >
                        <div className="row">
                          <div className="col-lg-8 m-5 fw-bold">
                            <span>
                              Subscribe today to unlock a world of exclusive
                              benefits.
                            </span>
                            <br />
                            <Link href="/membership">
                              <button className="btn btn2 w-50 btn-color">
                                Get Started
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="row">
                          <div
                            className="col-lg-12 m-3 fw-bold"
                            style={{ marginLeft: "-30px" }}
                          >
                            <Link href="/">
                              <Image
                                width={190}
                                height={125}
                                className="logo2 img-fluid mt-1"
                                src="/assets/images/home/man-pencil-fills-out-questionnaire-260nw-2052001217.png"
                                alt="header-logo2.png"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-2 text-center"
                        style={{ backgroundColor: "#c2c2c2" }}
                      >
                        <div className="row">
                          <div className="col-lg-8 m-5 fw-bold">
                            <span style={{ lineHeight: "1.9" }}>
                              Experience our platform to the fullest by becoming
                              a subscriber on{" "}
                              <span className="text-color fw-bold">
                                Appraisal Link
                              </span>
                              .
                            </span>
                            <br />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <div className="row">
                          <div className="col-lg-6 m-4 fw-bold" style={{}}>
                            <Link href="/">
                              <Image
                                width={160}
                                height={125}
                                className="logo2 img-fluid"
                                // style={{ marginRight: "10px" }}
                                src="/assets/images/home/99.jpg"
                                alt="header-logo2.png"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-1"></div>
                    </div>
                    {/* <h1>hiiiii</h1> */}
                  </div>
                ) : null}
              </li>
              {/* End .dropitem */}
              <li className="last" onMouseOver={() => setLogin()}>
                <Link
                  href="#"
                  className={route.pathname === "#" ? "ui-active" : undefined}
                >
                  <span
                    className="text-info-01 cool-link menuitem"
                    onMouseOver={() => setInsight(!insight)}
                  >
                    About Us
                  </span>
                  {/* <span
                    className="arrow text-info-01"
                    style={{ marginLeft: "-5px" }}
                  ></span> */}
                </Link>
                {insight ? (
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
                      right: "-600px",
                      width: "1900px",
                      margin: "-16px",
                      height: "225px",
                      backgroundColor: "#fff",
                      color: "#333",
                      borderTopColor: "#2e008b",
                      borderTopWidth: "4px",
                      borderTopStyle: "solid",
                      // display: "flex",
                      // flexDirection: "row",
                      // justifyContent: "center",
                      marginTop: "5px",
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div
                        className="col-lg-2 text-center"
                        style={{ backgroundColor: "" }}
                      >
                        <div className="row text-end">
                          <div className="col-lg-12 m-5 fw-bold">
                            <span>
                              Ready to see Appraisal Link help make you more
                              money at record speed?
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
                      <div className="col-lg-2">
                        <div className="row text-center">
                          <div className="col-lg-12 m-3 fw-bold">
                            <Link href="/">
                              <Image
                                width={190}
                                height={125}
                                className="logo2 img-fluid mt-3"
                                // style={{ marginRight: "10px" }}
                                src="/assets/images/service/house_.png"
                                alt="header-logo2.png"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-2"
                        style={{ backgroundColor: "#c2c2c2" }}
                      >
                        <div className="row">
                          <div className="col-lg-12 mt-3 fw-bold text-center">
                            <Link href="/about-us">
                              <button className="fw-bold mt-4 cool-link menuitem">
                                About Appraisal Link
                              </button>
                            </Link>
                            <br />
                            <Link href="/events">
                              <button className=" mt-3 fw-bold cool-link menuitem">
                                Events
                              </button>
                            </Link>
                            <br />
                            <Link href="/how-we-work">
                              <button className=" mt-3 fw-bold cool-link menuitem">
                                How We Work
                              </button>
                            </Link>
                            <br />
                            {/* <Link href="#">
                            <button className="mt-3 mb-2">
                              Mortgage Brokerage
                            </button>
                          </Link> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 text-start">
                        <div className="row">
                          <div className="col-lg-6 m-5 fw-bold" style={{}}>
                            <Link href="/">
                              <Image
                                width={160}
                                height={125}
                                className="logo2"
                                // style={{ marginRight: "10px" }}
                                src="/assets/images/service/image001.png"
                                alt="header-logo2.png"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-1"></div>
                    </div>
                    {/* <h1>hiiiii</h1> */}
                  </div>
                ) : null}
              </li>
              {/* End .dropitem */}
              <li
                className="dropitem"
                onMouseEnter={() => setHovered()}
                onMouseOver={() => setAbout()}
              >
                <Link
                  href="#"
                  onMouseOver={() => setInsight()}
                  className={
                    pages.some((page) => page.routerPath === route.pathname)
                      ? "ui-active"
                      : undefined
                  }
                >
                  <span
                    className="btn text-color-01 flaticon-user"
                    style={{ visibility: "hidden" }}
                  ></span>
                  <span
                    className=" dn-lg text-info-01 cool-link menuitem"
                    style={{ marginLeft: "-35px" }}
                    onMouseOver={() => setLogin(!login)}
                    // onMouseLeave={() => setLogin()}
                  >
                    Login
                  </span>
                  {/* <span
                    className="arrow text-info-01"
                    style={{ marginLeft: "-5px" }}
                  ></span> */}
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
                      right: "-500px",
                      width: "1900px",
                      margin: "-16px",
                      height: "225px",
                      backgroundColor: "#fff",
                      color: "#333",
                      borderTopColor: "#2e008b",
                      borderTopWidth: "4px",
                      borderTopStyle: "solid",
                      // display: "flex",
                      // flexDirection: "row",
                      // justifyContent: "center",
                      marginTop: "0px",
                    }}
                  >
                    <div className="row">
                      <div className="col-lg-2"></div>
                      <div
                        className="col-lg-3 text-center"
                        style={{ backgroundColor: "#c2c2c2" }}
                      >
                        <div className="row text-end">
                          <div className="col-lg-10 m-5 fw-bold">
                            <span>
                              Ready to see Appraisal Link help make you more
                              money at record speed?
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
                      <div className="col-lg-2 text-center">
                        <div className="row">
                          <div className="col-lg-12 m-4 fw-bold">
                            <Link href="/">
                              <Image
                                width={190}
                                height={125}
                                className="logo2 img-fluid mt-2"
                                // style={{ marginRight: "10px" }}
                                src="/assets/images/service/222.jpg"
                                alt="header-logo2.png"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-2 text-center"
                        style={{ backgroundColor: "#c2c2c2" }}
                      >
                        <div className="row">
                          <div className="col-lg-12 mt-3 fw-bold">
                            <Link href="/login">
                              <button className="btn btn2 w-100 btn-color">
                                Appraiser
                              </button>
                            </Link>
                            <Link href="/login">
                              <button className="btn btn2 w-100 btn-color mt-3">
                                Mortgage Broker
                              </button>
                            </Link>
                            <Link href="/login">
                              <button className="btn btn2 w-100 btn-color mt-3">
                                Appraiser Company
                              </button>
                            </Link>
                            <Link href="/login">
                              <button className="btn btn2 w-100 btn-color mt-3 mb-2">
                                Mortgage Brokerage
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 text-center">
                        <div className="row">
                          <div className="col-lg-6 m-4 fw-bold" style={{}}>
                            <Link href="/">
                              <Image
                                width={160}
                                height={125}
                                className="logo2 img-fluid mt-5"
                                // style={{ marginRight: "10px" }}
                                src="/assets/images/service/333.jpg"
                                alt="header-logo2.png"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-1"></div>
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
                className="dropitem"
                onMouseEnter={() => setInsight()}
                onMouseOver={() => setAbout()}
              >
                <Link
                  href="#"
                  className={
                    blog.some((page) => page.routerPath === route.pathname)
                      ? "ui-active"
                      : undefined
                  }
                >
                  <span
                    className="title cool-link menuitem"
                    onMouseOver={() => setLogin()}
                    onMouseEnter={() => setHovered()}
                  >
                    En
                  </span>
                  {/* <span className="arrow" style={{ marginLeft: "-5px" }}></span> */}
                </Link>
                <ul className="sub-menu" style={{ fontWeight: "bold" }}>
                  {blog.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.routerPath}
                        className={
                          route.pathname === item.routerPath
                            ? "ui-active"
                            : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>{" "}
              <li
                className={`list-inline-item add_listing ${float}`}
                style={{ padding: "0px" }}
                onMouseOver={() => setLogin()}
                onMouseEnter={() => setInsight()}
              >
                <Link
                  href="/contact"
                  onMouseOver={() => setAbout()}
                  onMouseEnter={() => setHovered()}
                >
                  <span className="fs-13"></span>
                  <span
                    className="dn-lg fs-13"
                    onMouseEnter={() => setPlan()}
                  >
                    {" "}
                    GET IN TOUCH
                  </span>
                </Link>
              </li>
              {/* End .dropitem */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenuContent;
