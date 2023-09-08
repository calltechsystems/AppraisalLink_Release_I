
const Pricing = ({isPlan,hideButton}) => {
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
      id: 4,
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
      id: 5,
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
      id: 6,
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

  const content = isPlan === 1 ? pricingContentForMonthly : pricingContentForYearly ;
  return (
    <>
      {content.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
          <div className="pricing_table">
            <div className="pricing_header">
              <div className="price">{item.title}</div>
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
            {!hideButton && (<div className="pricing_footer">
              <a className="btn pricing_btn btn-block w-100" href="#">
                Select Package
              </a>
            </div>)}
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing;
