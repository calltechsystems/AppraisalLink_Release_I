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
import { typeOfBuilding } from "./data";

const Index = ({ isView, propertyData }) => {
  const router = useRouter();

  const [isDisable, setDisable] = useState(propertyData ? true : false);
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
  const [stateRef, setStateRef] = useState(propertyData?.province || "");
  const [zipCodeRef, setZipCodeRef] = useState(propertyData?.zipCode || null);
  const [errorLabel, setErrorLabel] = useState([]);
  const [urgencyType, setUrgencyType] = useState("");
  // const [areaRef, setAreaRef] = useState(propertyData?.area || 0);
  const [communityRef, setCommunityRef] = useState(
    propertyData?.community || ""
  );
  const [buildinRef, setBuildinRef] = useState(
    propertyData?.typeOfBuilding || null
  );
  const [urgencyRef, setUrgencyRef] = useState(propertyData?.urgency || null);
  const [bidLowerRangeRef, setBidLowerRangeRef] = useState(
    propertyData?.bidLowerRange || null
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

  const [estimatedValue, setEstimatedValue] = useState(
    propertyData?.estimatedValue || 0
  );
  const [typeOfAppraisal, setTypeOfAppraisal] = useState(
    propertyData?.typeOfAppraisal || ""
  );
  const [lenderInformation, setLenderInformation] = useState(
    propertyData?.lenderInformation || ""
  );
  const [applicantAddress, setApplicantAddress] = useState(
    propertyData?.applicantAddress || ""
  );
  const [attachment, setAttachment] = useState(propertyData?.attachment || "");
  const [purpose, setPurpose] = useState(propertyData?.purpose || "");

  const [otherTypeOfBuilding, setOtherTypeOfBuilding] = useState(false);
  const [otherPurpose, setOtherPurpose] = useState(false);

  const [otherTypeOfAppraisalValue, setOtherTypeOfAppraisalValue] =
    useState(false);

  const [otherUrgencyValue, setOtherUrgencyValue] = useState(false);

  const [otherTypeOfBuildingValue, setOtherTypeOfBuildingValue] =
    useState(false);
  const [otherPurposeValue, setOtherPurposeValue] = useState(false);

  const [otherTypeOfAppraisal, setOtherTypeOfAppraisal] = useState(false);

  const [otherUrgency, setOtherUrgency] = useState(false);

  const [image, setImage] = useState(propertyData?.image || "");

  const onChangeHandler = (value, field, otherField) => {
    console.log(value, field, otherField);
    if (String(value) === "Other") {
      otherField(true);
    } else {
      field(value);
    }
  };

  useEffect(() => {
    if (streetNameRef !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "streetName") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [streetNameRef]);

  useEffect(() => {
    if (streetNumberRef !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "streetNumber") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [streetNumberRef]);

  useEffect(() => {
    if (cityRef !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "city") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [cityRef]);

  useEffect(() => {
    if (stateRef !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "state") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [stateRef]);

  useEffect(() => {
    if (zipCodeRef !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "zipCode") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [zipCodeRef]);

  useEffect(() => {
    if (buildinRef !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "typeofBuilding") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [buildinRef]);

  useEffect(() => {
    if (purpose !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "purpose") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [purpose]);

  useEffect(() => {
    if (estimatedValue !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "estimatedValue") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [estimatedValue]);

  useEffect(() => {
    if (typeOfAppraisal !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "typeOfAppraisal") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [typeOfAppraisal]);

  useEffect(() => {
    if (applicantFirstName !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "applicantFirstName") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [applicantFirstName]);

  useEffect(() => {
    if (applicantLatsName !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "applicantLastName") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [applicantLatsName]);

  useEffect(() => {
    if (applicantNumber !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "applicantPhoneNumber") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
  }, [applicantNumber]);

  useEffect(() => {
    if (buildinRef !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "buildinRef") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
    if (String(buildinRef) === "Other") {
      setOtherTypeOfBuilding(true);
    } else {
      setOtherTypeOfBuilding(false);
    }
  }, [buildinRef]);

  useEffect(() => {
    if (typeOfAppraisal !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "typeOfAppraisal") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
    if (String(typeOfAppraisal) === "Other") {
      setOtherTypeOfAppraisal(true);
    } else {
      setOtherTypeOfAppraisal(false);
    }
  }, [typeOfAppraisal]);

  useEffect(() => {
    if (purpose !== "") {
      let updatedError = errorLabel.filter((err) => {
        if (String(err) === "purpose") return false;
        else return true;
      });
      setErrorLabel(updatedError);
    }
    if (String(purpose) === "Other") {
      setOtherPurpose(true);
    } else {
      setOtherPurpose(false);
    }
  }, [purpose]);

  useEffect(() => {
    if (String(urgencyRef) === "Rush") {
      setOtherUrgency(true);
    } else if (String(urgencyRef) === "Regular") {
      setOtherUrgency(false);
    }
  }, [urgencyRef]);
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
    setModalIsOpen(false);
    const nameRegex = /^[A-Za-z][A-Za-z\s'-]*[A-Za-z]$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const phoneNumberRegex = /^\d{10}$/;

    if (
      (!nameRegex.test(applicantFirstName) && applicantFirstName) ||
      (!nameRegex.test(applicantLatsName) && applicantLatsName)
    ) {
      toast.error("Please provide a valid applicant name");
    } else if (!emailRegex.test(applicantEmail) && applicantEmail) {
      toast.error("Please provide a valid email address");
    } else if (!phoneNumberRegex.test(applicantNumber) && applicantNumber) {
      toast.error("Please provide a valid phone number");
    } else {
      const payload = {
        userId: userInfo.userId,
        streetName: streetNameRef,
        streetNumber: streetNumberRef,
        city: cityRef,
        state: stateRef,
        zipCode: zipCodeRef,
        area: "",
        community: communityRef,
        applicantFirstName: applicantFirstName,
        applicantLastName: applicantLatsName,
        applicantPhoneNumber: applicantNumber,
        applicantEmail: applicantEmail || userData.userEmail,
        bidLowerRange: Number(bidLowerRangeRef),
        bidUpperRange: Number(bidLowerRangeRef),
        propertyStatus: true,
        estimatedValue: Number(estimatedValue),
        lenderInformation: lenderInformation,
        applicantAddress: applicantAddress,
        typeOfBuilding:
          String(buildinRef) === "Other"
            ? otherTypeOfBuildingValue
            : buildinRef,
        urgency:
          String(urgencyRef) === "Other" ? otherUrgencyValue : urgencyRef,
        typeOfAppraisal:
          String(typeOfAppraisal) === "Other"
            ? otherTypeOfAppraisalValue
            : typeOfAppraisal,
        purpose: String(purpose) === "Other" ? otherPurposeValue : purpose,

        attachment: "",
        image: "",
        token: userInfo.token,
      };
      if (
        !payload.streetName ||
        !payload.streetNumber ||
        !payload.city ||
        !payload.state ||
        !payload.zipCode ||
        !payload.typeOfBuilding
        // !payload.area
      ) {
        let tempError = errorLabel;

        if (!payload.streetName) {
          tempError.push("streetName");
        }
        if (!payload.streetNumber) {
          tempError.push("streetNumber");
        }
        if (!payload.city) {
          tempError.push("city");
        }
        if (!payload.state) {
          tempError.push("state");
        }
        if (!payload.zipCode) {
          tempError.push("zipCode");
        }
        if (!payload.typeOfBuilding) {
          tempError.push("typeOfBuilding");
        }
        if (!payload.estimatedValue) {
          tempError.push("estimatedValue");
        }
        if (!payload.purpose) {
          tempError.push("purpose");
        }
        if (!payload.typeOfAppraisal) {
          tempError.push("typeOfAppraisal");
        }
        if (!payload.applicantLastName) {
          tempError.push("applicantLastName");
        }
        if (!payload.applicantFirstName) {
          tempError.push("applicantFirstName");
        }
        if (!payload.applicantPhoneNumber) {
          tempError.push("applicantPhoneNumber");
        }
        if (!payload.applicantEmail) {
          tempError.push("applicantEmailAddress");
        }

        setErrorLabel(tempError);
      } else {
        setErrorLabel([]);
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
    }
  };

  const openModalForUpdateHandler = () => {
    const payload = {
      streetName: streetNameRef,
      streetNumber: streetNumberRef,
      city: cityRef,
      state: stateRef,
      zipCode: zipCodeRef,
      // area: areaRef,
      community: communityRef,
      applicantFirstName: applicantFirstName,
      applicantLastName: applicantLatsName,
      applicantPhoneNumber: applicantNumber,
      bidLowerRange: Number(bidLowerRangeRef),
      bidUpperRange: Number(bidLowerRangeRef),
      typeOfBuilding:
        String(buildinRef) === "Other" ? otherTypeOfBuildingValue : buildinRef,
      urgency: String(urgencyRef) === "Other" ? otherUrgencyValue : urgencyRef,
      typeOfAppraisal:
        String(typeOfAppraisal) === "Other"
          ? otherTypeOfAppraisalValue
          : typeOfAppraisal,
      purpose: String(purpose) === "Other" ? otherPurposeValue : purpose,
      propertyStatus: true,
      estimatedValue: estimatedValue,
      lenderInformation: lenderInformation,
      applicantAddress: applicantAddress,
    };
    if (
      !payload.streetName ||
      !payload.streetNumber ||
      !payload.city ||
      !payload.state ||
      !payload.zipCode ||
      !payload.typeOfBuilding ||
      !payload.typeOfAppraisal ||
      !payload.purpose ||
      !payload.estimatedValue
    ) {
      let tempError = [];

      if (!payload.streetName) {
        tempError.push("streetName");
      }
      if (!payload.streetNumber) {
        tempError.push("streetNumber");
      }
      if (!payload.city) {
        tempError.push("city");
      }
      if (!payload.state) {
        tempError.push("state");
      }
      if (!payload.zipCode) {
        tempError.push("zipCode");
      }
      if (!payload.typeOfBuilding) {
        tempError.push("typeOfBuilding");
      }
      if (!payload.estimatedValue) {
        tempError.push("estimatedValue");
      }
      if (!payload.purpose) {
        tempError.push("purpose");
      }
      if (!payload.typeOfAppraisal) {
        tempError.push("typeOfAppraisal");
      }
      if (!payload.applicantLastName) {
        tempError.push("applicantLastName");
      }
      if (!payload.applicantFirstName) {
        tempError.push("applicantFirstName");
      }
      if (!payload.applicantPhoneNumber) {
        tempError.push("applicantPhoneNumber");
      }
      if (!payload.applicantEmail) {
        tempError.push("applicantEmailAddress");
      }

      setErrorLabel(tempError);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Add smooth scrolling behavior
      });
    } else {
      setModalIsOpen(true);
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
    const payload = {
      streetName: streetNameRef,
      streetNumber: streetNumberRef,
      city: cityRef,
      state: stateRef,
      zipCode: zipCodeRef,
      community: communityRef,
      applicantFirstName: applicantFirstName,
      applicantLastName: applicantLatsName,
      applicantPhoneNumber: applicantNumber,
      bidLowerRange: Number(bidLowerRangeRef),
      bidUpperRange: Number(bidLowerRangeRef),
      typeOfBuilding:
        String(buildinRef) === "Other" ? otherTypeOfBuildingValue : buildinRef,
      urgency: String(urgencyRef) === "Other" ? otherUrgencyValue : urgencyRef,
      typeOfAppraisal:
        String(typeOfAppraisal) === "Other"
          ? otherTypeOfAppraisalValue
          : typeOfAppraisal,
      purpose: String(purpose) === "Other" ? otherPurposeValue : purpose,
      propertyStatus: true,
      estimatedValue: estimatedValue,
      lenderInformation: lenderInformation,
      applicantAddress: applicantAddress,
    };
    if (
      !payload.streetName ||
      !payload.streetNumber ||
      !payload.city ||
      !payload.state ||
      !payload.zipCode ||
      !payload.typeOfBuilding ||
      !payload.typeOfAppraisal ||
      !payload.purpose ||
      !payload.estimatedValue
    ) {
      let tempError = [];

      if (!payload.streetName) {
        tempError.push("streetName");
      }
      if (!payload.streetNumber) {
        tempError.push("streetNumber");
      }
      if (!payload.city) {
        tempError.push("city");
      }
      if (!payload.state) {
        tempError.push("state");
      }
      if (!payload.zipCode) {
        tempError.push("zipCode");
      }
      if (!payload.typeOfBuilding) {
        tempError.push("typeOfBuilding");
      }
      if (!payload.estimatedValue) {
        tempError.push("estimatedValue");
      }
      if (!payload.purpose) {
        tempError.push("purpose");
      }
      if (!payload.typeOfAppraisal) {
        tempError.push("typeOfAppraisal");
      }
      if (!payload.applicantLastName) {
        tempError.push("applicantLastName");
      }
      if (!payload.applicantFirstName) {
        tempError.push("applicantFirstName");
      }
      if (!payload.applicantPhoneNumber) {
        tempError.push("applicantPhoneNumber");
      }
      if (!payload.applicantEmail) {
        tempError.push("applicantEmailAddress");
      }

      setErrorLabel(tempError);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setModalIsOpen(true);
    }
  };

  const finalSubmitHandler = () => {
    setModalIsOpen(false);
    const nameRegex = /^[A-Za-z][A-Za-z\s'-]*[A-Za-z]$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const phoneNumberRegex = /^\d{10}$/;

    if (
      (!nameRegex.test(applicantFirstName) && applicantFirstName) ||
      (!nameRegex.test(applicantLatsName) && applicantLatsName)
    ) {
      toast.error("Please provide a valid applicant name");
    } else if (!emailRegex.test(applicantEmail) && applicantEmail) {
      toast.error("Please provide a valid email address");
    } else if (!phoneNumberRegex.test(applicantNumber) && applicantNumber) {
      toast.error("Please provide a valid phone number");
    } else {
      const payload = {
        userId: userInfo.userId,
        streetName: streetNameRef,
        streetNumber: streetNumberRef,
        city: cityRef,
        state: stateRef,
        zipCode: zipCodeRef,
        area: "",
        community: communityRef,
        applicantFirstName: applicantFirstName,
        applicantLastName: applicantLatsName,
        applicantPhoneNumber: applicantNumber,
        applicantEmail: applicantEmail || userData.userEmail,
        bidLowerRange: Number(bidLowerRangeRef),
        bidUpperRange: Number(bidLowerRangeRef),
        propertyStatus: true,
        estimatedValue: Number(estimatedValue),
        lenderInformation: lenderInformation,
        applicantAddress: applicantAddress,
        typeOfBuilding:
          String(buildinRef) === "Other"
            ? otherTypeOfBuildingValue
            : buildinRef,
        urgency:
          String(urgencyRef) === "Other" ? otherUrgencyValue : urgencyRef,
        typeOfAppraisal:
          String(typeOfAppraisal) === "Other"
            ? otherTypeOfAppraisalValue
            : typeOfAppraisal,
        purpose: String(purpose) === "Other" ? otherPurposeValue : purpose,

        attachment: "",
        image: "",
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
        !payload.typeOfAppraisal ||
        !payload.purpose ||
        !payload.estimatedValue
      ) {
        let tempError = errorLabel;

        if (!payload.streetName) {
          tempError.push("streetName");
        }
        if (!payload.streetNumber) {
          tempError.push("streetNumber");
        }
        if (!payload.city) {
          tempError.push("city");
        }
        if (!payload.state) {
          tempError.push("state");
        }
        if (!payload.zipCode) {
          tempError.push("zipCode");
        }
        if (!payload.typeOfBuilding) {
          tempError.push("typeOfBuilding");
        }
        if (!payload.estimatedValue) {
          tempError.push("estimatedValue");
        }
        if (!payload.purpose) {
          tempError.push("purpose");
        }
        if (!payload.typeOfAppraisal) {
          tempError.push("typeOfAppraisal");
        }
        if (!payload.applicantLastName) {
          tempError.push("applicantLastName");
        }
        if (!payload.applicantFirstName) {
          tempError.push("applicantFirstName");
        }
        if (!payload.applicantPhoneNumber) {
          tempError.push("applicantPhoneNumber");
        }
        if (!payload.applicantEmail) {
          tempError.push("applicantEmailAddress");
        }

        setErrorLabel(tempError);
      } else {
        const encryptedData = encryptionData(payload);

        if (propertyData) {
          toast.loading("Updating the property..");
          axios
            .put("/api/addPropertyByBroker", encryptedData, {
              headers: {
                Authorization: `Bearer ${userData.token}`,
                "Content-Type": "application/json",
              },
              params: {
                propertyId: propertyData.propertyId,
              },
            })
            .then((res) => {
              toast.dismiss();
              toast.success("Successfully submitted !!");
              setModalIsOpen(false);
              router.push("/my-properties");
            })
            .catch((err) => {
              toast.dismiss();
              toast.error(err.response.data.error);
            });
        } else {
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
              toast.success("Property Added Successfully");
              // setModalIsOpen(true);
              router.push("/my-properties");
            })
            .catch((err) => {
              toast.dismiss();
              toast.error(err.message);
            });
        }
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
                        errorLabel={errorLabel}
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
                  <div className="my_dashboard_review mt10">
                    <div
                      className="col-lg-12 bg-head text-center mb-4"
                      style={{ borderRadius: "5px" }}
                    >
                      <h4 className="p-2 text-white">
                        Additional Property Information
                      </h4>
                    </div>
                    <hr style={{ color: "#2e008b" }} />
                    <CreateList
                      isDisable={isDisable}
                      errorLabel={errorLabel}
                      // areaRef={areaRef}
                      // setAreaRef={setAreaRef}
                      communityRef={communityRef}
                      setCommunityRef={setCommunityRef}
                      buildinRef={buildinRef}
                      setBuildinRef={setBuildinRef}
                      urgencyRef={urgencyRef}
                      setUrgencyRef={setUrgencyRef}
                      propertyData={propertyData}
                      bidLowerRangeRef={bidLowerRangeRef}
                      setBidLowerRangeRef={setBidLowerRangeRef}
                      setEstimatedValue={setEstimatedValue}
                      setPurpose={setPurpose}
                      estimatedValue={estimatedValue}
                      purpose={purpose}
                      urgencyType={urgencyType}
                      setUrgencyType={setUrgencyType}
                      lenderInformation={lenderInformation}
                      typeOffAppraisal={typeOfAppraisal}
                      setLenderInformation={setLenderInformation}
                      setTypeOfAppraisal={setTypeOfAppraisal}
                      otherPurpose={otherPurpose}
                      setOtherTypeOfBuilding={setOtherTypeOfBuilding}
                      otherTypeOfAppraisal={otherTypeOfAppraisal}
                      otherUrgency={otherUrgency}
                      otherTypeOfBuilding={otherTypeOfBuilding}
                      onChangeHandler={onChangeHandler}
                      setDisable={setDisable}
                      setOtherPurposeValue={setOtherPurposeValue}
                      setOtherTypeOfAppraisalValue={
                        setOtherTypeOfAppraisalValue
                      }
                      otherUrgencyValue={otherUrgencyValue}
                      setOtherTypeOfBuildingValue={setOtherTypeOfBuildingValue}
                      setOtherUrgencyValue={setOtherUrgencyValue}
                    />
                  </div>

                  <div className="my_dashboard_review mt10">
                    <div className="row">
                      <div
                        className="col-lg-12 bg-head text-center mb-4"
                        style={{ borderRadius: "5px" }}
                      >
                        <h4
                          className="text-white"
                          style={{ paddingTop: "10px" }}
                        >
                          Applicant / Owner Information
                          {/* <hr style={{ color: "#2e008b" }} /> */}
                        </h4>
                      </div>
                      <hr style={{ color: "#2e008b" }} />

                      <DetailedInfo
                        isDisable={isDisable}
                        applicantFirstName={applicantFirstName}
                        setApplicantFirstName={setApplicantFirstName}
                        setApplicantAddress={setApplicantAddress}
                        applicantAddress={applicantAddress}
                        attachment={attachment}
                        image={image}
                        setImage={setImage}
                        setAttachment={setAttachment}
                        errorLabel={errorLabel}
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
                      <h3 className="text-center">Property Form</h3>
                      {/* <p className="text-center mb-3">
                        All of the details on the assessed property are here.
                      </p> */}
                      <div className="d-flex justify-content-center mt-2">
                        <table
                          style={{
                            width: "550px",
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
                              <span className="text-start">
                                Property Address
                              </span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "250px",
                              }}
                            >
                              {streetNumberRef} {streetNameRef} {cityRef}{" "}
                              {stateRef} {zipCodeRef}
                            </td>
                          </tr>
                          {/* <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Property Area</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "250px",
                              }}
                            >
                              {" "}
                              {areaRef} sqft
                            </td>
                          </tr> */}

                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">
                                {" "}
                                Type of Building
                              </span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "250px",
                              }}
                            >
                              {String(buildinRef) === "Other"
                                ? otherTypeOfBuildingValue
                                : buildinRef}
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
                                {" "}
                                Type of Appraisal
                              </span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "250px",
                              }}
                            >
                              {String(typeOfAppraisal) === "Other"
                                ? otherTypeOfAppraisalValue
                                : typeOfAppraisal}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start"> Purpose</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "250px",
                              }}
                            >
                              {String(purpose) === "Other"
                                ? otherPurposeValue
                                : purpose}
                            </td>
                          </tr>
                          {lenderInformation && (
                            <tr>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  color: "#2e008b",
                                }}
                              >
                                <span className="text-start">
                                  {" "}
                                  Lender Information
                                </span>
                              </td>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  width: "250px",
                                }}
                              >
                                {lenderInformation}
                              </td>
                            </tr>
                          )}

                          {communityRef && (
                            <tr>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  color: "#2e008b",
                                }}
                              >
                                <span className="text-start">Community</span>
                              </td>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  width: "250px",
                                }}
                              >
                                {communityRef}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">
                                Estimated Value / Purchased Price
                              </span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "250px",
                              }}
                            >
                              {" "}
                              $ {estimatedValue}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid grey",
                                color: "#2e008b",
                              }}
                            >
                              <span className="text-start">Urgency</span>
                            </td>
                            <td
                              style={{
                                border: "1px solid grey",
                                width: "250px",
                              }}
                            >
                              {" "}
                              {String(urgencyRef) === "Other"
                                ? otherUrgencyValue
                                : urgencyRef}
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
                                width: "250px",
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
                                width: "250px",
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
                                width: "250px",
                              }}
                            >
                              {" "}
                              {applicantNumber}
                            </td>
                          </tr>
                          {applicantAddress && (
                            <tr>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  color: "#2e008b",
                                }}
                              >
                                <span className="text-start">Address</span>
                              </td>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  width: "250px",
                                }}
                              >
                                {" "}
                                {bidLowerRangeRef}
                              </td>
                            </tr>
                          )}
                          {false && (
                            <tr>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  color: "#2e008b",
                                }}
                              >
                                <span className="text-start">
                                  Remark / Additional Information
                                </span>
                              </td>
                              <td
                                style={{
                                  border: "1px solid grey",
                                  width: "250px",
                                }}
                              >
                                {" "}
                                {bidLowerRangeRef}
                              </td>
                            </tr>
                          )}
                        </table>
                      </div>
                      <div className="row text-center mt-3">
                        <div className="col-lg-6">
                          <button
                            className="w-50 btn-color"
                            onClick={onCancelHandler}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col-lg-6">
                          <button
                            className="w-50 btn-color"
                            onClick={
                              propertyData ? finalSubmitHandler : updateHandler
                            }
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
