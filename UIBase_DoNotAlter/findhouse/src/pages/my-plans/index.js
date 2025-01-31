import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPlans from "./plans";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import OneTimePaymentModal from "./OneTimePaymentModal";
import SubscriptionModal from "./SubscriptionModal";
import CancelSubscriptionModal from "./CancelSubscriptionModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [currentSubscription, setcurrentSubscription] = useState({});
  const [openRedirectionModal, setopenRedirectionModal] = useState(false);
  const [price, setPrice] = useState({
    title: "Basic",
    price: 0,
    type: "plan",
    item: {},
  });

  const [checkout, setCheckOut] = useState(false);

  const [userData, setUserData] = useState({});

  function getSelectedPlans(plans) {
    // Get the current date
    const currentDate = new Date();

    // Filter plans based on startDate and transactionDetail
    const selectedPlans = plans.filter((plan) => {
      const startDate = new Date(plan.startDate);
      const isBeforeOrEqualCurrentDate = startDate <= currentDate;
      const isNotTopUp = !plan.transactionDetail
        .toLowerCase()
        .includes("topup");
      return isBeforeOrEqualCurrentDate && isNotTopUp;
    });
    return selectedPlans;
  }
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    axios
      .get("/api/getBrokerTransactions", {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          "Content-Type": "application/json",
        },
        params: {
          userId: userData?.userId,
        },
      })
      .then((res) => {
        toast.dismiss();

        let tempSub = res.data.data.result.$values;

        let newPlan = {};
        tempSub?.map((plan, index) => {
          const isAccordingToDate =
            new Date(plan.startDate) <= new Date() &&
            new Date(plan?.endDate) >= new Date();
          const isNormalPlan =
            String(plan.planName).toLowerCase().includes("lite") ||
            String(plan.planName).toLowerCase().includes("pro") ||
            String(plan.planName).toLowerCase().includes("ultimate");
          if (isAccordingToDate && isNormalPlan) {
            newPlan = plan;
          }
        });
        setcurrentSubscription(newPlan);
        setRerender(false);
      })
      .catch((err) => {
        toast.dismiss();
      });

    const fetchData = () => {
      const isPaying = JSON.parse(localStorage.getItem("isPaying"));
      const data = JSON.parse(localStorage.getItem("user"));

      if (data) {
        setUserData(data);
        if (isPaying) {
          setopenRedirectionModal(true);
        }
      } else {
        router.push("/login");
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Seo pageTitle="My Plans" />
      <MyPlans
        currentSubscription={currentSubscription}
        setModalOpen={setModalOpen}
        setPrice={setPrice}
        userData={userData}
        modalOpen={modalOpen}
        setcurrentSubscription={setcurrentSubscription}
      />
      {price?.type == "plan" ? (
        <SubscriptionModal
          currentSubscription={currentSubscription}
          modalOpen={modalOpen}
          closeModal={closeModal}
          price={price}
        />
      ) : price?.type == "cancel_plan" ? (
        <CancelSubscriptionModal
          currentSubscription={currentSubscription}
          modalOpen={modalOpen}
          closeModal={closeModal}
          price={price}
        />
      ) : (
        <OneTimePaymentModal
          currentSubscription={currentSubscription}
          modalOpen={modalOpen}
          closeModal={closeModal}
          price={price}
        />
      )}
      {openRedirectionModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col-lg-12">
                <Link href="/" className="">
                  <Image
                    width={50}
                    height={45}
                    className="logo1 img-fluid"
                    style={{ marginTop: "-20px" }}
                    src="/assets/images/Appraisal_Land_Logo.png"
                    alt="header-logo2.png"
                  />
                  <span
                    style={{
                      color: "#2e008b",
                      fontWeight: "bold",
                      fontSize: "24px",
                      // marginTop: "20px",
                    }}
                  >
                    Appraisal
                  </span>
                  <span
                    style={{
                      color: "#97d700",
                      fontWeight: "bold",
                      fontSize: "24px",
                      // marginTop: "20px",
                    }}
                  >
                    {" "}
                    Land
                  </span>
                </Link>
              </div>
            </div>
            <h2 className="text-center mt-3" style={{ color: "#2e008b" }}>
              Transaction has took Place !
            </h2>
            <div className="mb-2" style={{ border: "2px solid #97d700" }}></div>
            <p className="fs-5 text-center text-dark mt-4">
              The Transaction of subscribing to a plan is done !{" "}
            </p>

            <div
              className="mb-3 mt-4"
              style={{ border: "2px solid #97d700" }}
            ></div>
            <div className="col-lg-12 text-center">
              <button
                disabled={disable}
                className="btn w-25 btn-color"
                onClick={() => setopenRedirectionModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

// <div className="App">
//       {checkout ? (
//         <Paypal />
//       ) : (
//         <button
//           onClick={() => {
//             setCheckOut(true);
//           }}
//         >
//           Checkout
//         </button>
//       )}
//     </div>
