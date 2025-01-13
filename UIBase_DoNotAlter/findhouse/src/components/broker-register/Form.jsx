import { useState, useRef } from "react";
import { encryptionData } from "../../utils/dataEncryption";
import { useRouter } from "next/router";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Form = ({
  setModalIsOpenError,
  setErrorMessage,
  setCloseRegisterModal,
}) => {
  const [isLoading, setLoading] = useState(false);
  const emailRegisterRef = useRef();
  const router = useRouter();

  const registerHandler = (event) => {
    event.preventDefault();

    const email = emailRegisterRef.current.value;

    if (!email) {
      setErrorMessage("Email cannot be empty or invalid.");
      setModalIsOpenError(true);
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));

    const data = {
      email,
      brokerageId: userData?.brokerage_Details?.id,
    };

    try {
      const encryptedData = encryptionData(data);
      setLoading(true);
      toast.loading("Registering user...");

      axios
        .post("/api/registerBrokerByBrokerageCompany", encryptedData)
        .then(() => {
          toast.dismiss();
          toast.success("Successfully added!");
          window.location.reload();
        })
        .catch((err) => {
          toast.dismiss();
          const status = err.response?.request?.status;
          if (status === 409) {
            toast.error("Email is already registered!");
          } else {
            toast.error(err.message || "An error occurred.");
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      toast.dismiss();
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="row mt-4">
      <div className="col-lg-12">
        <form onSubmit={registerHandler}>
          <div className="form-group input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Username / Email"
              ref={emailRegisterRef}
              required
            />
            <div className="input-group-prepend">
              <div
                className="input-group-text m-1"
                style={{ border: "1px solid #2e008b" }}
              >
                <FaEnvelope />
              </div>
            </div>
          </div>

          <div className="col-lg-12 text-center mt-4">
            <button
              type="button"
              onClick={() => setCloseRegisterModal(false)}
              className="btn btn-secondary w-25 mx-1"
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
