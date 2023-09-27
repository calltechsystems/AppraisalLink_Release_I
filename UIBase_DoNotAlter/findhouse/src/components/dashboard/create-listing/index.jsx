import { useRef, useState } from "react";

import { useRouter } from "next/router";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";

const Index = ({isView,propertyData}) => {
  const [isDisable,setDisable] = useState(isView);

  const userData = (JSON.parse(localStorage.getItem("user")));
  
  const router = useRouter();


  const streetNameRef = useRef( null);
  const streetNumberRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipCodeRef = useRef( null);
  const areaRef = useRef(null);
  const communityRef = useRef(null);
  const buildinRef = useRef(null);
  const urgencyRef = useRef(null);
  
  const applicantFirstName = useRef(null);
  const applicantLatsName  = useRef(null);
  const applicantNumber = useRef(null);
  const applicantEmail = useRef(null);



  const updateHandler = ()=>{
    const payload = {
        userId : userData.userId,
        streetName : streetNameRef.current.value,
        streetNumber : streetNumberRef.current.value,
        city : cityRef.current.value,
        state : stateRef.current.value,
        zipCode : zipCodeRef.current.value,
        area : areaRef.current.value,
        community : communityRef.current.value,
        typeOfBuilding : buildinRef.current.value,
        applicantFirstName : applicantFirstName.current.value||"",
        applicantLastName : applicantLatsName.current.value||"",
        applicantPhoneNumber : applicantNumber.current.value||"",
        bidLowerRange : 0,
        bidUpperRange : 0,
        urgency : urgencyRef.current.value,
        propertyStatus : true,
        token:userData.token
    };

    console.log("inside");

    const encryptedData = encryptionData(payload);
    
    axios
      .post("/api/addPropertyByBroker", encryptedData,
       {
        headers: {
          Authorization:`Bearer ${userData.token}`,
          "Content-Type":"application/json"
        },
      })
      .then((res) => {
        alert("Successfully Added the property!");
        router.push("/my-properties");
      })
      .catch((err) => {
        alert(err.message);
      });



  }
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
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
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
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">{isView?  "View the selected  property": "Add New Property"}</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  
                  <div className="my_dashboard_review ">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb30">1. location Information</h4>
                      </div>
                      {isDisable && (<div style={{marginLeft:"80%",marginBottom:"1%"}}><button  style={{borderRadius:"10%",backgroundColor:"#2e008b",color:"white"}} onClick={()=>setDisable(false)}>Edit</button></div>)}
                      <LocationField 
                      isDisable={isDisable}
                      streetNameRef = {streetNameRef}
                      streetNumberRef = {streetNumberRef}
                      cityRef = {cityRef}
                      stateRef = {stateRef}
                      zipCodeRef = {zipCodeRef}
                      areaRef = {areaRef} 
                      setDisable={setDisable}/>
                    </div>
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h4 className="mb30">2. Other Information</h4>
                     
                    </div>
                    <CreateList isDisable={isDisable}
                    communityRef = {communityRef}
                      buildinRef = {buildinRef}
                      urgencyRef = {urgencyRef}
                    setDisable={setDisable}/>
                  </div>

                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb30">3. Applicant Information</h4>
                      </div>
                      <DetailedInfo 
                      isDisable={isDisable}
                      applicantFirstName={applicantFirstName}
                      applicantLatsName={applicantLatsName}
                      applicantNumber={applicantNumber}
                      applicantEmail={applicantEmail}
                      updateHandler = {updateHandler}
                       setDisable={setDisable} />
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

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2023 Appraisal Link. All Rights Reserved.</p>
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
