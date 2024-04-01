import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { encryptionData } from "../../utils/dataEncryption";
import axios from "axios";
import toast from "react-hot-toast";

const Pricing = ({
  isPlan,
  hideButton,
  selectedId,
  setModalOpen,
  data,
  topupData,
  currentSubscription,
  setPrice,
}) => {
  const pricingContentForMonthly = [
    {
      id: 1,
      price: "11",
      title: "Lite",
      features: ["30 Days Validity", "No Roll Over", "Limited Support"],
    },
    {
      id: 2,
      price: "19",
      title: "Pro",
      features: ["30 Days Validity", "Partial Roll Over", "Enhanced Support"],
    },
    {
      id: 3,
      price: "35",
      title: "Ultimate",
      features: ["30 Days Validity", "Unlimited Roll Over", "Complete Support"],
    },
  ];

  const pricingContentForYearly = [
    {
      id: 1,
      price: "132",
      title: "Lite",
      features: ["365 Days Validity", "Partial Roll Over", "Limited Support"],
    },
    {
      id: 2,
      price: "228",
      title: "Pro",
      features: ["365 Days Validity", "Partial Roll Over", "Complete Support"],
    },
    {
      id: 3,
      price: "420",
      title: "Ultimate",
      features: [
        "365 Days Validity",
        "Unlimited Roll Over",
        "Complete Support",
      ],
    },
  ];
  let userData = {};
  const [selectedPackage, setSelectedPackage] = useState({});

  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(-1);
  const [selectedTopUp, setSelectedTopUp] = useState(-1);
  const [type, setType] = useState(1);
  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("user"));
    const Packages = userData.userSubscription?.$values;
    const len = Packages?.length;
    setSelectedPackage(Packages?.length > 0 ? Packages[len - 1] : {});
  }, []);

  const selectedIdStyle = selectedId ? selectedId : "2";
  const content =
    isPlan === 1 ? pricingContentForMonthly : pricingContentForYearly;

  const selectPackageHandler = (id, title, price, type) => {
    setModalOpen(true);
    setPrice({
      id: id,
      title: title,
      price: price,
      type: type,
    });
  };

  const setPlan = (planId, type) => {
    console.log(planId);
    setSelectedPlanId(planId);
    setType(type);
    if (String(type) === "2" || String(type) === "3" || String(type) === "4") {
      setOpenCancelModal(true);
      if (String(type) === "3") {
        setSelectedTopUp(topupData[0]);
      } else if (String(type) === "4") {
        setSelectedTopUp(topupData[1]);
      }
    }
  };

  const closeCancelHandler = () => {
    setSelectedPlanId(-1);
    setType(1);
    setOpenCancelModal(false);
  };

  const cancelPackageHandler = () => {
    setDisable(true);

    const userData = JSON.parse(localStorage.getItem("user"));

    if (String(type) === "2") {
      const payload = {
        UserId: userData.userId,
        token: userData.token,
      };

      toast.loading("Cancelling the subscription !!");
      const encryptedBody = encryptionData(payload);
      axios
        .post("/api/cancelSubscription", encryptedBody)
        .then((res) => {
          toast.success("Successfully cancelled the subscription!");
        })
        .catch((err) => {
          toast.error("Try Again !!");
        });

      window.location.reload();
    } else if (String(type) === "3" || String(type) === "4") {
      //low add on topup

      const payload = {
        TopUpId: selectedTopUp.id,
        UserId: userData.userId,
      };

      toast.loading("Adding the top-up !!");
      const encryptedBody = encryptionData(payload);
      axios
        .post("/api/addTopUp", encryptedBody)
        .then((res) => {
          toast.success("Successfully added the top - up!");
        })
        .catch((err) => {
          toast.error("Try Again !!");
        });

      window.location.reload();
    }
    window.location.reload();
  };

  return (
    <>
      {data?.map((item, idx) => (
        <div className="col-sm-4 col-md-4 my_plan_pricing_header" key={item.id}>
          <div
            className={`pricing_table  ${
              String(selectedIdStyle) === String(item.id)
                ? "pricing_table_border_style"
                : ""
            }`}
          >
            <div className="pricing_header">
              <div className="price">{item.description}</div>
              {String(selectedIdStyle) === String(item.id) ? (
                <div
                  className="p-1 fw-bold"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    fontSize: "19px",
                    color: "#2e008b",
                  }}
                >
                  Recommended Plan{" "}
                </div>
              ) : (
                <div
                  className="p-1 fw-bold"
                  style={{
                    visibility: "hidden",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    fontSize: "19px",
                    color: "#2e008b",
                  }}
                >
                  Recommended Plan{" "}
                </div>
              )}
            </div>
            <div className="pricing_content">
              <ul className="mb0">
                <li key={idx}>{item.noOfProperties} Properties Appraisal</li>
                {content[idx]?.features?.map((val, i) => (
                  <li key={i}>{val}</li>
                ))}
              </ul>
              <div className="pricing_header">
                <h2 className="text-dark">
                  $
                  {isPlan === 1
                    ? item.monthlyAmount - item.discount
                    : item.yearlyAmount - item.discount}
                </h2>
              </div>
            </div>
            {!hideButton && !selectedPackage && (
              <div
                className="pricing_footer"
                onClick={() =>
                  selectPackageHandler(
                    item.id,
                    item.description,
                    isPlan === 1
                      ? item.monthlyAmount - item.discount
                      : item.yearlyAmount - item.discount,
                    "plan"
                  )
                }
              >
                <a className={`btn btn-color_01 w-100`} href="#">
                  Get Started
                </a>
              </div>
            )}

            {!hideButton &&
              String(selectedPackage.planId) !== String(item.id) && (
                <div
                  className="pricing_footer"
                  onClick={() =>
                    selectPackageHandler(
                      item.id,
                      item.description,
                      isPlan === 1
                        ? item.monthlyAmount - item.discount
                        : item.yearlyAmount - item.discount,
                      "plan"
                    )
                  }
                >
                  <a className={`btn btn-color_01 w-100`} href="#">
                    Select Plan
                  </a>
                </div>
              )}
            {!hideButton &&
              String(selectedPackage.planId) === String(item.id) && (
                <select
                  style={{
                    padding: "2%",
                    borderColor: "black",
                    borderWidth: "2px",
                  }}
                  onClick={(e) => setPlan(item.id, e.target.value)}
                  className="pricing_footer btn btn-color_01"
                >
                  <option value={1}>Modify/Cancel Subscription </option>
                  <option value={2}>Cancel Subscription</option>
                  <option value={3}>Add TopUp (Low)</option>
                  <option value={4}>Add TopUp (High)</option>
                </select>
              )}
          </div>
        </div>
      ))}

      {openCancelModal && (
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
              {String(type) === "2"
                ? "Subscription Cancellation"
                : String(type) === "3"
                ? ` Add On ${topupData[0].noOfProperties} Properties`
                : ` Add On ${topupData[1].noOfProperties} Properties`}
            </h2>
            <div className="mb-2" style={{ border: "2px solid #97d700" }}></div>
            <p className="fs-5 text-center text-dark mt-4">
              {String(type) === "2"
                ? "Are you sure you want to cancel this subscription?"
                : String(type) === "3"
                ? "Are you sure you want add Top-up plan  (Low ) to this plan?"
                : "Are you sure you want add Top-up plan  (High ) to this plan?"}{" "}
            </p>

            <div
              className="mb-3 mt-4"
              style={{ border: "2px solid #97d700" }}
            ></div>
            <div className="col-lg-12 text-center">
              <button
                disabled={disable}
                className="btn w-25 btn-color m-1"
                onClick={closeCancelHandler}
              >
                Cancel
              </button>
              <button
                disabled={disable}
                className="btn w-25 btn-color"
                onClick={
                  String(type) === "3" || String(type) === "4"
                    ? () =>
                        selectPackageHandler(
                          selectedTopUp.id,
                          selectedTopUp.topupDescription,
                          selectedTopUp.tupUpAmount,
                          "topup"
                        )
                    : cancelPackageHandler
                }
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

export default Pricing;
