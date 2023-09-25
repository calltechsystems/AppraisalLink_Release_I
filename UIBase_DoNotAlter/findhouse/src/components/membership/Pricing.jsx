
const Pricing = ({isPlan,hideButton,selectedId,setModalOpen,setPrice}) => {
  console.log(isPlan);
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

<<<<<<< Updated upstream
  const selectedIdStyle = selectedId ? selectedId : "3";
=======
  const selectedIdStyle = selectedId ? selectedId : 2 ;
>>>>>>> Stashed changes
  const content = isPlan === 1 ? pricingContentForMonthly : pricingContentForYearly ;

  const selectPackageHandler = (title,price) =>{
    setModalOpen(true);
    setPrice({
      title : title,
      price : price
    });
  }
  return (
    <>
      {content.map((item) => (

        <div className="col-sm-4 col-md-4 my_plan_pricing_header mb-5"  key={item.id}>
          <div className={`pricing_table  ${ String(selectedIdStyle) === String(item.id) ? "pricing_table_border_style":""}`}>
            <div className="pricing_header">
              <div className="price">{item.title}</div>
              {String(selectedIdStyle) === String(item.id) ? <div style={{backgroundColor:"darkslateblue",borderRadius:"4px", paddingTop:'5px',paddingBottom:'5px'}}><h4 >Recommended Plan</h4> </div>: "" }
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
            {!hideButton && (<div className="pricing_footer" onClick={()=>selectPackageHandler(item.title,item.price)}>
              <a className={`btn pricing_btn btn-block w-100`}  href="#">
                 {selectedId!==item.id ? !selectedId ? "Select Plan":"Change Plan":"Upgrade" }
              </a>
            </div>)}
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing;


