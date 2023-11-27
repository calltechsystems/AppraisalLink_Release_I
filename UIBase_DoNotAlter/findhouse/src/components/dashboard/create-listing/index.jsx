"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu_02";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import LocationField from "./LocationField";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import toast from "react-hot-toast";

const Index = ({ isView, propertyData }) => {
  const router = useRouter();

  const [isDisable, setDisable] = useState(isView);
  const [modalOpen, setModalOpen] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  let userData = {};
  const [updatedProperty, setUpdatedProperty] = useState([]);

  const [streetNameRef, setStreetNameRef] = useState(
    propertyData?.streetName ? propertyData?.streetName : ""
  );
  const [streetNumberRef, setStreetNumberRef] = useState(
    propertyData?.streetNumber || ""
  );
  const [cityRef, setCityRef] = useState(propertyData?.city || "");
  const [stateRef, setStateRef] = useState(propertyData?.state || "");
  const [zipCodeRef, setZipCodeRef] = useState(propertyData?.zipCode || null);
  const [areaRef, setAreaRef] = useState(propertyData?.area || 0);
  const [communityRef, setCommunityRef] = useState(
    propertyData?.community || null
  );
  const [buildinRef, setBuildinRef] = useState(
    propertyData?.typeOfBuilding || null
  );
  const [urgencyRef, setUrgencyRef] = useState(propertyData?.urgency || 0);
  const [bidLowerRangeRef, setBidLowerRangeRef] = useState(
    propertyData?.bidLowerRange || 0
  );

  const [applicantFirstName, setApplicantFirstName] = useState(
    propertyData?.applicantFirstName || null
  );
  const [applicantLatsName, setApplicantLastName] = useState(
    propertyData?.applicantLastName || null
  );
  const [applicantNumber, setApplicantNumber] = useState(
    propertyData?.applicantPhoneNumber || null
  );
  const [applicantEmail, setApplicantEmail] = useState(
    propertyData?.applicantEmailAddress || null
  );

  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData.userSubscription.$values);

    if (!userData) {
      router.push("/login");
    }
    // else if( userData.userSubscription.$values !== null ){
    //   router.push("/my-plans");
    // }
    else if (userData?.broker_Details?.firstName === "") {
      router.push("/my-profile");
    }
  }, []);

  const onCancelModalHandler = () => {
    window.location.reload();
  };
  const updateHandler = () => {
    const nameRegex = /^[A-Za-z][A-Za-z\s'-]*[A-Za-z]$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const phoneNumberRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    const userInfo = JSON.parse(localStorage.getItem("user"));

    const payload = {
      userId: userInfo.userId,
      propertyId: propertyData?.propertyId,
      streetName: streetNameRef,
      streetNumber: streetNumberRef,
      city: cityRef,
      state: stateRef,
      zipCode: zipCodeRef,
      area: areaRef,
      community: communityRef,
      typeOfBuilding: buildinRef,
      applicantFirstName: applicantFirstName,
      applicantLastName: applicantLatsName,
      applicantPhoneNumber: applicantNumber,
      applicantEmail: applicantEmail || propertyData?.applicantEmail,
      bidLowerRange: Number(bidLowerRangeRef),
      bidUpperRange: Number(bidLowerRangeRef),
      urgency: propertyData?.urgency === 0 ? 0 : 1,
      propertyStatus: true,
      token: userInfo.token,
    };
    if (
      !payload.streetName ||
      !payload.streetNumber ||
      !payload.city ||
      !payload.state ||
      !payload.zipCode ||
      !payload.typeOfBuilding ||
      !payload.community ||
      !payload.area
    ) {
      toast.error("All required fields must be filled");
    } else {
      const encryptedData = encryptionData(payload);

      toast.loading("Updating the property..");
      axios
        .put("/api/addPropertyByBroker", encryptedData, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          toast.dismiss();
          setModalIsOpen(true);
          // router.push("/my-properties");
        })
        .catch((err) => {
          toast.dismiss();
          toast.error(err.response.data.error);
        });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onCancelHandler = () => {
    setModalIsOpen(false);
    router.push("/create-listing");
  };

  const submitHandler = () => {
    setModalIsOpen(true);
  };

  const finalSubmitHandler = () => {
    setModalIsOpen(false);
    const nameRegex = /^[A-Za-z][A-Za-z\s'-]*[A-Za-z]$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const phoneNumberRegex = /^\d{10}$/;

    if (
      (!nameRegex.test(applicantFirstName) && applicantFirstName) ||
      (!nameRegex.test(applicantLatsName) && applicantLatsName) ||
      (!phoneNumberRegex.test(applicantNumber) && applicantNumber) ||
      (!emailRegex.test(applicantEmail) && applicantEmail)
    ) {
      toast.error("Please provide a valid applicant Information");
    } else {
      const payload = {
        userId: userInfo.userId,
        streetName: streetNameRef,
        streetNumber: streetNumberRef,
        city: cityRef,
        state: stateRef,
        zipCode: zipCodeRef,
        area: areaRef,
        community: communityRef,
        typeOfBuilding: buildinRef,
        applicantFirstName: applicantFirstName,
        applicantLastName: applicantLatsName,
        applicantPhoneNumber: applicantNumber,
        applicantEmail: applicantEmail || userData.userEmail,
        bidLowerRange: Number(bidLowerRangeRef),
        bidUpperRange: Number(bidLowerRangeRef),
        urgency: propertyData?.urgency === 0 ? 0 : 1,
        propertyStatus: true,
        token: userInfo.token,
      };

      console.log(payload);

      if (
        !payload.streetName ||
        !payload.streetNumber ||
        !payload.city ||
        !payload.state ||
        !payload.zipCode ||
        !payload.typeOfBuilding ||
        !payload.community ||
        !payload.area
      ) {
        toast.error("All required fields must be filled");
      } else {
        const encryptedData = encryptionData(payload);

        console.log(payload);
        toast.loading("Appraising property ..");
        axios
          .post("/api/addBrokerProperty", encryptedData, {
            headers: {
              Authorization: `Bearer ${userData.token}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            toast.dismiss();
            // setModalIsOpen(true);
            router.push("/my-properties");
          })
          .catch((err) => {
            toast.dismiss();
            toast.error(err.message);
          });
      }
    }
  };

  const handleZipCodeChange = async (e) => {
    setZipCodeRef(e.target.value);

    try {
      const response = await axios.get(
        `https://api.zippopotam.us/us/${zipCodeRef}`
      );
      const data = response.data;

      setStateRef(data.places[0]["state"]);
      setCityRef(data.places[0]["place name"]);
    } catch (error) {
      // Handle API error or invalid zip code
      console.error("Error fetching location data:", error);
    }
  };

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
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div
          className="container-fluid ovh"
          style={{ marginLeft: "-10px", marginTop: "-40px" }}
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

                <div className="col-lg-12 ">
                  <div className="breadcrumb_content style2">
                    {/* <h2 className="breadcrumb_title text-center">{isView?  "View the selected  property": "Add New Property"}</h2> */}
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div
                        className="col-lg-12 bg-head text-center mb-4"
                        style={{ borderRadius: "5px" }}
                      >
                        <h4
                          className="text-light"
                          style={{ paddingTop: "10px" }}
                        >
                          Property Details
                          {/* <hr style={{ color: "#2e008b" }} /> */}
                        </h4>
                      </div>
                      <hr style={{ color: "#2e008b" }} />
                      {isDisable && (
                        <div style={{ marginLeft: "80%", marginBottom: "1%" }}>
                          <button
                            style={{
                              borderRadius: "10%",
                              backgroundColor: "#2e008b",
                              color: "white",
                            }}
                            onClick={() => setDisable(false)}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                      <LocationField
                        isDisable={isDisable}
                        streetNameRef={streetNameRef}
                        setStreetNameRef={setStreetNameRef}
                        streetNumberRef={streetNumberRef}
                        setStreetNumberRef={setStreetNumberRef}
                        cityRef={cityRef}
                        setCityRef={setCityRef}
                        stateRef={stateRef}
                        setStateRef={setStateRef}
                        handleZipCodeChange={handleZipCodeChange}
                        zipCodeRef={zipCodeRef}
                        areaRef={areaRef}
                        setAreaRef={setAreaRef}
                        setZipCodeRef={setZipCodeRef}
                        propertyData={propertyData}
                        setDisable={setDisable}
                        buildinRef={buildinRef}
                        setBuildinRef={setBuildinRef}
                        communityRef={communityRef}
                        setCommunityRef={setCommunityRef}
                        urgencyRef={urgencyRef}
                        setUrgencyRef={setUrgencyRef}
                        bidLowerRangeRef={bidLowerRangeRef}
                        setBidLowerRangeRef={setBidLowerRangeRef}
                      />
                    </div>
                  </div>
                  {/* <div className="my_dashboard_review mt30">
                    <div
                      className="col-lg-12 bg-head text-center mb-4"
                      style={{ borderRadius: "5px" }}
                    >
                      <h4 className="p-2 text-white">
                        Other Information
                      </h4>
                    </div>
                    <hr style={{ color: "#2e008b" }} />
                    <CreateList
                      isDisable={isDisable}
                      communityRef={communityRef}
                      setCommunityRef={setCommunityRef}
                      buildinRef={buildinRef}
                      setBuildinRef={setBuildinRef}
                      urgencyRef={urgencyRef}
                      setUrgencyRef={setUrgencyRef}
                      propertyData={propertyData}
                      bidLowerRangeRef={bidLowerRangeRef}
                      setBidLowerRangeRef={setBidLowerRangeRef}
                      setDisable={setDisable}
                    />
                  </div> */}

                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div
                        className="col-lg-12 bg-head text-center mb-4"
                        style={{ borderRadius: "5px" }}
                      >
                        <h4
                          className="text-white"
                          style={{ paddingTop: "10px" }}
                        >
                          Applicant Information
                          {/* <hr style={{ color: "#2e008b" }} /> */}
                        </h4>
                      </div>
                      <hr style={{ color: "#2e008b" }} />
                      <DetailedInfo
                        isDisable={isDisable}
                        applicantFirstName={applicantFirstName}
                        setApplicantFirstName={setApplicantFirstName}
                        applicantLatsName={applicantLatsName}
                        setApplicantLastName={setApplicantLastName}
                        applicantNumber={applicantNumber}
                        setApplicantNumber={setApplicantNumber}
                        applicantEmail={applicantEmail}
                        setApplicantEmail={setApplicantEmail}
                        updateHandler={updateHandler}
                        submitHandler={submitHandler}
                        propertyData={propertyData}
                        setDisable={setDisable}
                        onCancelHandler={onCancelHandler}
                      />
                    </div>
                  </div>
                  {/* <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property media</h3>
                    </div>
                    <PropertyMediaUploader />
                  </div> */}
                  {/* <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property Information</h3>
                    
                    </div>
                    <FloorPlans />
                </div>*/}
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}
              <div>
                {modalIsOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <h3 className="text-center">Property Submission</h3>
                      <p className="text-center mb-3">
                        All of the details on the assessed property are here.
                      </p>
                      <div className="d-flex justify-content-center">
                        <table
                          style={{
                            width: "450px",
                            textAlign: "center",
                            borderRadius: "5px",
                          }}
                        >
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Property Value</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {" "}
                              ${bidLowerRangeRef}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Community Type</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {communityRef}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Property Type</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {buildinRef}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">
                                Property Address
                              </span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {streetNameRef} {streetNumberRef} {cityRef}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Postal Code</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {" "}
                              {zipCodeRef}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Property By</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {" "}
                              {applicantFirstName} {applicantLatsName}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Email Address</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {" "}
                              {applicantEmail}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Phone Number</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "200px",
                              }}
                            >
                              {" "}
                              {applicantNumber}
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="row text-center mt-3">
                        <div className="col-lg-6">
                          <button
                            className="w-50 btn-color text-end"
                            onClick={onCancelHandler}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col-lg-6">
                          <button
                            className="w-50 btn-color"
                            onClick={() => finalSubmitHandler()}
                          >
                            Continue
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

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      &copy; {new Date().getFullYear()} Appraisal Link. All
                      Rights Reserved.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
