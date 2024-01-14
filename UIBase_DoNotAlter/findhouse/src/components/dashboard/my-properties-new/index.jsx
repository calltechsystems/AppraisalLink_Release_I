import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu_02";
import TableData from "./TableData";
import Filtering from "./Filtering";
import FilteringBy from "./FilteringBy";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Exemple from "./Exemple";
import Link from "next/link";
import millify from "millify";
import { FaRedo } from "react-icons/fa";
import { encryptionData } from "../../../utils/dataEncryption";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentProperty, setCurrentProperty] = useState("");
  const [property, setProperty] = useState("");
  const [typeView, setTypeView] = useState(0);
  const [filterProperty, setFilterProperty] = useState("");
  const [filterQuery, setFilterQuery] = useState("Last 30 Days");
  const [properties, setProperties] = useState([]);
  const [isHoldProperty, setIsHoldProperty] = useState(0);
  const [isCancelProperty, setIsCancelProperty] = useState(0);

  const [start, setStart] = useState(0);

  const [end, setEnd] = useState(4);

  const [refresh, setRefresh] = useState(false);

  const [modalIsOpenError, setModalIsOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsPopupOpen, setModalIsPopupOpen] = useState(false);

  const router = useRouter();

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

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
      if (timeSinceLastActivity > 600000) {
        localStorage.removeItem("user");
        router.push("/login");
      }
    }, 60000); // Check every minute

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);

  const modalOpened = () => {
    setModalOpen(true);
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  const openModal = (property, type) => {
    console.log("inside");
    setProperty(property);
    setTypeView(type);
    setIsModalOpen(true);
  };

  const PropertyInfoHandler = (orderId) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title></title></head><body>");

    // Add the header section
    printWindow.document.write(`
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-12 text-center" style="margin-left:250px; margin-top:50px" >
            <a href="/" class="">
              <img width="40" height="45" class="logo1 img-fluid" style="margin-top:-20px" src="/assets/images/logo.png" alt="header-logo2.png" />
              <span style="color:#2e008b; font-weight:bold; font-size:18px; margin-top:20px">
                Appraisal
              </span>
              <span style="color:#97d700; font-weight:bold; font-size:18px; margin-top:20px">
                Land
              </span>
            </a>
          </div>
        </div>
        <hr style="width:27%; margin-left:200px; color:#2e008b" />
      </div>
    `);

    printWindow.document.write(
      `<h3 style="margin-left:200px;">Property Details of Order No. ${orderId}</h3>`
    );
    printWindow.document.write(
      '<button style="display:none;" onclick="window.print()">Print</button>'
    );

    // Clone the table-container and remove the action column
    const tableContainer = document.getElementById("property-info-container");
    const table = tableContainer.querySelector("table");
    const clonedTable = table.cloneNode(true);

    // ... (rest of your code)

    printWindow.document.write(clonedTable.outerHTML);
    printWindow.document.write(`<p> Appraisal Land. All
    Rights Reserved.</p></body></html>`);
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
      toast.success("Saved the data");
    };
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const archievePropertyHandler = (id) => {
    const data = JSON.parse(localStorage.getItem("user"));

    toast.loading("archeiving this property");
    axios
      .get("/api/propertyArcheive", {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        params: {
          Id: id,
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully added to archived properties!!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err);
      });
    // closeModal();
  };

  const onHoldHandler = (propertyid, value) => {
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: data.token,
      propertyId: propertyid,
      value: Boolean(value),
    };

    const encryptedBody = encryptionData(payload);

    toast.loading("Turning the property status to on hold");
    axios
      .put("/api/setPropertyOnHold", encryptedBody)
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully added to on Hold Status!!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err);
      });
    // closeModal();
  };

  const onCancelHandler = (propertyid, value) => {
    const data = JSON.parse(localStorage.getItem("user"));

    const payload = {
      token: data.token,
      propertyId: propertyid,
      value: Boolean(value),
    };

    const encryptedBody = encryptionData(payload);

    toast.loading("Turning the property status to on hold");
    axios
      .put("/api/setPropertyOnCancel", encryptedBody)
      .then((res) => {
        toast.dismiss();
        toast.success("Successfully added to on Hold Status!!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err);
      });
    // closeModal();
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
          property.province.toLowerCase().includes(searchTerm) ||
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
        window.location.reload();
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
    } else if (!data?.broker_Details?.firstName) {
      router.push("/my-profile");
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
          className="container-fluid ovh table-padding container-padding"
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

                {/* <div className="col-lg-4 col-xl-4">
                  <div className=" style2 mb30-991">
                    <h3 className="breadcrumb_title">My Properties</h3>
                  </div>
                </div> */}
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
                      <li
                        className="list-inline-item"
                        style={{ textAlign: "end", marginLeft: "10px" }}
                        // title="Refresh Page"
                      >
                        <div className="col-lg-12">
                          <div className="row">
                            <div
                              className="col-lg-6 btn btn-color w-50"
                              onClick={() => handlePrint()}
                              title="Download Pdf"
                            >
                              <span className="flaticon-download "></span>
                            </div>
                            <div className="col-lg-6 w-50">
                              <button
                                className="btn btn-color"
                                onClick={() => props.refreshHandler()}
                                title="Refresh"
                              >
                                <FaRedo />
                              </button>
                            </div>
                          </div>
                        </div>

                        
                      </li>
                      
                    </ul>
                  </div>
                </div>   */}
                {/* End .col */}
                {/* <div className="row">
                  <div className="col-lg-12 mt0">
                    <div className="mbp_pagination">
                      <Pagination
                        setStart={setStart}
                        setEnd={setEnd}
                        properties={properties}
                      />
                    </div>
                  </div>
                </div> */}

                <div className="col-lg-12">
                  <div className="">
                    <div className="property_table">
                      <div className="mt0">
                        <TableData
                          userData={userData}
                          open={openModal}
                          start={start}
                          end={end}
                          close={closeModal}
                          setFilterQuery={setFilterQuery}
                          onHoldHandler={onHoldHandler}
                          onCancelHandler={onCancelHandler}
                          setSearchInput={setSearchInput}
                          setProperties={setProperties}
                          properties={
                            searchInput === "" ? properties : filterProperty
                          }
                          setModalIsOpenError={setModalIsOpenError}
                          setErrorMessage={setErrorMessage}
                          setModalIsPopupOpen={setModalIsPopupOpen}
                          setCurrentProperty={setCurrentProperty}
                          archievePropertyHandler={archievePropertyHandler}
                          setRefresh={setRefresh}
                          refresh={refresh}
                          setModalOpen={setModalOpen}
                          setIsCancelProperty={setIsCancelProperty}
                          setIsHoldProperty={setIsHoldProperty}
                        />

                        <div>
                          {modalIsPopupOpen && (
                            <div className="modal">
                              <div className="modal-content">
                                <div className="col-lg-12">
                                  <div className="row">
                                    <div className="col-lg-7">
                                      <h3
                                        className="text-end_01 text-color mt-1"
                                        style={{ marginBottom: "0px" }}
                                      >
                                        Property Details
                                      </h3>
                                    </div>
                                    <div
                                      className="col-lg-5 text-end_01"
                                      style={{}}
                                    >
                                      <Link href="/" className="">
                                        <Image
                                          width={40}
                                          height={45}
                                          className="logo1 img-fluid"
                                          style={{ marginTop: "-20px" }}
                                          src="/assets/images/logo.png"
                                          alt="header-logo2.png"
                                        />
                                        <span
                                          style={{
                                            color: "#2e008b",
                                            fontWeight: "bold",
                                            fontSize: "18px",
                                            marginTop: "20px",
                                          }}
                                        >
                                          Appraisal
                                        </span>
                                        <span
                                          style={{
                                            color: "#97d700",
                                            fontWeight: "bold",
                                            fontSize: "18px",
                                            marginTop: "20px",
                                          }}
                                        >
                                          {" "}
                                          Land
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div
                                    className="mt-2 mb-3"
                                    style={{ border: "1px solid #2e008b" }}
                                  ></div>
                                </div>
                                {/* <p className="text-center mb-3">
                                  All of the details on the assessed property
                                  are here.
                                </p> */}
                                <div
                                  className="d-flex justify-content-center"
                                  id="property-info-container"
                                >
                                  <table
                                    style={{
                                      width: "760px",
                                      textAlign: "start",
                                      borderRadius: "5px",
                                      fontSize: "17px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    <thead>
                                      <tr>
                                        <th
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            color: "#2e008b",
                                            // padding: "5px",
                                            textAlign: "center",
                                          }}
                                        >
                                          Title
                                        </th>
                                        <th
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "470px",
                                            color: "#2e008b",
                                            // padding: "5px",
                                            textAlign: "center",
                                          }}
                                        >
                                          Value
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Property Address
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "470px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {" "}
                                          {currentProperty.streetNumber}{" "}
                                          {currentProperty.streetName}{" "}
                                          {currentProperty.city}{" "}
                                          {currentProperty.province}{" "}
                                          {currentProperty.zipCode}
                                        </td>
                                      </tr>
                                      {/* <tr>
                                      <td
                                         style={{
                                          border: "1px solid #d1d1d1",
                                          color: "#2e008b",
                                          padding:"5px"
                                        }}
                                      >
                                        <span className="text-start">
                                          Property Area
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #d1d1d1",
                                          width: "250px",
                                        }}
                                      >
                                        {currentProperty.area} sqft
                                      </td>
                                    </tr> */}
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            {" "}
                                            Type of Building{" "}
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {currentProperty.typeOfBuilding}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            {" "}
                                            Type of Appraisal
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {currentProperty.typeOfAppraisal}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            {" "}
                                            Purpose
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {currentProperty.purpose}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            {" "}
                                            Lender Information
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {currentProperty.lenderInformation
                                            ? currentProperty.lenderInformation
                                            : "N.A."}
                                        </td>
                                      </tr>
                                      {/* <tr>
                                      <td
                                         style={{
                                          border: "1px solid #d1d1d1",
                                          color: "#2e008b",
                                          padding:"5px"
                                        }}
                                      >
                                        <span className="text-start">
                                          Community
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #d1d1d1",
                                          width: "250px",
                                        }}
                                      >
                                        {" "}
                                        {currentProperty.community
                                          ? currentProperty.community
                                          : "NA"}
                                      </td>
                                    </tr> */}
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Estimated Value
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          ${" "}
                                          {millify(
                                            currentProperty.estimatedValue
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Urgency
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {" "}
                                          {currentProperty.urgency === 0
                                            ? "Rush"
                                            : currentProperty.urgency === 1
                                            ? "Regular"
                                            : "N.A."}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Appraisal Report Required By
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {currentProperty.quoteRequiredDate}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Applicant Name
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {" "}
                                          {
                                            currentProperty.applicantFirstName
                                          }{" "}
                                          {currentProperty.applicantLastName}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Email Address
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {" "}
                                          {
                                            currentProperty.applicantEmailAddress
                                          }
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Phone Number
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {" "}
                                          {currentProperty.applicantPhoneNumber}
                                        </td>
                                      </tr>
                                      {/* <tr>
                                      <td
                                         style={{
                                          border: "1px solid #d1d1d1",
                                          color: "#2e008b",
                                          padding:"5px"
                                        }}
                                      >
                                        <span className="text-start">
                                          Address
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid #d1d1d1",
                                          width: "250px",
                                        }}
                                      >
                                        {" "}
                                        {currentProperty.applicantAddress
                                          ? currentProperty.applicantAddress
                                          : "NA"}
                                      </td>
                                    </tr> */}
                                      <tr>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            color: "#2e008b",
                                            padding: "5px",
                                          }}
                                        >
                                          <span className="text-start">
                                            Remark / Summary
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            border: "1px solid #d1d1d1",
                                            width: "250px",
                                            color: "black",
                                            padding: "5px",
                                          }}
                                        >
                                          {" "}
                                          {currentProperty.remark
                                            ? currentProperty.remark
                                            : "N.A."}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="row text-center mt-3">
                                  <div className="col-lg-12">
                                    <div
                                      className="btn btn-color w-25 m-1"
                                      onClick={() =>
                                        PropertyInfoHandler(
                                          currentProperty.orderId
                                        )
                                      }
                                      title="Download Pdf"
                                    >
                                      Download
                                    </div>
                                    <button
                                      className="btn btn-color w-25 text-center"
                                      onClick={() => setModalIsPopupOpen(false)}
                                    >
                                      Ok
                                    </button>
                                  </div>
                                </div>

                                {/* <div
                                className="text-center"
                                style={{ display: "flex", flexDirection: "column" }}
                              >
                                <label>Property Value : ${bidLowerRangeRef}</label>
                                <label>community Type : {communityRef}</label>
                                <label>Property type : {buildinRef}</label>
                                <label>
                                  {streetNameRef} {streetNumberRef} {cityRef}
                                </label>
                                <label>zipCode : {zipCodeRef}</label>
                                <label>
                                  Property By : {applicantFirstName} {applicantLatsName}
                                </label>
                                <label>
                                  {applicantEmail} - {applicantNumber}
                                </label>
        
                                <button
                                  className="btn w-35 btn-white"
                                  onClick={() => finalSubmitHandler()}
                                >
                                  OK
                                </button>
                              </div> */}
                              </div>
                            </div>
                          )}
                        </div>

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
              <div className="col-lg-12 mt20">
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
            {!openModal && (
              <div className="modal">
                <div className="modal-content">
                  <h4 className="text-center">Cancel Confirmation</h4>
                  <hr />
                  <p className="text-center" style={{ fontSize: "16px" }}>
                    Are you sure you want to cancel the property : <br />
                    <span className="fw-bold">
                      {property.streetNumber}
                      {property.streetName}
                      {property.city}
                      {property.province}
                      {property.zipCode}
                    </span>
                    ?
                  </p>
                  <hr />
                  {/* <p>Are you sure you want to delete the property: {property.area}?</p> */}
                  <div className=" col-lg-12 text-center" style={{}}>
                    <button
                      className="btn w-25 btn-color m-1"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn w-25 btn-color"
                      onClick={handleDelete}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {modalOpen && (
              <div className="modal">
                <div className="modal-content">
                  {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}

                  <h2>{isHoldProperty ? "Confirm Hold" : "Cancel"}</h2>
                </div>

                <hr />

                <div
                  style={{
                    marginLeft: "10%",
                    fontSize: "15px",
                    marginTop: "2%",
                  }}
                >
                  <p>We have already redirected you to the paypal page.</p>
                  <p>
                    Don&apos;t <span style={{ color: "red" }}>reload</span> or{" "}
                    <span style={{ color: "red" }}>refresh</span> the page
                  </p>
                </div>

                <p>Please checkout for further</p>
                <p>
                  Your selected Package{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "23px",
                      color: "#2e008b",
                    }}
                  ></span>{" "}
                  with value{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "23px",
                      color: "#2e008b",
                    }}
                  ></span>
                </p>
                <button onClick={isHoldProperty ? onHoldHandler : onCancelHandler}>Submit</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
