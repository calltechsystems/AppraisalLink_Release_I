const WhyChoose = ({ style = "" }) => {
  const whyCooseContent = [
    {
      id: 1,
      icon: "flaticon-high-five",
      title: "Collaborative Process", //Collabrative and Transparent Process
      descriptions: `Transparent ordering and appraising process. The process, ensuring transparency and understanding.`,
    },
    {
      id: 2,
      icon: "flaticon-heartbeat",
      title: "Real Time Analytics",
      descriptions: `Data analytics, Dashboard, Historical data. Analysis of data as it is generated, providing immediate insights. `,
    },
    {
      id: 3,
      icon: "flaticon-profit",
      title: "Cost Saving",
      descriptions: `Compare the quotes by various property appraisers. Provide value by streamlining processes, and finding opportunities. `,
    },
    {
      id: 4,
      icon: "flaticon-transfer",
      title: "Flexbility",
      descriptions: `Choose your own property appraising partner. Ability to make choices that suit your specific needs and preferences.`,
    },
    {
      id: 5,
      icon: "flaticon-percent",
      title: "User Friendly",
      descriptions: `Easy to navigate portal, Delivering a positive and intuitive experience, easy for use, find information, and achieve their goals.`,
    },
    {
      id: 6,
      icon: "flaticon-chat",
      title: "24X7 Accessibility",
      descriptions: `Run your buisness without time and location constraints. Enhances convenience, responsiveness, and available at all hours.`,
    },
  ];

  return (
    <>
      {whyCooseContent.map((item) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
          <div className={`why_chose_us ${style}`} style={{ height: "350px", marginTop:'' }}>
            <h4 className="mb-3">{item.title}</h4>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
            <div className="details">
              <p>{item.descriptions}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WhyChoose;
