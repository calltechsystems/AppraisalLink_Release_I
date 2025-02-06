const AllStatistics = ({ properties, views, bids, wishlist }) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "stylecard1",
      icon: "flaticon-home",
      timer: properties,
      name: "All Properties",
    },
    {
      id: 2,
      blockStyle: "stylecard2",
      icon: "flaticon-user",
      timer: bids,
      name: "Quotes Provided",
    },
    {
      id: 3,
      blockStyle: "stylecard3",
      icon: "flaticon-tick",
      timer: bids,
      name: "Quotes Accepted",
    },
    {
      id: 4,
      blockStyle: "stylecard4",
      icon: "flaticon-heart",
      timer: views,
      name: "Quotes in Progress",
    },
    {
      id: 5,
      blockStyle: "stylecard5",
      icon: "flaticon-invoice",
      timer: views,
      name: "Quotes Completed",
    },
    {
      id: 6,
      blockStyle: "stylecard6",
      icon: "flaticon-house",
      timer: views,
      name: "Quotes on HOLD",
    },
    {
      id: 7,
      blockStyle: "stylecard7",
      icon: "flaticon-tick",
      timer: views,
      name: "Cancelled Properties",
    },
    {
      id: 8,
      blockStyle: "stylecard8",
      icon: "flaticon-heart",
      timer: views,
      name: "On Hold Properties",
    },
    {
      id: 9,
      blockStyle: "stylecard9",
      icon: "flaticon-heart",
      timer: views,
      name: "Plan",
    },
    {
      id: 10,
      blockStyle: "stylecard10",
      icon: "flaticon-house",
      timer: views,
      name: "Plan validity",
    },
    {
      id: 11,
      blockStyle: "stylecard11",
      icon: "flaticon-invoice",
      timer: views,
      name: "No. of Properties",
    },
    {
      id: 12,
      blockStyle: "stylecard12",
      icon: "flaticon-tick",
      timer: views,
      name: "Used Properties",
    },
    {
      id: 13,
      blockStyle: "stylecard13",
      icon: "flaticon-heart",
      timer: wishlist,
      name: "Wishlist Properties",
    },
  ];

  return (
    <div className="statistics-container">
      {allStatistics.map((item) => (
        <div key={item.id} className={`ff_one ${item.blockStyle}`}>
          <div className="details">
            <div className="timer">{item.name}</div>
            <p>{item.timer}</p>
          </div>
          <div className="icon">
            <span className={item.icon}></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStatistics;
