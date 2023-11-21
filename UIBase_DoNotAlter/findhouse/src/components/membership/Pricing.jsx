import { useEffect } from "react";

const Pricing = ({
  isPlan,
  hideButton,
  selectedId,
  setModalOpen,
  setPrice,
}) => {
  let userData = {};
  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("user"));
  }, []);
  const pricingContentForMonthly = [
    {
      id: 1,
      price: "11",
      title: "Lite",
      features: [
        "5 Properties Appraisal",
        "30 Days Validity",
        "No Roll Over",
        "Limited Support",
      ],
    },
    {
      id: 2,
      price: "19",
      title: "Pro",
      features: [
        "20 Properties Appraisal",
        "30 Days Validity",
        "Partial Roll Over",
        "Enhanced Support",
      ],
    },
    {
      id: 3,
      price: "35",
      title: "Ultimate",
      features: [
        "50 Properties Appraisal",
        "30 Days Validity",
        "Unlimited Roll Over",
        "Complete Support",
      ],
    },
  ];

  const pricingContentForYearly = [
    {
      id: 1,
      price: "132",
      title: "Lite",
      features: [
        "75 Properties Appraisal",
        "365 Days Validity",
        "Partial Roll Over",
        "Limited Support",
      ],
    },
    {
      id: 2,
      price: "228",
      title: "Pro",
      features: [
        "300 Properties Appraisal",
        "365 Days Validity",
        "Partial Roll Over",
        "Complete Support",
      ],
    },
    {
      id: 3,
      price: "420",
      title: "Ultimate",
      features: [
        "1000 Properties Appraisal",
        "365 Days Validity",
        "Unlimited Roll Over",
        "Complete Support",
      ],
    },
  ];

  console.log(isPlan);
  const selectedIdStyle = selectedId ? selectedId : "3";
  const content =
    isPlan === "Monthly" ? pricingContentForMonthly : pricingContentForYearly;

  const selectPackageHandler = (title, price) => {
    setModalOpen(true);
    setPrice({
      title: title,
      price: price,
    });
  };
  return (
    <>
      {content.map((item) => (
        <div
          className="col-sm-4 col-md-4 my_plan_pricing_header mb-5"
          key={item.id}
        >
          <div
            className={`pricing_table  ${
              String(selectedIdStyle) === String(item.id)
                ? "pricing_table_border_style"
                : ""
            }`}
          >
            <div className="pricing_header">
              <div className="price">{item.title}</div>
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
                {item.features.map((val, i) => (
                  <li key={i}>{val}</li>
                ))}
              </ul>
              <div className="pricing_header">
                <h2 className="text-light">${item.price}</h2>
              </div>
            </div>
            {!hideButton && (
              <div
                className="pricing_footer"
                onClick={
                  userData
                    ? ""
                    : () => selectPackageHandler(item.title, item.price)
                }
              >
                <a
                  className={`btn btn-color_01 btn-block w-100`}
                  href={userData ? "/my-plans" : "#"}
                >
                  {selectedId !== item.id
                    ? !selectedId
                      ? "Get Started"
                      : "Change Plan"
                    : "Upgrade"}
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing;
