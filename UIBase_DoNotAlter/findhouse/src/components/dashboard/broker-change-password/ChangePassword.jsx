import axios from "axios";
import { useRef } from "react";
import { useReducer } from "react";
import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";



const ChangePassword = () => {
  const oldPasswordRef = useRef("");
  const newPasswordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const emailRef = useRef("");
  const userData = (JSON.parse(localStorage.getItem("user"))) || {};

  const router = useRouter();

  const submitHandler = async () =>{
    
    const email = emailRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    console.log(oldPassword,newPassword,confirmPassword);
    if(String(newPassword) !== String(confirmPassword)){
      alert("Both the passwords should be same ");
    }
    else{
     try{
       const payload = {
        email : email,
        oldPassword : oldPassword,
        newPassword : newPassword,
        token : userData.token
      };

      const encryptedData = encryptionData(payload);

      const response = await axios.post("/api/change-broker-password",encryptedData);
      if(!response){
        alert("Failed Try Again");
      }
      else{
        alert("Successfully Updated Password!!");
        localStorage.removeItem("user");
        router.push("/login");
      }
    }
    catch(err){
      alert(err.message);
    }
    }
  }
    return (
      <>
        <div className="row">
        <h4 className="mb-3">Manage Password</h4>
        <div class="accordion" id="accordionExample">
         <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
           <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Change Password
          </button>
          </h2>
           <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
           <div class="accordion-body">
          <div className="row">

          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleConfPass">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleConfPass"
                ref={emailRef}
                value={userData.userEmail}
              />
            </div>
          </div>

           <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleOldPass">Old Password</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleOldPass"
                placeholder="alitfn"
                ref={oldPasswordRef}
              />
            </div>
          </div>
          {/* End .col */}
  
          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleNewPass">New Password</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleNewPass"
                ref={newPasswordRef}
              />
            </div>
          </div>
          {/* End .col */}

      
  
          <div className="col-lg-6 col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleConfPass">
                Confirm New Password
              </label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleConfPass"
                ref={confirmPasswordRef}
              />
            </div>
          </div>
          {/* End .col */}
  
          <div className="col-xl-12">
            <div className="my_profile_setting_input float-start fn-520">
              <button className="btn btn2 btn-dark" onClick={submitHandler}>Update Password</button>
            </div>
          </div>
          {/* End .col */}
  
         </div>
        </div>
        </div>
      </div>
    </div>
        </div>
        {/* End .row */}
  
        <div className="row">
          
        </div>
      </>
    );
  };
  
  export default ChangePassword;
  