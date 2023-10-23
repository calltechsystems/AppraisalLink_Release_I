import Link from "next/link";

const TermsCondions = () => {
  const termsContent = [
    {
      id: 1,
      title: "Broker Submit the property",
      text1: `When a broker submits a property to us, they provide all of the necessary information and details about the property to be listed and promoted on the platform to us. Photographs, property descriptions, floor plans, pricing, and any other relevant data that potential buyers or tenants would need to make informed decisions are typically included. `,
      text2: `To be discussed`,
    },
    {
      id: 2,
      title: "Address Validation",
      text1: `Address validation begins after the Broker submits the property. Address validation services are provided by our company for properties. We ensure that the property addresses provided are accurate and up to date by utilizing advanced technology and reliable data sources. We cross-reference the address details against comprehensive databases during the validation process to ensure their accuracy. `,
      text2: `To be discussed`,
    },
    {
      id: 3,
      title: "Appraisal provide Quotes",
      text1: `Once the address has been validated, our certified appraiser will be able to provide a quote for the property appraisal. The appraisal quote will be based on various factors, including the property's location, size, condition, features, and market trends. During the appraisal process, the appraiser will conduct a thorough inspection of the property and gather relevant data. They will analyse comparable properties, market conditions, and other factors to determine the fair market value of the property.  `,
      text2: `To be discussed`,
    },
    {
      id: 4,
      title: "Validate quote",
      text1: `Once the appraiser has provided us with a quote for the property, we validate it by verifying the accuracy of the property description used by the appraiser to make the appraisal. This may entail physically inspecting the property to ensure that it matches the appraiser's description. We verify the appraiser's use of appropriate appraisal methodologies and techniques, as well as recent sales of comparable properties in the area to compare the appraiser's valuation with market trends.`,
      text2: `To be discussed`,
    },
    {
      id: 5,
      title: "Quote available to broker",
      text1: `We give the broker the best quote after verifying the appraiser's estimate and being certain of its accuracy. We gather all the relevant data for the verified quote, including the property's specifics, the appraisal report, and any supporting records. The objective is to offer the broker the best quote based on the verified appraisal. A smooth and successful transaction will be facilitated by open and honest communication with all parties involved.  `,
      text2: `To be discussed`,
    },
    {
      id: 2,
      title: "Broker selects the appraiser",
      text1: `Once we have provided the validated quote to the broker, it is likely that the broker will choose to move forward with the appraiser who provided the quote. The validation process helps ensure the accuracy and reliability of the quote, making it a trusted and preferred choice for the broker. `,
      text2: `To be discussed`,
    },
  ];

  const navigationList = [
    { id: 1, routeLink: "#", name: "Welcome Text" },
    { id: 2, routeLink: "#", name: "Our Terms" },
    { id: 3, routeLink: "#", name: "Conditions" },
    { id: 4, routeLink: "#", name: "Your Privacy" },
    { id: 5, routeLink: "#", name: "Informations We Collect" },
  ];

  return (
    <div className="row">
      <div className="col-lg-8 col-xl-8">
        <div className="terms_condition_grid">
          {termsContent.map((item) => (
            <div className="grids mb30" key={item.id}>
              <h4>{item.title}</h4>
              <p className="mb20">{item.text1}</p>
              {/* <p>{item.text2}</p> */}
            </div>
          ))}
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-lg-4 col-xl-4">
        <div className="terms_condition_widget">
          <h4 className="title">Navigation</h4>
          <div className="widget_list">
            <ul className="list_details">
              {navigationList.map((list) => (
                <li key={list.id}>
                  <Link href={list.routeLink}>
                    <i className="fa fa-caret-right mr10"></i>
                    {list.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TermsCondions;
