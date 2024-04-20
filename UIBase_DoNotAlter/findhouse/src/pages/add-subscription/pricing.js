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
  userData,
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
  const [currentActivePlan, setCurrentActivePlan] = useState({});

  const len = userData?.userSubscription?.$values?.length;
  const currentPlan = userData?.userSubscription?.$values[len - 1];
  const selectedIdStyle = selectedId ? selectedId : "2";
  const content =
    isPlan === 1 ? pricingContentForMonthly : pricingContentForYearly;

  const selectPackageHandler = (id, title, price) => {
    setModalOpen(true);
    setPrice({
      id: id,
      title: title,
      price: price,
    });
  };

  return (
    <>
      {data?.map((item, idx) => (
        <div className="col-sm-4 col-md-4 my_plan_pricing_header" key={item.id}>
          <div
            className={`pricing_table  ${
              String(selectedIdStyle) === String(item.id) ? "pricing_table" : ""
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
                <h2 className="" style={{ color: "#2e008b" }}>
                  $
                  {isPlan === 1
                    ? item.monthlyAmount - item.discount
                    : item.yearlyAmount - item.discount}
                </h2>
              </div>
            </div>
            {!hideButton && !currentActivePlan?.$id && (
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
              currentActivePlan &&
              String(currentActivePlan.id) !== String(item.id) && (
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
              String(currentActivePlan?.id) === String(item.id) && (
                <select
                  style={{
                    padding: "",
                    borderColor: "black",
                    borderWidth: "2px",
                  }}
                  onClick={(e) => setPlan(item.id, e.target.value)}
                  className="pricing_footer btn btn-color_01 form-select"
                >
                  <option value={1}>Modify/Cancel Subscription </option>
                  <option value={3}>
                    Add {topupData[0].noOfProperties} Properties
                  </option>
                  <option value={4}>
                    Add {topupData[1].noOfProperties} Properties
                  </option>
                  <option value={2}>Cancel Subscription</option>
                </select>
              )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing;
