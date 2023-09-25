"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { encryptionData } from "../../../utils/dataEncryption";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";

const ProfileInfo = ({ setProfileCount}) => {

  
  
  const [profilePhoto,setProfilePhoto] = useState(null);
  const userData = (JSON.parse(localStorage.getItem("user")));
  const router = useRouter();

  
  

  const [SelectedImage , setSelectedImage] = useState("/assets/images/team/Gary-Avatar.png");

  const [edit,setEdit]=useState((!userData.firstName));
  
  const firstNameRef = useRef(userData.firstName || "");
  const middleNameRef = useRef(userData.middleName || "");
  const lastNameRef = useRef(userData.lastName || "");
  const companyNameRef = useRef(userData.companyName || "");

  const [profile, setProfile] = useState(userData.profileImage || null);

  const addressLineRef = useRef(userData.adressLine1 || "");
  const addressLineTwoRef = useRef(userData.adressLine2 || "");

  const cityRef = useRef(userData.city || "");
  const stateRef = useRef(userData.state || "");
  const zipcodeRef = useRef(userData.zipCode || "");
  const phoneNumberRef = useRef(userData.phoneNumber || "");

  const mortgageBrokrageLicNoRef = useRef(userData.mortageBrokerageLicNo || "");
  const mortgageBrokerLicNoRef = useRef(userData.mortageBrokerLicNo || "");

  const uploadProfile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataUrl = event.target.result;


        setProfilePhoto(dataUrl);
      };

      reader.readAsDataURL(file);
    }

    console.log( typeof(profilePhoto));

  };

  const onUpdatHandler = ()=>{
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const adressLine1 = addressLineRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const zipCode = zipcodeRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const mortageBrokerLicNo = mortgageBrokerLicNoRef.current.value;
    const mortageBrokerageLicNo = mortgageBrokrageLicNoRef.current.value;

    const adressLine2 = addressLineTwoRef.current.value;
    const middleName = middleNameRef.current.value;
    const companyName = companyNameRef.current.value;

    if(!firstName || !lastName || !adressLine1 || !city || !state || !zipCode || !phoneNumber || !mortageBrokerLicNo ||
    ! mortageBrokerageLicNo ){
      alert("All marked fields arent filled !!");
    }
    else{

      let count = 9;
        if(adressLine2){
          count++;
        }
        if(middleName){
          count++;
        }
        if(companyName){
          count++;
        }
        if(profilePhoto){
          count++;
        }

        const percentage = Math.floor(count / 13 ) * 100;
        setProfileCount(percentage);

        const payload = {
          id: userData.userId,
          token : userData.token,
          firstName : firstName,
          middleName : middleName,
          lastName : lastName,
          companyName : companyName,
          licenseNo : mortageBrokerLicNo,
          brokerageName : firstName,
          adressLine1 : adressLine1,
          adressLine2 : adressLine2,
          city : city,
          state : state,
          zipCode : zipCode,
          area : city,
          phoneNumber : phoneNumber,
          mortageBrokerLicNo : mortageBrokerLicNo,
          mortgageBrokerageLicNoRef : mortageBrokerageLicNo,
          profileImage : SelectedImage
        };

        console.log(payload);

        const encryptedData = encryptionData(payload);
        axios
      .put("/api/updateBrokerProfile", encryptedData)
      .then((res) => {
        console.log(res);
        alert("Successfully Logged In!");
        localStorage.removeItem("user");
        localStorage.setItem("user",JSON.stringify(res.data));
        router.push("/my-dashboard");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
      });

    }

  }

  const changeEditHandler = ()=>{
    setEdit(true);
  }
  const uploadInputRef = useRef(null);

  const openWidget = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click(); // Trigger the hidden file input
    }
  };

  const handleUpload = (result) => {
    // Handle the image upload result here
    console.log("handleUpload called");
    if (result.info.secure_url) {
      setSelectedImage(result.info.secure_url);
      setProfilePhoto(result.info.secure_url);
      // You can also save the URL to your state or do other operations here
    } else {
      // Handle the case when the upload failed
      console.error("Image upload failed");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    const url = uploadImage(file);
    console.log(url);
  };


  return (
    <div className="row">
      <h4 className="mb-3">Personal Information</h4>
      <div className="col-lg-12"></div>
      { !edit && ( <div>
        <button 
        className="btn btn2 btn-dark profile_edit_button"
        onClick={changeEditHandler}
        >
       Edit
        </button>
      </div>)}
      <div className="col-lg-12 col-xl-12 mt-2">
        <div className="my_profile_setting_input form-group">
          <div className="row">
            <div className="col-lg-4">
            <div className="wrap-custom-file">
            <img src={SelectedImage} alt="Uploaded Image"/>
            <CldUploadWidget
              onUpload={handleUpload}
              uploadPreset="mpbjdclg"
              options={{
                cloudName:"dcrq3m6dx", // Your Cloudinary upload preset
                maxFiles: 1,
              }}
            >
              {({ open }) => (
                <div>
                  <button
                    className="btn btn-dark profile_edit_button"
                    onClick={open} // This will open the upload widget
                  >
                    Upload Photo
                  </button>
                </div>
              )}
            </CldUploadWidget>
          </div>
            </div>
            <div className="col-lg-8">
              <div className="row mb-2">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    First Name <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.firstName ? userData.firstName : "Enter your first name"}
                    ref={firstNameRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Middle Name :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.middleName ? userData.middleName : "Enter your middle name"}
                    ref={middleNameRef}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Last Name <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.lastName ? userData.lastName : "Enter your  last name"}
                    ref={lastNameRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Company Name{" "}
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.companyName ? userData.companyName : "Enter your  company name"}
                    ref={companyNameRef}                 
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Address Line 1 <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.adressLine1 ? userData.adressLine1 : "Enter your address line 1"} 
                    ref={addressLineRef}                
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Address Line 2 :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.adressLine2 ? userData.adressLine2 : "Enter your address line 2"}
                    ref={addressLineTwoRef}                 
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    City <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.city ? userData.city : "Enter your city"} 
                    ref={cityRef}                
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    State <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.state ? userData.state : "Enter your state"} 
                    ref={stateRef}                
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Zip-Code <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.zipCode ? userData.zipCode : "Enter your zipcode"}     
                    ref={zipcodeRef}            
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Phone Number <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.phoneNumber ? userData.phoneNumber : "Enter your phoneNumber"}
                    ref={phoneNumberRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 mb-2">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Mortgage Brokerage Lic. No. <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.mortageBrokerageLicNo ? userData.mortageBrokerLicNo : "Enter your Bokerage Lic No"}
                    ref={mortgageBrokrageLicNoRef}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <label htmlFor="" style={{ paddingTop: "15px", fontWeight:'lighter'}}>
                    Mortgage Broker Licence No. <span class="req-btn">*</span> :
                  </label>
                </div>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput3"
                    placeholder={userData.mortageBrokerLicNo ? userData.mortageBrokerLicNo : "Enter your Broker Lic No"}
                    ref={mortgageBrokerLicNoRef}
                    
                    disabled={!edit}
                  />
                </div>
              </div>
              { edit && (<div className="row mt-4">
                <div className="col-xl-12">
                  <div className="my_profile_setting_input" style={{textAlign:"end"}}>
                    {/* <button className="btn btn1">Save Details</button> */}
                    <button className="btn btn2 btn-dark" onClick={onUpdatHandler}>
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
