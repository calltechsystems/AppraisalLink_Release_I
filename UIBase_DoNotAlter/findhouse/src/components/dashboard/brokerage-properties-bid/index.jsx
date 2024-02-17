import Header from "../../common/header/dashboard/HeaderBrokerage";
import SidebarMenu from "../../common/header/dashboard/SidebarMenuBrokerage";
import MobileMenu from "../../common/header/MobileMenu_02";
import TableData from "./TableData";
import Filtering from "./Filtering";
import FilteringBy from "./FilteringBy";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Exemple from "./Exemple";
import { encryptionData } from "../../../utils/dataEncryption";

const Index = ({ propertyId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [appInfo, setAppInfo] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState(0);

  const [start, setStart] = useState(0);

  const [openBrokerModal, setOpenBrokerModal] = useState(false);

  const [property, setProperty] = useState([]);
  const [filterProperty, setFilterProperty] = useState("");
  const [filterQuery, setFilterQuery] = useState("Last 30 Days");
  const [properties, setProperties] = useState([]);

  const [modalIsOpenError, setModalIsOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const len = properties.length > 5 ? properties.length : 5;
  console.log(len);

  const [end, setEnd] = useState(len);

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

  const closeAppraiserHandler = () => {
    setAppInfo({});
    setOpenBrokerModal(false);
  };

  const acceptRequestHandler = () => {
    const data = JSON.parse(localStorage.getItem("user"));
    toast.loading("Accepting the Quote ...");
    const payload = {
      bidId: id,
      token: data.token,
    };

    console.log(propertyId);

    const encryptedBody = encryptionData(payload);
    axios
      .post("/api/acceptBid", encryptedBody, {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();

        toast.success("Successfully accepted the Quote");
        router.push("/brokerage-properties");
      })
      .catch((err) => {
        toast.dismiss();
        console.log(err);
        toast.error(err?.response?.data?.error);
      });
  };

  const rejectRequestHandler = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));
    toast.loading("Declining the Quote ...");
    const payload = {
      bidId: id,
    };
    const encryptedBody = encryptionData(payload);
    axios
      .post("/api/declineBid", encryptedBody, {
        headers: {
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully declined the Quote");
        router.push("/brokerage-properties");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err?.response?.data?.error);
      });
  };

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
    };
  }, []);

  useEffect(() => {
    // Check for inactivity every minute
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;

      // Check if there has been no activity in the last 10 minutes (600,000 milliseconds)
      if (timeSinceLastActivity > 1200000) {
        localStorage.removeItem("user");
        router.push("/login");
      }
    }, 60000); // Check every minute

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);

  const openModal = (property) => {
    console.log("inside");
    setProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const filterProperties = (propertys, searchInput) => {
      if (searchInput === "") {
        return propertys;
      }
      const filteredProperties = propertys.filter((property) => {
        // Convert the search input to lowercase for a case-insensitive search
        const searchTerm = searchInput.toLowerCase();

        // Check if any of the fields contain the search term
        return (
          property.zipCode.toLowerCase().includes(searchTerm) ||
          property.area.toLowerCase().includes(searchTerm) ||
          property.city.toLowerCase().includes(searchTerm) ||
          property.state.toLowerCase().includes(searchTerm) ||
          property.streetName.toLowerCase().includes(searchTerm) ||
          property.streetNumber.toLowerCase().includes(searchTerm) ||
          property.typeOfBuilding.toLowerCase().includes(searchTerm)
        );
      });

      return filteredProperties;
    };
    const filteredData = filterProperties(properties, searchInput);
    setFilterProperty(filteredData);
  }, [searchInput]);

  const filterData = (tempData) => {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    switch (filterQuery) {
      case "Last 30 Days":
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= thirtyDaysAgo
        );
      case "Last 1 month":
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneMonthAgo
        );
      case "Last 6 months":
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= sixMonthsAgo
        );
      case "Last 1 year":
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneYearAgo
        );
      default:
        return tempData; // Return all data if no valid timeFrame is specified
    }
  };

  useEffect(() => {
    const tmpData = filterData(properties);
    setProperties(tmpData);
  }, [filterQuery]);

  const handleDelete = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    toast.loading("deleting this property");
    axios
      .delete("/api/deleteBrokerPropertyById", {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        params: {
          propertyId: property.propertyId,
        },
      })
      .then((res) => {
        setRerender(true);
      })
      .catch((err) => {
        toast.error(err);
      });
    toast.dismiss();
    closeModal();
  };

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      router.push("/login");
    } else if (!data?.brokerage_Details?.firstName) {
      router.push("/brokerage-profile");
    }
    if (!data) {
      router.push("/login");
    }
    const fetchData = () => {
      if (data) {
        setUserData(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(property);
  }, [property]);

  console.log(appInfo);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50 dashboard-height">
        <div
          className="container-fluid ovh padding container-padding"
          style={{}}
        >
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                {/* <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div> */}
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 col-xl-12 mt-3 mb-1 text-center">
                  <div className="style2 mb30-991">
                    <h3 className="breadcrumb_title">Provided Quotes</h3>
                  </div>
                </div>
                {/* End .col */}

                {/* <div className="col-lg-12 col-xl-12">
                  <div className="candidate_revew_select style2 mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <Filtering setFilterQuery={setFilterQuery} />
                      </li>
                      <li className="list-inline-item">
                        <FilteringBy setFilterQuery={setFilterQuery} />
                      </li>
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox setSearchInput={setSearchInput} />
                        </div>
                      </li>
                     
                    </ul>
                  </div>
                </div> */}
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="mb40">
                    <div className="property_table">
                      <div className=" mt0">
                        <TableData
                          userData={userData}
                          open={openModal}
                          setIsModalOpen={setIsModalOpen}
                          close={closeModal}
                          setProperties={setProperties}
                          properties={
                            searchInput === "" ? properties : filterProperty
                          }
                          start={start}
                          end={end}
                          setid={setId}
                          property={property}
                          setProperty={setProperty}
                          propertyId={propertyId}
                          setModalIsOpenError={setModalIsOpenError}
                          setOpenBrokerModal={setOpenBrokerModal}
                          setErrorMessage={setErrorMessage}
                          setAppInfo={setAppInfo}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />

                        {modalIsOpenError && (
                          <div className="modal">
                            <div
                              className="modal-content"
                              style={{ borderColor: "orangered", width: "20%" }}
                            >
                              <h3
                                className="text-center"
                                style={{ color: "orangered" }}
                              >
                                Error
                              </h3>
                              <div
                                style={{
                                  borderWidth: "2px",
                                  borderColor: "orangered",
                                }}
                              >
                                <br />
                              </div>
                              <h5 className="text-center">{errorMessage}</h5>
                              <div
                                className="text-center"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <button
                                  className="btn w-35 btn-white"
                                  onClick={() => closeModal()}
                                  style={{
                                    borderColor: "orangered",
                                    color: "orangered",
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* End .table-responsive */}

                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>

                {/* End .col */}
              </div>

              <div className="row">
                {/* <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination
                      properties={properties}
                      setProperties={setProperties}
                    />
                  </div>
                </div> */}
                {/* End paginaion .col */}
              </div>
              {/* End .row */}
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-lg-12 mt20 mb100">
                <div className="mbp_pagination">
                  <Pagination
                    setStart={setStart}
                    setEnd={setEnd}
                    properties={properties}
                  />
                </div>
              </div>
            </div>

            <div className="row mt50">
              <div className="col-lg-12">
                <div className="copyright-widget text-center">
                  <p>
                    &copy; {new Date().getFullYear()} Appraisal Land. All Rights
                    Reserved.
                  </p>
                </div>
              </div>
            </div>
            {/* End .col */}

            {openBrokerModal && appInfo?.firstName && (
              <div className="modal">
                <div className="modal-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <Link href="/" className="">
                        <Image
                          width={60}
                          height={45}
                          className="logo1 img-fluid"
                          style={{ marginTop: "-20px" }}
                          src="/assets/images/Appraisal_Land_Logo.png"
                          alt="header-logo2.png"
                        />
                        <span
                          style={{
                            color: "#2e008b",
                            fontWeight: "bold",
                            fontSize: "24px",
                            // marginTop: "20px",
                          }}
                        >
                          Appraisal
                        </span>
                        <span
                          style={{
                            color: "#97d700",
                            fontWeight: "bold",
                            fontSize: "24px",
                            // marginTop: "20px",
                          }}
                        >
                          {" "}
                          Land
                        </span>
                      </Link>
                    </div>
                  </div>
                  <span style={{ fontWeight: "bold" }}>
                    <h3 className="text-center"> Appraiser Details </h3>
                  </span>
                  <div
                    className="mt-2 mb-3"
                    style={{ border: "2px solid #97d700" }}
                  ></div>
                  <div className=" col-lg-12">
                    <div className="row offset-1">
                      <h5 className="col-lg-3 mt-1 text-start">
                        <span className="">Appraiser Name </span>{" "}
                      </h5>
                      <span className="col-lg-1">:</span>
                      <span className="col-lg-6 text-start">
                        {appInfo.firstName} {appInfo.lastName}
                      </span>
                    </div>
                    <div className="row offset-1">
                      <h5 className="col-lg-3 mt-1 text-start">
                        <span className="">Email Address</span>{" "}
                      </h5>
                      <span className="col-lg-1">:</span>
                      <span className="col-lg-6 text-start">
                        {appInfo.email ? appInfo.email : "N.A."}
                      </span>
                    </div>
                    <div className="row offset-1">
                      <h5 className="col-lg-3 mt-1 text-start">
                        <span className="">Phone Number </span>{" "}
                      </h5>
                      <span className="col-lg-1">:</span>
                      <span className="col-lg-6 text-start">
                        {appInfo.phoneNumber}
                      </span>
                    </div>
                    <div className="row offset-1">
                      <h5 className="col-lg-3 mt-1 text-start">
                        <span className="">Company Name </span>{" "}
                      </h5>
                      <span className="col-lg-1">:</span>
                      <span className="col-lg-6 text-start">
                        {appInfo.companyName}
                      </span>
                    </div>
                    <div className="row offset-1">
                      <h5 className="col-lg-3 mt-1 text-start">
                        <span className="">Designation</span>{" "}
                      </h5>
                      <span className="col-lg-1">:</span>
                      <span className="col-lg-6 text-start">
                        {appInfo.designation}
                      </span>
                    </div>
                    <div className="row offset-1">
                      <h5 className="col-lg-3 mt-1 text-start">
                        <span className="">Address </span>{" "}
                      </h5>
                      <span className="col-lg-1">:</span>
                      <span className="col-lg-6">
                        {appInfo.streetName}-{appInfo.streetNumber},
                        {appInfo.area} {appInfo.city} - {appInfo.province}{" "}
                        {appInfo.postalCode}
                      </span>
                    </div>
                  </div>
                  <div
                    className="mt-2 mb-3"
                    style={{ border: "2px solid #97d700" }}
                  ></div>
                  <div className="text-center" style={{}}>
                    <button
                      className="btn btn-color w-35"
                      onClick={() => closeAppraiserHandler()}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <Link href="/" className="">
                        <Image
                          width={60}
                          height={45}
                          className="logo1 img-fluid"
                          style={{ marginTop: "-20px" }}
                          src="/assets/images/Appraisal_Land_Logo.png"
                          alt="header-logo2.png"
                        />
                        <span
                          style={{
                            color: "#2e008b",
                            fontWeight: "bold",
                            fontSize: "24px",
                            // marginTop: "20px",
                          }}
                        >
                          Appraisal
                        </span>
                        <span
                          style={{
                            color: "#97d700",
                            fontWeight: "bold",
                            fontSize: "24px",
                            // marginTop: "20px",
                          }}
                        >
                          {" "}
                          Land
                        </span>
                      </Link>
                    </div>
                  </div>
                  <h3 className="text-center">Accept Bid Confirmation</h3>
                  <div
                    className="mt-2 mb-3"
                    style={{ border: "2px solid #97d700" }}
                  ></div>
                  <p className="text-center fs-6">
                    Are you sure you want to accept the quote with value?
                  </p>

                  <h4 className="text-center">
                    Quote Amount : $ {property.bidAmount}
                  </h4>
                  <p className="text-center mt-3 mb-0">
                    ( Note <span className="text-danger">*</span> : All Other
                    Quotes from other appriasers will be Rejected.)
                  </p>
                  <div
                    className="mt-2 mb-3"
                    style={{ border: "2px solid #97d700" }}
                  ></div>

                  {/* <p>Are you sure you want to delete the property: {property.area}?</p> */}
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12 text-center m-1">
                        <button
                          className="btn btn-color"
                          style={{ marginRight: "5px" }}
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-color"
                          onClick={() => acceptRequestHandler(property.bidId)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
