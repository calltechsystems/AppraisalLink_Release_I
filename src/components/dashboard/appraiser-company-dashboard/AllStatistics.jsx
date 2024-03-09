const AllStatistics = ({properties , views , bids , wishlist}) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: properties,
      name: "All Properties",
    },
    // {
    //   id: 2,
    //   blockStyle: "style2",
    //   icon: "flaticon-view",
    //   timer: views,
    //   name: "Total Views",
    // },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-user",
      timer: bids,
      name: "Provided Bids",
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-heart",
      timer: wishlist,
      name: "Wishlist Properties",
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
