const Pricing = ({isPlan}) => {
  const pricingContentForMonthly = [
    {
      id: 1,
      price: "11",
      title: "Lite",
      features: [
        "50 Property Listings",
        "60 Days Availability",
        "20 Featured Property",
        "Limited Support",
      ],
    },
    {
      id: 2,
      price: "19",
      title: "Pro",
      features: [
        "50 Property Listings",
        "60 Days Availability",
        "20 Featured Property",
        "Limited Support",
      ],
    },
    {
      id: 3,
      price: "35",
      title: "Ultimate",
      features: [
        "50 Property Listings",
        "60 Days Availability",
        "20 Featured Property",
        "Limited Support",
      ],
    },
  ];

  const pricingContentForYearly = [
    {
      id: 1,
      price: "132",
      title: "Lite",
      features: [
        "50 Property Listings",
        "60 Days Availability",
        "20 Featured Property",
        "Limited Support",
      ],
    },
    {
      id: 2,
      price: "228",
      title: "Pro",
      features: [
        "50 Property Listings",
        "60 Days Availability",
        "20 Featured Property",
        "Limited Support",
      ],
    },
    {
      id: 3,
      price: "420",
      title: "Ultimate",
      features: [
        "50 Property Listings",
        "60 Days Availability",
        "20 Featured Property",
        "Limited Support",
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
              <div className="price">${item.price}</div>
              <h4>{item.title}</h4>
            </div>
            <div className="pricing_content">
              <ul className="mb0">
                {item.features.map((val, i) => (
                  <li key={i}>{val}</li>
                ))}
              </ul>
            </div>
            <div className="pricing_footer">
              <a className="btn pricing_btn btn-block w-100" href="#">
                Select Package
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing;
