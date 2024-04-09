import { useRouter } from "next/router";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader_01";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";
import { useEffect, useState } from "react";
import ErrorModal from "../common/popUpModal/errorModal/index";

const Index = ({ user }) => {
  const [show, setShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenError, setModalIsOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const closeModal = () => {
    setModalIsOpen(false);
    router.push("/");
  };

  const closeErrorModal = () => {
    setModalIsOpenError(false);
    location.reload(true);
  };

  useEffect(() => {
    const initialRoute = router.asPath;

    const handleRouteChange = (url) => {
      if (url === initialRoute) {
        location.reload(true);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      {/* <PopupSignInUp /> */}

      {/* <!-- Inner Page Breadcrumb --> */}
      {/* <BreadCrumbBanner /> */}

      {/* <!-- Our LogIn Register --> */}
      <section className="our-log bgc-fa pt60">
        <div className="container">
          <div className="row  ">
            <div className="col-sm-12 col-lg-12 offset-lg-0">
              <div
                className="login_form  inner_page"
                style={{ padding: "10px" }}
              >
                <Form
                  user={user}
                  setModalIsOpen={setModalIsOpen}
                  setModalIsOpenError={setModalIsOpenError}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalIsOpen && (
        <div className="modal">
          <div
            className="modal-content"
            style={{ borderColor: "green", width: "20%" }}
          >
            <h3 className="text-center" style={{ color: "green" }}>
              Success
            </h3>
            <div style={{ borderWidth: "2px", borderColor: "green" }}>
              <br />
            </div>
            <h5 className="text-center">Successfully logged in</h5>
            <div
              className="text-center"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                className="btn w-35 btn-white"
                onClick={() => closeModal()}
                style={{ borderColor: "green", color: "green" }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

      {modalIsOpenError && (
        <div className="modal">
          <div
            className="modal-content"
            style={{ borderColor: "#2e008b", width: "20%" }}
          >
            <h4 className="text-center mb-1" style={{ color: "red" }}>
              Error
            </h4>
            <div style={{ borderWidth: "2px", borderColor: "red" }}>
              <br />
            </div>
            <h5 className="text-center mb-3">{errorMessage}</h5>
            <div
              className="text-center"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                className="btn w-35 btn-color"
                onClick={() => closeErrorModal()}
                style={{}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Our Footer --> */}
      <section className="footer_one p20">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <div className="footer_middle_area">
        <div className="container">
          <CopyrightFooter />
        </div>
      </div>
    </>
  );
};

export default Index;
