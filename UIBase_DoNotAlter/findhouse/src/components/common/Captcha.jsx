import { useState } from "react";
import Image from "next/image";

const Captcha = () => {
  const [verified, setVerified] = useState(false);

  const [user, setUser] = useState({
    username: "",
  });
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
  // const allCharsLength = allChars.length;

  function generateString(length) {
    let result = "";
    const charactersLength = allChars.length;
    for (let i = 0; i < length; i++) {
      result += allChars.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const captcha = generateString(6); // Function called here and save in captcha variable
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);

    var element = document.getElementById("succesBTN");
    var inputData = document.getElementById("inputType");
    var login = document.getElementById("login");
    //    var signup = document.getElementById("signup")

    element.style.cursor = "wait";
    element.innerHTML = "...";
    //  inputData.disabled = true;
    element.disabled = true;
    var myFunctions = function () {
      if (captcha == user.username) {
        element.style.backgroundColor = "green";
        // element.style.marginTop   = "20px";
        element.innerHTML = "✔";
        element.disabled = true;
        login.disabled = false;
        //   signup.disabled = false;
        element.style.cursor = "not-allowed";
        // inputData.style.display = "none";

        setVerified(true);
      } else {
        element.style.backgroundColor = "red";
        element.style.cursor = "not-allowed";
        element.innerHTML = "✗";
        element.disabled = true;
        //  element.disabled = true;
        var myFunction = function () {
          element.style.backgroundColor = "#007bff";
          element.style.cursor = "pointer";
          element.innerHTML = "!";
          element.disabled = false;
          inputData.disabled = false;
          // inputData.value ='';
        };
        setTimeout(myFunction, 2000);
      }
    };
    setTimeout(myFunctions, 2000);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <h4 id="captcha" className="bg-imgg text-captcha">
            {captcha}
          </h4>
          <Image
            width={60}
            height={45}
            className="w-100 mb-2 mt-0 cap-img"
            src="/assets/images/home/bg.png"
          />
        </div>
        <div className="col-lg-6">
          <input
            type="text"
            id="inputType"
            className="form-control mr"
            placeholder="Enter Captcha"
            name="username"
            onChange={handleChange}
            autocomplete="off"
          />
          <button
            type="button"
            id="succesBTN"
            className="btn btn-primary w-25 btn-captcha"
          >
            !
          </button>
        </div>
        <div className="col-lg-2 text-end"></div>
      </div>

      <div className="mt-0"></div>
      {/* End input-group */}
    </>
  );
};

export default Captcha;
