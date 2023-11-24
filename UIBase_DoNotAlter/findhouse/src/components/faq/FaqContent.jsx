import Link from "next/link";

const FaqContent = () => {
  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div id="headingOne">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              Ques1. I forgot my password. How can I reset it?
            </button>
          </div>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              <p> Please follow below steps to reset your password :-</p>
              <ul>
                <li>
                  1. Look for a link or button that says "Forgot Password".{" "}
                </li>
                <li>
                  2. Provide the email address or username associated with your
                  account.{" "}
                </li>
                <li>
                  3. You will receive a one-time password (OTP) on your
                  registered email address.{" "}
                </li>
                <li>
                  4. Once you have entered the correct OTP, you should be
                  prompted to create a new password.{" "}
                </li>
                <li>
                  5. After resetting your password, use the new password to log
                  in to your account.{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* End .card */}

        <div className="card">
          <div id="headingTwo">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Ques2. Why am I not receiving the password reset OTP email?
            </button>
          </div>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse show"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              <p>
                Ans. If you are not receiving the password reset OTP email,
                check your spam folder, verify the correct email address, or
                contact our support team for assistance.{" "}
              </p>
            </div>
          </div>
        </div>
        {/* End .card */}

        <div className="card">
          <div id="headingThree">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Ques3. I am having trouble logging in. What should I do?
            </button>
          </div>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              <p>
                Ans. If you are having trouble logging in, click "Forgot
                Password" for a password reset or contact our support team via
                the "Contact Us" section on our website.
              </p>
            </div>
          </div>
        </div>
        {/* End .card */}

        <div className="card">
          <div id="headingFour">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Ques4. Can I use my account login on multiple devices?
            </button>
          </div>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              <p>
                Ans. No, your account login is typically restricted to one
                device at a time for security reasons.
              </p>
            </div>
          </div>
        </div>
        {/* End .card */}

        <div className="card">
          <div id="headingFive">
            <button
              className="btn btn-link accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Ques5. Can I update my profile information after creating an
              account login?
            </button>
          </div>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            <div className="card-body">
              <p>
                Ans. Yes Please follow instructions for updating the profile.
              </p>
              <ul>
                <li>
                  1. Login to Your Account on website{" "}
                  <Link href="/">appraisal-eta.vercel.app</Link>{" "}
                </li>
                <li>2. Navigate to Profile. </li>
                <li>3. Locate the Edit or Update Option. </li>
                <li>4. Update Your Information. </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqContent;
