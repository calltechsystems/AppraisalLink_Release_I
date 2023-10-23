import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

// function onChange(value) {
//   console.log("Captcha value:", value);
// }

const Form = () => {
  return (
    <form
      className="contact_form bg-dark p-3"
      action="#"
      style={{ borderRadius: "5px" }}
    >
      <div className="row">
        <div className="col-lg-3 text-center">
          <div className="wrap-custom-file mt-3 mb-5">
            <img
              style={{ borderRadius: "50%",}}
              src="/assets/images/team/avtar.jpg"
              alt="Uploaded Image"
            />
          </div>
          {/* End .col */}
        </div>
        <div className="col-lg-9">
          <div className="row mb-2">
            <div className="col-lg-6">
              <div className="form-group">
                <ul>
                  <li className="text-light mt-3">
                    {/* <span className="text-light fw-bold">First Name</span> :{" "} */}
                    <span
                      className="text-light fw-bold"
                      style={{ fontSize: "21px" }}
                    >
                      {" "}
                      Name : Shubhendra Patel
                    </span>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-light mt-0">
                    <p className="text-light" style={{ fontSize: "18px" }}>
                     Company : Calltech Systems Pvt. Ltd.
                    </p>
                    {/* <span className="text-light fw-bold">Middle Name</span> :{" "}
                    <span className="text-light fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-light mt-0">
                    <p className="text-light" style={{ fontSize: "17px" }}>
                     Email : patelshubhendra@gmail.com
                    </p>
                    {/* <span className="text-light fw-bold">Middle Name</span> :{" "}
                    <span className="text-light fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-light mt-0">
                    <p className="text-light" style={{ fontSize: "17px" }}>
                      Phone : 9977543620
                    </p>
                    {/* <span className="text-light fw-bold">Last Name</span> :{" "}
                    <span className="text-light fw-bold"> Patel </span> */}
                  </li>
                </ul>
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6">
              <div className="form-group">
                <ul>
                  <li className="text-light mt-3">
                    {/* <span className="text-light fw-bold">First Name</span> :{" "} */}
                    <span
                      className="text-light"
                      style={{ fontSize: "17px" }}
                    >
                      {" "}
                     Address : Flat No.35 Vaishanv Block
                    </span>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-light mt-0">
                    <p className="text-light" style={{ fontSize: "17px", marginLeft:'4.8rem' }}>
                      Narayan Nagar
                    </p>
                    {/* <span className="text-light fw-bold">Middle Name</span> :{" "}
                    <span className="text-light fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-light mt-0">
                    <p className="text-light" style={{ fontSize: "17px", marginLeft:'4.8rem' }}>
                      Bhopal, Madhya Pradesh
                    </p>
                    {/* <span className="text-light fw-bold">Middle Name</span> :{" "}
                    <span className="text-light fw-bold"> Devendra </span> */}
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <ul>
                  <li className="text-light mt-0">
                    <p className="text-light" style={{ fontSize: "17px", marginLeft:'4.8rem' }}>
                      462023
                    </p>
                    {/* <span className="text-dark fw-bold">Last Name</span> :{" "}
                    <span className="text-dark fw-bold"> Patel </span> */}
                  </li>
                </ul>
              </div>
            </div>
            {/* End .col */}

            
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
