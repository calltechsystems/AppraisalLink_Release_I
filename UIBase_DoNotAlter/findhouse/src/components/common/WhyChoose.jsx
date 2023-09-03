const WhyChoose = ({ style = "" }) => {
  const whyCooseContent = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: "Collaborative and Transparent Process",
      descriptions: `Transparent ordering and appraising process.`,
    },
    {
      id: 2,
      icon: "flaticon-home-1",
      title: "Real Time Analytics",
      descriptions: `Data analytics, Dashboard, Historical data.`,
    },
    {
      id: 3,
      icon: "flaticon-profit",
      title: "Cost Saving",
      descriptions: `Compare the quotes by various property appraisers.`,
    },
    {
      id: 4,
      icon: "flaticon-high-five",
      title: "Flexbility",
      descriptions: `Choose your own property appraising partner`,
    },
    {
      id: 5,
      icon: "flaticon-home-1",
      title: "User Friendly",
      descriptions: `Easy to navigate portal`,
    },
    {
      id: 6,
      icon: "flaticon-home-1",
      title: "24X7 Accessibility",
      descriptions: `Run your buisness without time and location constraints`,
    }
  ];

  return (
    <>
      {whyCooseContent.map((item) => (
        <div className="col-md-6 col-lg-4  col-xl-4" key={item.id}>
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <h4>{item.title}</h4>
              <p>{item.descriptions}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
