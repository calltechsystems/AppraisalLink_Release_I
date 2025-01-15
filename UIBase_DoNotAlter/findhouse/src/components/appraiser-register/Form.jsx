import { useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { encryptionData } from "../../utils/dataEncryption";

const Form = ({
  setModalIsOpenError,
  setErrorMessage,
  setCloseRegisterModal,
}) => {
  const emailRegisterRef = useRef();
  const [isLoading, setLoading] = useState(false);

  const registerHandler = async (event) => {
    event.preventDefault();

    const email = emailRegisterRef.current.value;

    if (!email) {
      setErrorMessage("Email cannot be empty.");
      setModalIsOpenError(true);
      // return;
    } else {
      const userData = JSON.parse(localStorage.getItem("user"));

      const data = {
        email,
        companyId: userData.appraiserCompany_Datails.appraiserCompanyId, // Replace with actual company ID
      };

      try {
        const encryptedData = encryptionData(data);
        setLoading(true);
        toast.loading("Registering user...");
        await axios.post("/api/registerByCompany", encryptedData);
        toast.dismiss();
        toast.success("User registered successfully!");
      } catch (err) {
        toast.dismiss();
        toast.error(err.response?.data?.message || "An error occurred.");
      } finally {
        // setLoading(false);
      }
    }
    // setDisable(false);
  };

  return (
    <div className="row mt-4">
      <div className="col-lg-12">
        <form onSubmit={registerHandler}>
          {/* Email Input */}
          <div className="form-group input-group position-relative">
            <input
              type="email"
              className="form-control"
              placeholder="Username / Email"
              ref={emailRegisterRef}
              required
            />
            <div className="input-group-text m-2" style={{}}>
              <FaEnvelope />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-lg-12 text-center mt-4">
            <button
              type="button"
              onClick={() => setCloseRegisterModal(false)}
              className="btn btn-color w-25 mx-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-25 mx-1 btn btn-color w-25"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
